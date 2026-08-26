# Skills
与其教模型使用新的协议，不如让它使用它最擅长的能力---读文件

- 如果skills过错，比如 100+ 个skills, 不可能将所有的内容都塞进上下文

- 如何处理这种情况：采用三层渐进式的加载
    1. Frontmatter(永远都加载)
        每个skill.md 开头都有一段 YAML 格式的 Frontmatter
        ---
        name: weather-info
        description: 获取全球任意城市的实时天气信息和天气预报。当用户询问天气、温度、降雨、风速等气象信息时，使用此技能。
        version: 1.0.0
        author: Claude Code User
        ---
        
    2. 完整的内容（按需加载）
        只有当模型判断当前任务跟某个skill相关时，才会加载该skill的完整内容

    3. 引用文件（再按需加载）
        因为skills 文件夹下可以存在 scripts (可执行的脚本)、 references（参考文档） 等文件，这些文件不去主动加载，模型需要时采用 Read 工具来读取



# claudeCode 的skills 系统

# OpenClaw 的skills 系统

# Skills vs MCP
1. MCP走的是 协议标准化 --- 定义一套通用协议，任何加客户端都能接入，好处是跨平台，坏处是协议本身也是占用Token开销的

2. Skills走的是 文件约定 --- 一个文件夹，一个md文件，几个脚本。好处是简单，轻量，模型天然会用读文件的能力，坏处是没有标准化的跨平台协议。

- skills 可以安装在claudeCode的全局，也可以放在由claudeCode管理的项目中

- MCP是能力，Skills是 知识+能力。

- MCP 和 Skills 不是竞争关系，而是合作关系，是分工系统--- Skills负责”知道怎么做“, MCP负责”实现它“