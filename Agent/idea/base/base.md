# 你见过哪些agent
1. 豆包桌面端
2. claudeCode
3. codex
4. TraeWorker
5. cursor
6. Manus
7. zCode
8. QCoder
9. openClaw
10. hermes

# claudeCode
/loop

# 一次Agent调用背后发生了什么？
你在终端跟你的 claude 说：帮我把src/utils.ts 里面的 formateDate 函数重构一下，将 momentjs 库替换为 dayjs 库

1. 它决定先做什么（读文件，分析内容，查看package.json 有无dayjs库, 如果没有, 则安装,改代码，测试...）
    想一步，做一步，看一步  的 循环

2. 它得能读文件，跑命令
    得有手才能干活，所以需要调用 Read工具读取文件，用 Bash 脚本跑命令， 调用Edit 工具修改文件，
    工具的定义，调度，并发的控制，权限的管理共同组成了 Tool System

3. 它得记住之前的操作，不能重复做
    假设一次重构需要修改15个文件，改到第十个文件时，它需要记住之前的操作，不能重复做第9个文件的操作。LLM上下文有限，前面信息太多，塞不下怎么办？

    context-engineering --- 上下文工程是Agent的大脑供养系统，决定了大脑能够接收多少养分，处理多少信息


4. 它得有记忆力
    第一次重构，你跟它说用pnpm 安装依赖，它需要记住这个信息，不能用npm 安装依赖，下一次再打开一个新会话，它还要记得用pnpm 安装依赖。

    Memory System  --- 跨会话的长期记忆

    context-- 单次会话的短期记忆


5. 复杂任务一个Agent搞不定，需要多个Agent合作
    主Agent在做开发的同时，需要读取上万行的代码库，可能就会fork出一个子Agent，来负责读取代码库，分析代码，压缩成一两千的token，交给主Agent 来处理。

    Multi-Agent System --- 多个Agent合作完成复杂任务， 并不是一人分饰多角，而是多个agent分隔上下文


6. 权限，Hook，重试，退出...
    rm -rf  谁来拦?

    API 挂了，要重试

    用户 Ctrl+C 退出，要保存当前状态

    模型陷入无限循环怎么检测？


# 以上六大核心构成了Agent的基本能力
1. Agent Loop  --- 想一步，做一步，看一步的循环  ---  心跳
2. Tool System  --- 读文件、跑命令、调用外部API   ---  手脚
3. Context Engineering  --- 管理有限的上下文窗口  ---  大脑供养
4. Memory   ---   跨会话的长期记忆    ----     记忆力
5. Multi-Agent ---  拆任务、分上下文  ---  团队协作
6. Harness Engineering ---  权限，Hook，重试，生命周期   --- 骨架