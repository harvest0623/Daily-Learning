const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 3000 });

ws.on('connection', () => {  // 连接成功
    console.log('跟客户端连接成功');
    Socket.on('message', (data) => {
        console.log('收到消息', data);  // 收到消息
        Socket.send('收到消息');  // 发送消息
    })
})