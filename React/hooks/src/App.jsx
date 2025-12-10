import { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0); // [0, fn]
    const [list, setList] = useState([]);
    const [name, setName] = useState(() => {
        return 
    })
    function add() {
        setCount(count + 1);
        setList(() => {
            const arr = list;
            arr.push('html');
            return arr;
        })
    }
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={add}>add</button>
            <ul>
                {
                    list.map((item, i) => {
                        return <li key={i}>{item}</li>
                    })
                }
            </ul>
            <h3></h3>
        </div>
    )
}
