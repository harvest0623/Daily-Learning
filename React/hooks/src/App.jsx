import { useState } from 'react'

export default function App() {
    console.log('render');
    
    const [count, setCount] = useState(0);  // [0, fn]
    const [list, setList] = useState([]);
    const [name, setName] = useState(() => {
        return 'henry';
    })
    function add() {
        setCount(count + 1);
        console.log(count);  // 0
        setList(() => {
            list.push('html');
            return list;
        })
    }
    return (
        <div>
        <h2>{count}</h2>
        <button onClick={add}>add</button>
        <ul>
            {
                list.map((item, i) => {
                    return <li key={i}>{item}</li>;
                })
            }
        </ul>
            <h3>{name}</h3>
        </div>
    )
}
