import { useState } from 'react'
import './app.css'
import { marked } from 'marked'

export default function App() {
    const [input, setInput] = useState('你好，帮我列出目录下的文件');
    const [think, setThink] = useState('');
    const [result, setResult] = useState('');

    const update = async () => {
        if (!input) {
            return;
        }
        setThink('思考中...');

        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                message: input,
            })
        });

        const data = await response.json();
        console.log(data);
        setThink('');
        setResult(marked(data.reply));
    }

    return (
        <div className="container">
            <div>
                <label>输入：</label>
                <input type="text" className="input" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className="submit" onClick={update}>提交</button>
            </div>

            <div className="output">
                <div className="think">{think}</div>
                <div className="result" dangerouslySetInnerHTML={{ __html: result }}></div>
            </div>
        </div>
    )
}
