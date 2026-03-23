import express from 'express'
import * as dotenv from 'dotenv'
import axios from 'axios'
import { exec } from 'child_process'
import { LLM } from './lib/llm.js'

dotenv.config({
    path: ['.env.local', '.env'],
})

const app = express();
const port = 3000;

const llm = new LLM(process.env.OLLAMA_MODEL, process.env.OLLAMA_API_URL,);

app.use(express.json());

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    const messages = [
        {
            role: 'system',
            content: '如果有需要，你可以调用listFiles工具来查找指定目录下的文件和文件夹。'
        },
        {
            role: 'user',
            content: message
        }
    ]

    const reply = await llm.chat(messages);  // reply 是大模型得到了工具函数的执行结果之后返回的结果
    res.json({ reply });

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});