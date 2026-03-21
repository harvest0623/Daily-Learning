import express from 'express'
import axios from 'axios'
import * as dotenv from 'dotenv'

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

    try {
        const response = await axios.post(`${baseUrl}/api/chat`, {
            model,
            messages: [
                { 
                    role: 'system', 
                    content: '如果有需要，你可以调用 DirFiles 工具查找当前目录下的文件和文件夹' 
                },
                { role: 'user', content: message }
            ],
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'DirFiles',
                        description: '查找当前目录下的文件和文件夹',
                        parameters: {
                            type: 'object',
                            properties: {
                                directory: {
                                    type: 'string',
                                    description: '要查找的目录路径'
                                }
                            }
                        }
                    }
                }
            ],
            stream: false
        });

        const responseMessage = response.data.choices[0].message.content;
        res.json({ response: responseMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})