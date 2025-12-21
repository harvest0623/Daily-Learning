import { useState } from "react";

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(100);
        }, 1000)
    })
}

export default function State() {
    // 不支持异步
    // const [num, setNum] = useState(async() => {
    //     const res = await getData();
    //     return res;
    // });
    const [num, setNum] = useState(() => {
        return 1;
    });
    function add() {
        setNum((prev) => {
            console.log(prev); // num 被修改前的状态
            return prev + 1;
        })
    }
    return (
        <div onClick={add}>{num}</div>
    )
}
