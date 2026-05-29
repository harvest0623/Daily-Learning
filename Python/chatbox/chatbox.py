import os # 导入os模块，用于获取环境变量
from dotenv import load_dotenv # 导入load_dotenv函数，用于加载环境变量
from openai import OpenAI # 专门用来连接 LLM 的库
import streamlit as st # 专门用来创建 Web 应用的库

load_dotenv() # 从.env文件加载环境变量

client = OpenAI(
    api_key=os.getenv("API_KEY"),
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[  # 用户的问题
        {"role": "system", "content": "你是一个友好的 AI 助手"},
        {"role": "user", "content": "用三句话解释什么是人工智能"}
    ]
)
print(response.choices[0].message.content)
print(response.usage)