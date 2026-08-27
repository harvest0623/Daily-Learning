import { globFiles, grepContent, readFileTool } from './tools.js'
import { mockModel } from './model.js'

export interface ToolCall {
    name: string
    args: any
}

const tools: Record<string, (args: any) => Promise<string>> = {
    glob_files: async ({ pattern }) => (await globFiles(pattern)).join('\n'),
    grep_content: async ({ pattern, path }) => {
        const hits = await grepContent(pattern, { path })
        return hits.map(h => `${h.file}:${h.line}  ${h.content}`).join('\n')
    },
    read_file: async ({ path }) => readFileTool(path),
}

export async function runAgent(userMessage: string, maxTurns = 8) {
    const toolHistory: { name: string; args: any; result: string }[] = []
    let turn = 0

    console.log(`👤 用户: ${userMessage}\n`)

    while (turn < maxTurns) {
        turn++
        const decision = mockModel({ userMessage, toolHistory })

        if (decision.kind === 'final') {
            console.log(`\n🤖 Agent 答案:\n${decision.content}`)
            console.log(`\n📊 共 ${turn - 1} 轮工具调用，${toolHistory.length} 次工具执行`)
            const totalChars = toolHistory.reduce((sum, h) => sum + h.result.length, 0)
            console.log(`📏 工具返回总字符: ${totalChars}（按 1 token ≈ 2 字符估算 ≈ ${Math.ceil(totalChars / 2)} tokens）`)
            return
        }

        const { name, args } = decision.call
        console.log(`🔧 Turn ${turn}: ${name}(${JSON.stringify(args)})`)
        const tool = tools[name]
        if (!tool) {
            throw new Error(`未知工具: ${name}`)
        }
        const result = await tool(args)
        const preview = result.length > 200 ? result.slice(0, 200) + `\n... (+${result.length - 200} 字符)` : result
        console.log(`   ↳ ${preview.replace(/\n/g, '\n   ')}\n`)
        toolHistory.push({ name, args, result })
    }
}