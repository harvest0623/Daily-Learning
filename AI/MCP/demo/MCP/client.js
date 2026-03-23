import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export async function createClient() {
    const client = new Client({
        name: "huang",
        version: "1.0.0",
    });

    const transport = new StdioClientTransport({
        command: 'node',
        args: ['server.js'],
    });

    try {
        await client.connect(transport);
        console.log('client connected');
    } catch (error) {
        console.error('client connection failed:', error);
        throw error;
    }

    return client;
}