// 创建所有跟账号有关的接口
const Router = require('koa-router');
const { login, getCaptcha, register, getUserInfo, updateUser, updatePassword } = require('../controllers/authController.js');  // {login: fn}
const { verifyToken } = require('../utils/jwt.js');

const router = new Router({
    prefix: '/api/auth'
})

// 定义登录接口
router.post('/login', login);

// 验证码接口
router.get('/captcha', getCaptcha);

// 注册
router.post('/register', register); 

// 获取用户信息
router.get('/info', verifyToken(), getUserInfo);

// 更新用户头像
router.post('/updateAvatar', verifyToken(), updateUser);

// 更新用户昵称
router.post('/updateNickname', verifyToken(), updateUser);

// 更新用户密码
router.post('/updatePassword', verifyToken(), updatePassword);


module.exports = router