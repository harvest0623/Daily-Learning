/**
 * POST /api/chat
 * 代理转发聊天请求到硅基流动，流式 SSE 返回
 */

import { NextRequest } from 'next/server';
import { chatCompletion, type ChatMessage } from '@/lib/siliconflow';

export async function POST(request: NextRequest) {
    try {
        const { messages, images } = (await request.json()) as {
            messages: ChatMessage[];
            images?: string[];
        };

        if (!Array.isArray(messages) || messages.length === 0) {
            return Response.json({ error: 'messages is required' }, { status: 400 });
        }

        // 如果有图片，合并到最后一条用户消息中
        let requestMessages = messages;
        if (images && images.length > 0) {
            requestMessages = mergeImagesIntoMessages(messages, images);
        }

        // 调用硅基流动 API（流式）
        const upstream = await chatCompletion(requestMessages, true);

        // 以 SSE 流式返回
        return new Response(upstream.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
                'X-Accel-Buffering': 'no',
            },
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('Chat API error:', message);
        return Response.json({ error: message }, { status: 500 });
    }
}

/**
 * 将图片合并到消息中，找到最后一条用户消息，把图片做为 image_url 追加
 */
function mergeImagesIntoMessages(
    messages: ChatMessage[],
    images: string[]
): ChatMessage[] {
    return messages.map((m, i) => {
        // 找到最后一条 user 消息
        const isLastUser =
            m.role === 'user' &&
            messages.slice(i + 1).every((n) => n.role !== 'user');

        if (!isLastUser) return m;

        const text =
            typeof m.content === 'string'
                ? m.content
                : Array.isArray(m.content)
                    ? m.content.find((c) => c.type === 'text')?.text || ''
                    : '';

        const imageContents = images.map((url) => ({
            type: 'image_url' as const,
            image_url: { url },
        }));

        return {
            role: 'user',
            content: [{ type: 'text' as const, text }, ...imageContents],
        };
    });
}