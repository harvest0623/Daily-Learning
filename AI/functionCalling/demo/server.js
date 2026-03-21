import express from 'express'
import axios from 'axios'
import * as dotenv from 'dotenv'
import { exec } from 'child_process'

dotenv.config({  // 加载环境变量
    path: ['.env.local', '.env']
})

const app = express();
const port = 3000;

app.use(express.json());  // 解析 JSON 请求体

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    const model = process.env.OLLAMA_MODEL;
    const baseUrl = process.env.OLLAMA_API;

    const messages = [
        {
            role: 'system',
            content: '如果有需要，你可以调用 DirFiles 工具查找当前目录下的文件和文件夹'
        },
        { role: 'user', content: message }
    ];

    try {
        const response = await axios.post(`${baseUrl}/api/chat`, {
            model,
            messages,
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'DirFiles',
                        description: '查找当前目录下的文件和文件夹',
                    }
                }
            ],
            stream: false
        });
        const reply = response.data.message.content;

        // console.log(response.data);

        if (
            response.data.message.tool_calls &&
            response.data.message.tool_calls.length > 0 &&
            response.data.message.tool_calls[0].function.name === 'DirFiles'
        ) {
            // 调用 DirFiles 工具
            exec('dir', async (error, stdout, stderr) => {
                if (error) {
                    console.error('执行命令报错:', error);
                    return;
                }

                if (stderr) {
                    console.error('执行命令失败:', stderr);
                    return;
                }

                // res.json({ reply: `当前目录下的文件和文件夹如下：\n${stdout}` });
                messages.push({ role: 'tool', name: 'DirFiles', content: `当前目录下的文件和文件夹如下：\n${stdout}` });
                
                // 再次调用模型
                const res = await axios.post(`${baseUrl}/api/chat`, {
                    model,
                    messages,
                    stream: false
                });
                res.json({ reply: res.data.message.content });
                
                return;
            });
        } else {  // 不需要调用工具函数
            res.json({ reply });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})