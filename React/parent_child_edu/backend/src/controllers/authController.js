function login(ctx) {
    // 解析请求体中的账号密码
    const { phone, password } = ctx.request.body;
    if(!phone || !password) {
        ctx.status = 400; // 设置 http 的状态码
        ctx.body = {
            message: '账号和密码不能为空'
        }
        return;
    }

    // 去数据库中查询是否存在相同的账号密码
    const user = ctx.db.users.find(user => user.phone === phone && user.password === password);
    if(!user) {
        ctx.status = 401; // 设置 http 的状态码
        ctx.body = {
            message: '账号或密码错误'
        }
        return;
    }

    // 登录成功后，将用户信息存储到 session 中
    ctx.session.user = user;
    ctx.body = {
        message: '登录成功'
    }   
}

module.exports = {
    login
}