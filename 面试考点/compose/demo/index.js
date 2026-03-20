const koa = require('koa');
const app = new koa();

// function main (ctx, next) {  // 中间件
//     ctx.body = 'hello world';
//     next();
// }

// function logger (ctx) {
//     console.log(ctx.request.url);
// }

// app.use(main);
// app.use(logger);

function A (ctx, next) {
    console.log('A start');
    next();
    console.log('A end');
}

function B (ctx, next) {
    console.log('B start');
    next();
    console.log('B end');
}

function C (ctx, next) {
    console.log('C start');
    next();
    console.log('C end');
}

app.use(A);
app.use(B);
app.use(C);

app.listen(3000);