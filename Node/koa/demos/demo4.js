const Koa = require('koa');
const app = new Koa();
const router = require('koa-route');

const home = (ctx) => {
    ctx.body = '首页';
}
const about = (ctx) => {
    ctx.body = '<h2>about</h2>';
}

app.use(router.get('/home', home));
app.use(router.get('/about', about));

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});