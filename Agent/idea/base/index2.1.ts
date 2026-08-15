import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

const tools = {
    read_file: {},
    write_file: {},
    run_command: {}
}

async function agent(task: string) {
    const messages = [{ role: 'user', content: task }]
    let turnCount = 0
    const maxTurns = 30

    while (true) {
        if (++turnCount > maxTurns) {
            console.log('超出最大轮数，停止执行');
            break
        }

        const result = await generateText({
            model: anthropic('claude-sonnet-4-6'),
            messages,
            tools,
            maxSteps: 1,
        })

        if (result.toolCalls.length === 0) {
            console.log('Agent:', result.text);
            break
        }

        for (const toolCall of result.toolCalls) {
            console.log(`调用工具: ${toolCall.tool.name}(${toolCall.tool.arguments})`);

            const toolResult = await executeTool(toolCall)
            messages.push(
                { role: 'assistant', content: result.text, toolCalls: [toolCall] },
                { role: 'tool', content: toolResult, toolCallId: toolCall.id }
            )
        }
    }
}