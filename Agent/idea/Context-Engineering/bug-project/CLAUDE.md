# Express Auth Demo

一个用 Express 写的演示项目。重点说一下登录跳转的设计：

1. 用户访问受保护页面（`/user`、`/admin`、`/settings`）时，如果还没登录，中间件会把当前 URL 写到 `returnTo` cookie 里，然后重定向到 `/auth/login`
2. 用户登录成功后，应该读 `returnTo` cookie，跳回原来访问的页面
3. 如果 `returnTo` 不存在（比如直接访问 `/auth/login`），跳到首页 `/`

任何破坏这个流程的改动都会让用户登录后到错误的页面。