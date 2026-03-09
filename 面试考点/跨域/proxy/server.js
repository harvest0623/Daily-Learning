const http = require('http');

const server = http.createServer((req, res) => {
    http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET',
    }, (response) => {
        response.on('data', (chunk) => {
            // console.log(chunk.toString());
            res.end(chunk.toString());
        });
    });
});

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});