import os  # 导入 os 模块，用于获取环境变量
from dotenv import load_dotenv  # 导入 load_dotenv 函数，用于加载环境变量
from openai import OpenAI  # 专门用来连接 LLM 的库
import streamlit as st  # 专门用来创建应用页面的库

load_dotenv() # 从.env 文件中读取内容

api_key = os.getenv('API_KEY') or st.secrets.get('API_KEY')

client = OpenAI(
    api_key=api_key,
    base_url="https://api.deepseek.com"
)

# ============================== 创建 Web 应用 ============================== #
st.title("🤖 我是你的专属助理")  # 有一个 html 文件，里面写了一个 <h1>🤖 我是你的专属助理</h1>
st.caption("基于 deepseek-v4-flash 模型")

# ============================== 初始化对话历史 ============================== #
# session_state 是 st 提供的会话状态管理器，用于在用户的交互过程中保存数据
if "messages" not in st.session_state:
    st.session_state.messages = []

# ==============================  显示历史消息 =============================== #
for message in st.session_state.messages:
    with st.chat_message(message["role"]):  # 创建一个消息容器
        st.write(message["content"])        # 往容器中写入内容

# ========================= 处理用户输入的内容  =============================== #
if prompt := st.chat_input("请输入你的问题..."):  # 创建一个 input 框，用于接收用户的问题

    # 将用户的问题添加到对话历史中
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    # 在页面上展示用户的问题
    with st.chat_message("user"):
        st.write(prompt)
    
    # 创建一个 AI 响应的容器
    with st.chat_message("assistant"):

        # 调用 deepseek，并获取到响应，写入容器中
        response = client.chat.completions.create(
            model="deepseek-v4-flash",
            messages=[  # 用户的问题
                {"role": "system", "content": "你是一个友好的 AI 助手"},
                # * 解包运算符，将一个数组中的内容，解包到另一个数组中
                *st.session_state.messages
            ],
            stream=True
        )
    
        # 处理流式资源
        full_response = st.write_stream(
            chunk.choices[0].delta.content or ""
            for chunk in response
            if chunk.choices[0].delta.content
        )

         # 将 AI 返回的内容添加到历史消息中
        st.session_state.messages.append({"role": "assistant", "content": full_response})