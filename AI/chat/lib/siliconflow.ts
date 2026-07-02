/**
 * 硅基流动 API 客户端
 * OpenAI 兼容接口
 */

const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY!;
const SILICONFLOW_BASE_URL = process.env.SILICONFLOW_BASE_URL || 'https://api.siliconflow.cn/v1';
const SILICONFLOW_MODEL = process.env.SILICONFLOW_MODEL || 'Qwen/Qwen3.6-27B';

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string | Array<{ type: 'text' | 'image_url'; text?: string; image_url?: { url: string } }>;
}

/**
 * 调用硅基流动 chat/completions API
 * @param messages - 对话消息数组
 * @param stream - 是否流式返回
 * @returns fetch Response
 */
export async function chatCompletion(
    messages: ChatMessage[],
    stream = true
): Promise<Response> {
    const response = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SILICONFLOW_API_KEY}`,
        },
        body: JSON.stringify({
            model: SILICONFLOW_MODEL,
            messages,
            stream,
            max_tokens: 4096,
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`SiliconFlow API error (${response.status}): ${text}`);
    }

    return response;
}