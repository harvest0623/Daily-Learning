/**
 * JIT Context Agent 实验
 * pnpm start
 * 体验按需加载的方式来排查问题
 */
import { runAgent } from './agent.js'

await runAgent('用户反馈登录后总是跳到 /admin，不管他们之前访问的是哪个页面，帮我定位这个 bug')