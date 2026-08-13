import ollama from 'ollama'
import { SimpleRag } from '../src/index.js'

async function main() {
    const rag = new SimpleRag();
    await rag.initialize();
    const question = process.argv[process.argv.length - 1];
    const res = await rag.query(question);

    const messages = [
        {
            role: 'system',
            content: `你是一个专业的助手，回答问题会基于当前的项目，如果上下文没有相关的信息，就回答“我无法回答这个问题”，不要自己编造信息。\n\nContext: \n${JSON.stringify(res)}`,
        },
        {
            role: 'user',
            content: question
        }
    ];

    const response = await ollama.chat({
        model: 'qwen3:1.7b',
        messages,
        stream: true
    });
    for await (const chunk of response) {
        process.stdout.write(chunk.message.content);
    }
}

main();