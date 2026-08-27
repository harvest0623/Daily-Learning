import type { ToolCall } from './agent.js'

interface ModelInput {
    userMessage: string
    toolHistory: { name: string; args: any; result: string }[]
}

type ModelOutput =
    | { kind: 'tool_call'; call: ToolCall }
    | { kind: 'final'; content: string }

/**
 * Mock 模型：模拟 JIT 探索的决策逻辑。
 * 真实模型会自己想清楚下一步该做什么；这里我们用一个状态机来模拟。
 */
export function mockModel(input: ModelInput): ModelOutput {
    const used = (name: string) => input.toolHistory.some(h => h.name === name)
    const lastResult = (name: string) => input.toolHistory.find(h => h.name === name)?.result ?? ''
    const ranArgs = (name: string) => input.toolHistory.filter(h => h.name === name).map(h => h.args)

    // 还没看过项目结构 → 先 glob
    if (!used('glob_files')) {
        return { kind: 'tool_call', call: { name: 'glob_files', args: { pattern: '**/*.{ts,md}' } } }
    }

    // 还没读过 CLAUDE.md → 先看约定
    const readArgs = ranArgs('read_file')
    if (!readArgs.some(a => a.path === 'CLAUDE.md')) {
        return { kind: 'tool_call', call: { name: 'read_file', args: { path: 'CLAUDE.md' } } }
    }

    // 还没 grep returnTo → 看谁在用 returnTo
    if (!ranArgs('grep_content').some(a => a.pattern === 'returnTo')) {
        return { kind: 'tool_call', call: { name: 'grep_content', args: { pattern: 'returnTo' } } }
    }

    // grep 结果里 redirect.ts 提到了 returnTo（在注释里）但我们还没看实现 → 读它
    const grepResult = lastResult('grep_content')
    const suspectFile = 'src/middleware/redirect.ts'
    if (grepResult.includes(suspectFile) && !readArgs.some(a => a.path === suspectFile)) {
        return { kind: 'tool_call', call: { name: 'read_file', args: { path: suspectFile } } }
    }

    // 探索完了 → 给出答案
    return {
        kind: 'final',
        content:
            'Bug 定位：`src/middleware/redirect.ts` 的 `postLoginRedirect` 把所有用户硬编码跳到了 `/admin`，' +
            '没有读 `returnTo` cookie。\n\n修复方案：把 `res.redirect("/admin")` 改成 ' +
            '`res.redirect(req.cookies.returnTo || "/")`，然后再 `res.clearCookie("returnTo")`。',
    }
}