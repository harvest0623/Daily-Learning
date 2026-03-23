import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { exec } from 'child_process';

const server = new McpServer({
    name: 'huang',
    version: '1.0.0',
});

server.tool('listFiles', '列出指定目录下的所有文件', { path: z.string() }, async ({ path }) => {
    return new Promise((resolve, reject) => {
        exec(`dir ${path}`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    content: [{ type: 'text', text: `已经读取到目录${path}下的所有文件:\n${stdout}` }],
                });
            }
        });
    });
});

const transport = new StdioServerTransport(); // 创建一个传输层，标准的输入输出
await server.connect(transport);

console.log('server started');