# 多模态 AI 在线聊天网站 - 需求分析文档

## 项目概述

构建一个类似 DeepSeek 的在线 AI 聊天网站，支持文本和图片的多模态对话。

---

## 一、技术选型

| 层 | 技术 | 说明 |
|---|------|------|
| 前端 | 纯 HTML + CSS + JS | 无框架，原生 Web 技术 |
| 后端 | Next.js API Routes | 代理转发、会话管理 |
| AI 模型 | 硅基流动 Qwen3.6-27B | OpenAI 兼容 API，支持多模态（需确认具体模型名） |
| 存储 | 本地 JSON/文件存储 | MVP 阶段无需数据库 |

> **说明**：Next.js 可作为纯后端+静态资源服务器使用——前端 HTML/JS/CSS 放在 `public/` 目录，API 路由放在 `app/api/` 中处理业务逻辑。这样在保持纯 HTML/JS 前端的同时，利用 Next.js 的后端能力。

---

## 二、架构图

```
用户浏览器                     Next.js 服务端                 硅基流动 API
┌──────────────┐     HTTP      ┌──────────────┐    OpenAI协议   ┌──────────────┐
│ public/      │ ────SSE────→  │ app/api/     │ ────────────→  │ Qwen 模型    │
│ index.html   │ ←───JSON───   │ chat/route.ts│ ←────────────  │ (文本+图片)  │
│ app.js       │               │ upload/...   │                └──────────────┘
│ style.css    │               └──────┬───────┘
└──────────────┘                      │
                            ┌────────┴────────┐
                            │ data/           │
                            │ conversations/  │ (JSON 文件)
                            │ uploads/        │ (图片文件)
                            └─────────────────┘
```

---

## 三、MVP 功能清单

### 1. 基础对话
- 文本输入 → 流式 SSE 响应 → 打字机效果渲染
- Markdown 解析与渲染（代码高亮、表格）
- 对话上下文传递（多轮记忆）

### 2. 图片输入
- 图片上传（点击选择 / 拖拽 / 粘贴）
- 上传预览、压缩
- 图文一起发送给模型

### 3. 会话管理
- 新建对话
- 历史会话列表
- 切换/删除会话
- 本地持久化（localStorage）

---

## 四、硅基流动 API 对接

```javascript
// 硅基流动的 OpenAI 兼容接口
// Base URL: https://api.siliconflow.cn/v1
// Chat Completions: POST /chat/completions
// 多模态消息格式 (OpenAI Vision API 格式):
{
  "model": "Qwen/Qwen2.5-VL-72B-Instruct",  // 需确认具体模型ID
  "messages": [{
    "role": "user",
    "content": [
      { "type": "text", "text": "描述这张图片" },
      { "type": "image_url", "image_url": { "url": "data:image/jpeg;base64,..." } }
    ]
  }],
  "stream": true
}
```

### 关键对接要点
- **流式响应**：使用 SSE (Server-Sent Events) 实现打字机效果
- **图片处理**：前端压缩后转 base64 或上传后获得 URL，按 OpenAI Vision API 格式发送
- **上下文管理**：将历史消息数组随每次请求发送，维持多轮对话
- **API Key 安全**：Key 仅存放在服务端 `.env.local`，前端不直接调用硅基流动

---

## 五、项目文件结构

```
chat/
├── public/                    # 前端静态文件
│   ├── index.html             # 主页面
│   ├── css/
│   │   └── style.css          # 样式（深色/浅色）
│   ├── js/
│   │   ├── app.js             # 主入口逻辑
│   │   ├── chat.js            # 聊天核心逻辑
│   │   ├── session.js         # 会话管理
│   │   ├── upload.js          # 图片上传处理
│   │   ├── markdown.js        # Markdown 渲染
│   │   └── api.js             # API 调用封装
│   └── lib/                   # 第三方库（marked, highlight.js 等）
├── app/
│   └── api/
│       ├── chat/route.ts      # 聊天接口（SSE 流式代理）
│       └── upload/route.ts    # 图片上传接口
├── lib/
│   ├── siliconflow.ts         # 硅基流动 API 封装
│   └── session.ts             # 会话存储逻辑
├── data/                      # 运行时数据目录
│   ├── conversations/         # 对话存储
│   └── uploads/               # 上传文件
├── .env.local                 # 环境变量（API Key）
└── package.json
```

---

## 六、开发分阶段计划

| 阶段 | 内容 | 预计产出 |
|------|------|---------|
| **Phase 1** | Next.js 项目初始化 + API 路由搭建 + 硅基流动 API 对接 + 流式响应 | 后端可跑通文本对话 |
| **Phase 2** | 前端 HTML/JS 聊天界面 + 流式输出 + Markdown 渲染 | 可进行文本对话 |
| **Phase 3** | 图片上传 + 预览 + 多模态请求 | 可发送图片给 AI |
| **Phase 4** | 会话管理 + 历史记录 + localStorage 持久化 | 完整的 MVP |

---

## 七、待确认事项

1. 硅基流动上模型的具体名称（如 `Qwen/Qwen2.5-VL-32B-Instruct`），以及是否支持视觉（图片）输入
2. 硅基流动 API Key 是否已准备好
3. 是否需要用户系统（登录/注册）——当前 MVP 不包含