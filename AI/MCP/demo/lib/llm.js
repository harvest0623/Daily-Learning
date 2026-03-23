import { EventEmitter } from 'node:events';
import { createClient } from '../MCP/client.js';
import axios from 'axios';
import { type } from 'node:os';

export class LLM {
    mcpClient = createClient();
    constructor(model, base_url, api_key) {
        this.model = model;
        this.base_url = base_url;
        this.api_key = api_key;
    }

    async listTools() {  // 获取所有工具
        return (await (await this.mcpClient).listTools()).tools.map(tool => ({
            type: 'function',
            function: {
                name: tool.name,
                description: tool.description,
                parameters: tool.parameters
            }
        }))
    }

    async callTool(tool_name, tool_args) {
        const result = await (await this.mcpClient).callTool({
            name: tool_name,
            arguments: tool_args || '.',
        })
        return {
            role: 'tool',
            content: result.content[0].text,
            name: tool_name,
        }
    }

    async chat(messages) {
        const response = await axios.post(`${this.base_url}/api/chat`, {
            model: this.model,
            messages,
            tools: await this.listTools(),   // 注册工具
            stream: false,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.api_key}`,
            },
        })

        const reply = response.data.messages.content;   // 回答的内容
        const tool_calls = response.data.tool_calls;   // LLM想调用的工具
        if (tool_calls && tool_calls.length > 0) {
            const list = tool_calls.map(tool_call => {
                return this.callTool(tool_call.function.name, tool_call.function.arguments)
            })
            const results = await Promise.all(list);  // 调用所有工具
            return await this.chat([...messages, ...results]);
        }
        return reply;   
    }
}

// let llm = new LLM('gpt-3.5-turbo', 'https://api.openai.com/v1', 'sk-xxxxx')
// llm.chat([{role: 'user', content: '你好'}])