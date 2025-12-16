# 路由
以前是多页应用

后来是单页应用 只有一个 html，

http://localhost:5173/home  展示首页 (把首页这个组件让它加载到 html 文件中)

http://localhost:5173/about 把about这个组件加载到 html 中

只要 url 变更，就会加载对应的组件

# 页面 vs 组件
配路由的叫页面

1. BrowserRouter 一种路由模式 (history)
2. Routes 提供一个路由出口，里面配置很多路由项
3. Route 每一个配置项
4. Outlet 二级路由出口
5. Link 导航链接
6. useNavigate 路由提供的 hook 函数，用来做路由跳转