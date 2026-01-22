import '../styles/AiChat.less'
import { useState } from 'react'
import { DotLoading } from 'antd-mobile'

export default function AiChat() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'user',
            content: '你好',
            timestamp: new Date()
        },
        {
            id: 2,
            role: 'ai',
            content: '你好，我是智能对话小助手',
            timestamp: new Date()
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(true);
    return (
        <div className="ai-dialogue-root">
            <header className="ai-dialogue-header">
                <div className="ai-dialogue-header__back">
                    <i className="iconfont icon-fanhui"></i>
                </div>
                <h1>智能对话</h1>
                <div className="ai-dialogue-header__more">
                    <i className="iconfont icon-gengduo"></i>
                </div>
            </header>

            <div className="ai-dialogue-main">
                <div className="ai-dialogue-messages">
                    {/* 欢迎 */}
                    {
                        messages.length === 0 && (
                            <div className="ai-dialogue-welcome">
                                <i className="iconfont icon-jiqirenzhushou ai-dialogue-avatar"></i>
                                <p>欢迎来到智能对话，我是智能对话小助手，有什么我可以帮助你的吗？</p>
                            </div>
                        )
                    }

                    {/* 消息列表 */}
                    {
                        messages.map((message) => (
                            <div className={`ai-dialogue-message ${message.role === 'user' ? 'user-message' : 'ai-message'}`} key={message.id}>
                                <div className="ai-dialogue-message__content">
                                    <div className="ai-dialogue-message__text">{message.content}</div>
                                    <div className="ai-dialogue-message__time">{message.timestamp.toLocaleTimeString()}</div>
                                </div>
                            </div>
                        ))
                    }

                    {/* AI消息回复中 */}
                    {
                        isLoading && (
                            <div className="ai-dialogue-message ai-message">
                                <div className="ai-dialogue-message__content">
                                    <span style={{ fontSize: 24 }}>
                                        <DotLoading />
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <footer className="ai-dialogue-footer">
                <div className="ai-dialogue-input-container">
                    <textarea 
                        className="ai-dialogue-input" 
                        placeholder="请输入"
                        rows={1}
                    ></textarea>

                    <div className="ai-dialogue-actions">
                        <button className={`ai-dialogue-voice-btn ${isRecording ? 'recording' : ''}`} onClick={() => setIsRecording(!isRecording)}>
                            <i className={`iconfont ${isRecording ? 'icon-jieshu' : 'icon-maikefeng-copy'}`}></i>
                        </button>
                        <button className="ai-dialogue-send-btn">
                            <i className="iconfont icon-fasong"></i>
                        </button>
                    </div>
                </div>

                {
                    isRecording && (
                        <div className="ai-dialogue-recording-indicator">
                            <p style={{ fontSize: 16 }}>正在录音...</p>
                        </div>
                    )
                }
            </footer>
        </div>
    )
}