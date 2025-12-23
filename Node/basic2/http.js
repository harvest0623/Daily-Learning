const http = require('http')

const server = http.createServer((req, res) => {
    // console.log(req.url)
    if (req.url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });  // 告诉客户端，我返回的数据是 html 类型 // 编码方式：utf-8
        res.end('<h2>首页</h2>');
    }
})

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
})