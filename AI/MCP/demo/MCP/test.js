import { createClient } from './client.js';

const client = await createClient();

const result = await client.callTool({
    name: 'listFiles',
    arguments: {
        path: '.',
    },
});

console.log('server 提供的 tools:');
console.log(JSON.stringify(await client.listTools(), null, 2));
console.log('调用 listFiles tool 结果:');
console.log(JSON.stringify(result, null, 2));