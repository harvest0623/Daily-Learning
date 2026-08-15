while (true) {
    const response = await llm.chat(messages)

    if (response.toolCalls.length === 0) {
        break  // 没有工具调用，说明完成
    }

    for (const toolCall of response.toolCalls) {
        const result = await executeTool(toolCall)
        messages.push(result)  // 把工具调用结果添加到消息中
    }

}