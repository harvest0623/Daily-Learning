import dotenv from 'dotenv'
import path from 'path'  // node 内部封装好的路径模块
import { fileURLToPath } from 'url'
import { createCrawl, createCrawlOpenAI } from 'x-crawl'
import fs from 'fs'

dotenv.config({
    path: path.join(
        path.dirname(fileURLToPath(import.meta.url)),  // 获取当前文件所在目录
        '..',                                          // 上一级目录
        '.env.local'
    )
})

// 读取环境变量中的配置
const apiKey = process.env['OPENAI_API_KEY'];
const baseURL = process.env['OPENAI_BASE_URL'];
const model = process.env['OPENAI_MODEL'];


// 创建爬虫应用 (内置了 Puppeteer 浏览器， 可以打开网页)
const crawlApp = createCrawl();

async function main() {
    const url = 'https://juejin.cn/hot/articles';
    const limit = 50;

    console.log(`打开页面：${url}`);

    // 用内置的 Puppeteer 浏览器打开页面
    const res = await crawlApp.crawlPage(url);
    const { page, browser } = res.data;   // page: 页面对象， browser: 浏览器对象

    // 等待文章加载完毕
    await page.waitForSelector('.article-item-link', { timeout: 20000 });  // 等待 20s 文章加载完毕

    // 提取整个文章列表的 html （后续交给 AI 解析）
    const targetHTML = await page.$eval('.hot-list', (el) => el.outerHTML);

    // console.log(targetHTML);

    // AI 解析targetHTML 提取结构
    if (apiKey) {
        const crawlOpenAIAPP = createCrawlOpenAI({  // 创建 AI 应用
            clientOptions: { apiKey, baseURL },
            defaultModel: {
                chatModel: model,
            }
        });

        // 让 AI 提取数据
        const aiResult = await crawlOpenAIAPP.parseElements(
            targetHTML,
            `这是掘金文章热榜列表，需要获取每条文章的以下信息。使用括号内的英文作为属性名：
            - 排名(rank)
            - 标题(title)
            - 文章链接(url)，需要补全为 https://juejin.cn/xxx
            - 作者名称(author)
            - 作者链接(author_url)，需要补全为 https://juejin.cn/xxx
            - 热度值(heat)
            - 浏览量(views)
            - 互动数(interactions)
            - 收藏数(collections)`
        )

        // console.log(aiResult);
        await browser.close();

        // 数据本地保存
        fs.writeFileSync(`./juejin_hot_${Date.now()}.json`, JSON.stringify(aiResult), 'utf-8');
        console.log('文件已保存');
    }
}

main();