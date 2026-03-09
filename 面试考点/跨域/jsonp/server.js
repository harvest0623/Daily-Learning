const http = require('http');

const server = http.createServer((req, res) => {
    const query = new URL(req.url, 'http://localhost:3000').searchParams;
    // console.log(query.get('callback'));

    if (query.get('callback')) {
        const cb = query.get('callback');
        const data = 'hello world';
        const result = `${cb}("${data}")`;  // 'callback("hello world")'
        res.end(result);
    }
});

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});