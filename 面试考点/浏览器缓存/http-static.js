const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'www', req.url);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);  // 获取文件状态

        const isDir = stats.isDirectory();  // 是否是目录
        if (isDir) {
            filePath = path.join(filePath, 'index.html');
        }

        if (!isDir) {
            const { ext } = path.parse(filePath);  // 获取文件扩展名
            const content = fs.readFileSync(filePath);  // 读取文件内容

            // const timeStamp = req.headers['if-modified-since'];  // 协商缓存时间戳
            // let status = 200;
            // if (timeStamp && Number(timeStamp) === stats.mtimeMs) {
            //     status = 304
            // }

            let status = 200;
            const etag = req.headers['if-none-match'];  // 协商缓存哈希值
            if (etag && etag === stats.mtimeMs) {  // 读取该文件内容，生成一个哈希值
                status = 304;
            }

            res.writeHead(status, {
                'Content-Type': mime.getType(ext),
                'Cache-Control': 'max-age=5',  // 强缓存
                // 'Last-Modified': stats.mtimeMs  // 协商缓存
                'ETag': stats.mtimeMs  // 协商缓存，读取该文件内容，生成一个哈希值
            });  // 设置响应头
            return res.end(content); // 响应文件内容
        }
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8'); // 设置响应头
    res.end('<h1>404 Not Found<h1>');
});

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});