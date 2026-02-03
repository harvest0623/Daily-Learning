import { useState } from 'react'
import './App.css'

export default function App() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>hello world</h1>
            <div className="card">
                <button onClick={() => setCount(count + 1)}>count is {count}</button>
            </div>
        </div>
    )
}