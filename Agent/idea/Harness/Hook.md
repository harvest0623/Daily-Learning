# Agent 出bug
- 需要： Hook（在关键节点插入拦截）、可观测性（知道Agent在做什么、花了多少钱、干的好不好）


# Hook
在Agent执行的过程中加一个最小组件（Hook）来防止犯错

1. PreToolUse

2. PostToolUse

    - claudeCode 在Agent生命周期的每个节点插入一个Hook，统计27种事件类型

        1. 工具相关
        2. 会话生命周期
        3. 上下文管理
        4. 协作相关
        5. 文件和工作区

    - Hook是只读的，不能被Agent的修改


# 可观测性
- AI Gateway -- 应用和模型API之间的代理层。它能自动记录每一次的API调用，包括请求参数、响应结果、耗时等、token消耗等。