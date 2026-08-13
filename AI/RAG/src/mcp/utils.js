import { join } from 'path'
import { promises as fs } from 'fs'

const getCurrentDir = () => import.meta.dirname   // mcp 文件夹的绝对路径


export async function loadPrompt(prompName) {
    try {
        // 获取当前文件目录地址
        const currentDir = getCurrentDir()

        const promptPath = join(currentDir, 'prompts', `${prompName}.md`)

        // 读取提示词，返回内容
        const content = await fs.readFile(promptPath, 'utf-8')
        return content

    } catch (error) {
        throw new Error(`读取${prompName}失败：${error.message}`)
    }
}