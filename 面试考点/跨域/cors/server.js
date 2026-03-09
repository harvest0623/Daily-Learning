const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.31.180');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
        name: '张三',
        age: 18
    }));
});

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});