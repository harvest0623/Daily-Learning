const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync('./index.html')); 
    }

    if (req.url === '/src/main.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(fs.readFileSync('./src/main.js')); 
    }

    if (req.url === '/src/tools/add.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(fs.readFileSync('./src/tools/add.js')); 
    }
});

server.listen(5173, () => {
    console.log('server is running at http://localhost:5173');
});