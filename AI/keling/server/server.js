// 做可灵的身份检验，创建一个接口地址让前端可以访问
import * as dotenv from 'dotenv'
import express from 'express'  // node 的框架
import jwt from 'jsonwebtoken' // 因为可灵要求我们调用他的大模型需要做身份检验

//读取本地的环境文件中的内容
dotenv.config({
    path: ['.env.local', '.env']
})

const accessKeyId = process.env.ACCESS_KEY_ID;
const accessKeySecret = process.env.ACCESS_KEY_SECRET;

const app = express();
const port = 3000;

async function authKelingai() {
    const headers = {
        algorithm: 'HS256'
    }
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iss: accessKeyId,
        exp: now + 1800,
        nbf: now - 5
    }
    const token = jwt.sign(payload, accessKeySecret, headers);
    return token;
}

app.get('/jwt-auth', async(req, res)=> {
    const token = await authKelingai();
    console.log(token);
    res.send(token);
})

app.listen(port, ()=> {
    console.log(`项目已启动在 ${port} 端口`);
})