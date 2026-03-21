## 函数调用（Function Calling）
1. LLM 只能回答训练截止前的知识，一些实时的、当下的知识，LLM 无法回答
2. LLM 通信时需要接收一个 tools 参数，我们可以指明告诉 LLM，遇到解决不了的问题时，可以调用 tools 中的函数