import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod'
import { SimpleRag } from '../index.js'
import { loadPrompt } from './utils.js'
import path from 'path'
import fs from 'fs/promises'

// 创建MCPServer
const server = new McpServer({
    name: 'AskYourLib',
    version: '1.0.0'
})

let simpleRagInstance = null

server.tool(
    'ask-your-lib-initialize',
    `Initialize the vector database operations and clean up any existing .vectra directory.`,
    {},
    async () => {
        try {
            // 先看.vectra 这个目录是否存在，存在就移除
            const projectRoot = path.join(import.meta.dirname, '../../')
            const vectraPath = path.join(projectRoot, '.vectra')
            const generateMcpPrompt = await loadPrompt('generate')  // 加载一份提示词

            try {
                await fs.access(vectraPath)  // 先探明是否有权限操作这个目录
                await fs.rm(vectraPath, { recursive: true, force: true })  // 移除已有的
                console.log('成功删除已存在的 .vectra 目录');
            } catch (error) {
                console.log('.vectra 目录 不存在，无需删除');
            }

            // 创建 SimpleRag 
            simpleRagInstance = new SimpleRag()

            // 返回一份提示词，用于告诉LLM下一步该干什么
            return {
                content: [{
                    type: 'text',
                    text: `⚠️ The guide to follow: \n${generateMcpPrompt}\n\n`
                }]
            }
        } catch (error) {
            console.error(`初始化SimpleRag失败：${error}`)
            return {
                content: [{
                    type: 'text',
                    text: `初始化SimpleRag失败：${error}`
                }]
            }
        }
    }
)

server.tool(
    'ask-your-lib-insert',
    `Insert and vectorize text content into the vector database.`,
    {
        text: z.string()
    },
    async ({ text }) => {
        try {
            if (!simpleRagInstance) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: 'Database instance is not initialized. Please call ask-your-lib-initialize first.'
                        }
                    ]
                };
            }

            if (!simpleRagInstance.avaliable) {
                await simpleRagInstance.initialize()   // 本地创建一个新的 .vectra 目录
            }

            const result = await simpleRagInstance.add(text)  // 写入本地向量数据库中

            return {
                content: [{
                    type: 'text',
                    text: `Text inserted successfully. Inserted items: ${JSON.stringify(result)}`
                }]
            }

        } catch (error) {
            console.error(`文本写入数据库失败：${error}`)
            return {
                content: [{
                    type: 'text',
                    text: `Error inserting text：${error}`
                }]
            }
        }
    }
)

async function main() {
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.log('服务端启动');
}
main()
