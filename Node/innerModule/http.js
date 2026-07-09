const http = require('http')
const data = {
    name: '张三',
    age: 18
}

const server = http.createServer((req, res) => {
    // console.log(req);
    // res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // res.end(JSON.stringify(data));
})

server.listen(3000);