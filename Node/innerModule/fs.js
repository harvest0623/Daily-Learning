const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // fs.readFile('./bg.png', 'base64', (err, data) => {
    //   res.end(data)
    // })

    // const data = fs.readFileSync('./test.txt', 'utf-8')
    // // console.log(data);
    // res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
    // res.end(data)

    // console.log(req.url);
    if (req.url === '/home') {
        const content = fs.readFileSync('./home.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
    } else if (req.url === '/about') {
        const content = fs.readFileSync('./test.txt', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(content);

    } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h2>NOT FOUND</h2>');
    }
})

server.listen(3000);