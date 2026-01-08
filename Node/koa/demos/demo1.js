// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.url === '/home') {
//         res.end('hello world');
//     }
// });

// server.listen(3000, () => {
//     console.log('server is running at http://localhost:3000');
// });

const Koa = require('koa');
const app = new Koa();

function main(ctx) {  // ctx 就是 koa 整个框架的上下文对象
    // console.log(ctx);
    // console.log(ctx.request.url);
    // console.log(ctx.req.url);
    // console.log(ctx.url);

    // ctx.response.body = 'Hello World';
    // ctx.body = 'Hello World';

    const data = [
        {id: 1, name: 'henry', age: 18},
        {id: 2, name: 'harvest', age: 19},
        {id: 3, name: 'hello', age: 20}
    ]
    if (ctx.url == '/list') {
        ctx.body = data;
    }
}

app.use(main);
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});

// {
//     request: {
//         method: 'GET',
//         url: '/',
//         header: {
//         host: 'localhost:3000',
//         connection: 'keep-alive',
//         'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
//         'sec-ch-ua-mobile': '?0',
//         'sec-ch-ua-platform': '"macOS"',
//         'upgrade-insecure-requests': '1',
//         'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
//         accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//         'sec-fetch-site': 'none',
//         'sec-fetch-mode': 'navigate',
//         'sec-fetch-user': '?1',
//         'sec-fetch-dest': 'document',
//         'accept-encoding': 'gzip, deflate, br, zstd',
//         'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,pt;q=0.7,zh-TW;q=0.6',
//         cookie: 'locale=zh-Hans; refresh_token=e010e0b5857969fad6acc813a4cc79a8da86c9c41e2b549c4a28ceafd4bcd132a6e8c557a12191d72bd186128fdd89a268251ea25a3db70dc775234b909a288d'
//         }
//     },
//     response: {
//         status: 404,
//         message: 'Not Found',
//         header: [Object: null prototype] {}
//     },
//     app: { subdomainOffset: 2, proxy: false, env: 'development' },
//     originalUrl: '/',
//     req: '<original node req>',
//     res: '<original node res>',
//     socket: '<original node socket>'
// }