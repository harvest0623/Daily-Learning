const Router = require('koa-router');
const { deepseekChat } = require('../controllers/deepseekController.js');
const { verifyToken } = require('../utils/jwt.js');
const router = new Router({
    prefix: '/api/deepseek'
});

router.post('/chat', verifyToken(), deepseekChat);

module.exports = router;