import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
    const num = 20;
    return (
        <div>
            <div className='home'>首页</div>
            <h2>age: {num}</h2>
        </div>
    )
    // const [count, setCount] = useState(0)
}