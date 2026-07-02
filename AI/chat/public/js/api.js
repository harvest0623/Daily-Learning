/**
 * API 通信层 - SSE 流式聊天
 */
const Api = {
    async sendMessage(messages, images, callbacks) {
        const controller = new AbortController();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages, images: images || [] }),
                signal: controller.signal,
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || `HTTP ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;
                    const data = line.slice(6).trim();
                    if (data === '[DONE]') continue;

                    try {
                        const json = JSON.parse(data);
                        const delta = json.choices?.[0]?.delta;
                        if (!delta) continue;

                        // reasoning_content: Qwen 模型的思考链
                        if (delta.reasoning_content) {
                            callbacks.onReasoning?.(delta.reasoning_content);
                        }
                        // content: 正文
                        if (delta.content) {
                            callbacks.onContent?.(delta.content);
                        }
                    } catch {
                        // 忽略解析失败的行（如注释/保活）
                    }
                }
            }

            callbacks.onDone?.();
        } catch (err) {
            if (err.name === 'AbortError') {
                callbacks.onDone?.();
            } else {
                callbacks.onError?.(err.message);
            }
        }

        return controller;
    },
};

export default Api;