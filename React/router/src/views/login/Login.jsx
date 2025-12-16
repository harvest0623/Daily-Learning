import './Login.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();
    const login = () => {
        // navigate('/home?id=123')
        navigate('/home/id123')
    }
    return (
        <div className="login">
            <div className="login-container">
                <h2>后台管理系统</h2>
                <div className="item">
                    <label>账号：</label>
                    <input type="text" />
                </div>
                <div className="item">
                    <label>密码：</label>
                    <input type="text" />
                </div>
                <div className="item">
                    <button onClick={login}>登录</button>
                </div>
            </div>
        </div>
    )
}
