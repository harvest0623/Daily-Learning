const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

function main(ctx) {
    ctx.response.type = 'html';
    ctx.body = fs.createReadStream('./3.html');
}

app.use(main);
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});