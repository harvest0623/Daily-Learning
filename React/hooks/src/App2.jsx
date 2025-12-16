import { useEffect, useState } from "react";

export default function App2() {
    console.log('重新渲染');
    
    const [count, setCount] = useState(0)
    const [list, setList] = useState([])
    // useEffect(() => {
    //   const timer = setInterval(() => {
    //     setCount(count + 1);
    //   }, 1000)

    //   return () => {  // 组件卸载前触发
    //     clearInterval(timer);
    //   }
    // }, [count])

    useEffect(() => {
        fetch('https://mock.mengxuegu.com/mock/66585c4db462b81cb3916d3e/songer/songer')
        .then(res => res.json())
        .then(data => {
            console.log(data.data);
            setList([...list, ...data.data])
        })
    }, [])
    return (
        <div>
        <button onClick={() => {setCount(count + 1 )}}>{count}</button>
        <ul>
            {
                list.map((item) => {
                    return <li key={item.name}>{item.name}--{item.songsCount}</li>;
                })
            }
        </ul>
        </div>
    )
}
