import React, { useState } from 'react'
export default function App() {
    const list = useState(['html', 'css', 'js']);
    const handle = (e) => {
        console.log();
    }
    const foo = (e) => {
        console.log();
    }
    
    return (
        <div>
            <ul>
                {
                    list.map((item, index) => {
                        return <li key={index} onClick={num % 2 == 0 ? handle : foo}>{item}</li>
                    })
                }
            </ul>
        </div>
    )
}