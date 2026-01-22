const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const authRoutes = require('./routes/authRoutes.js');
const cozeRoutes = require('./routes/coze-api.js');
const deepseekRoutes = require('./routes/deepseek-api.js');
const dotenv = require('dotenv');

dotenv.config({
    path: ['.env.local', '.env']
})

const app = new Koa();
app.use(cors({  // 处理跨域
    origin() {
        return 'http://localhost:5173'
    }
}));

// 测试接口
const router = new Router({
    prefix: '/api'  // 所有接口都以 /api 开头(路由前缀)
});
router.get('/test', (ctx) => {
    ctx.body = {
        status: 'ok',
        message: 'koa backend is running'
    }
})

app
    .use(bodyParser())  // 先让 koa 拥有解析参数的能力
    .use(router.routes(), router.allowedMethods())
    .use(authRoutes.routes(), authRoutes.allowedMethods())
    .use(cozeRoutes.routes(), cozeRoutes.allowedMethods())
    .use(deepseekRoutes.routes(), deepseekRoutes.allowedMethods())

app.listen(3000, () => {
    console.log('server is running on port 3000');
})