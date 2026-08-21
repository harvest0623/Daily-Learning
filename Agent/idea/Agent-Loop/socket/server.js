import WebSocket, { WebSocketServer } from 'ws';

const ws = new WebSocketServer({ port: 3000 });
let num = 1;

ws.on('connection', (socket) => {
    console.log('跟前端连接成功');

    socket.on('message', (msg) => {   // 监听前端发送的消息
        console.log('收到消息', msg.toString());

        setInterval(() => {
            socket.send(`好的我收到了${msg.toString()},这是我的第${num++}次返回`);
        }, 3000)
    })
})