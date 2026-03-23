## MCP (Model Context Protocol 模型上下文协议)
统一 LLM 与外部工具的交互方式，通过定义工具（tools），将 LLM 转换为可执行的命令，从而实现 LLM 与外部工具的交互。

1. 构建一个 MCP 服务
2. 往 MCP 服务中注册一个工具函数
3. 构建一个 MCP 客户端（通常是一个应用程序）
4. MCP 客户端向 LLM 发请求，LLM 无法处理该请求，于是调用 MCP 服务中的工具函数 listFiles
5. MCP 客户端接受 MCP 服务返回的结果