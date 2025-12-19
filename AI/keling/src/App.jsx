import { useState } from "react"

export default function App() {
    const [imgUrl, setImgUrl] = useState('');
    const generateImage = async() => {
        // 获取用户在 textarea 中输入的内容
        const endPoint = '/ali/v1/services/aigc/text2image/image-synthesis';
        const negative_prompt = 'Blurry, Bad, Bad anatomy, Bad proportions, Deformed, Disconnected limbs, Disfigured, Extra arms, Extra limbs, Extra hands, Fused fingers, Gross proportions, Long neck, Malformed limbs, Mutated, Mutated hands, Mutated limbs, Missing arms, Missing fingers, Poorly drawn hands, Poorly drawn face.';
        const token = await(await fetch('/api/jwt-auth')).text();
        
        // 跟大模型交互
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `application/json`
        }
        const payload = {
            prompt: '一个8岁左右的小女孩抱着一只橘猫,小女孩笑的非常开心',
            negative_prompt: negative_prompt,
            aspct_ratio: '1:1'
        }
        const res = await fetch(endPoint, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(payload)
        })
        console.log(res);
    }
    return (
        <div className="container">
            <div>
                <label>Prompt:</label>
                <button onClick={generateImage}>生成</button>
                <textarea></textarea>
            </div>
            <div className="output">
                <img src={imgUrl} alt="" />
            </div>
        </div>
    )
}
