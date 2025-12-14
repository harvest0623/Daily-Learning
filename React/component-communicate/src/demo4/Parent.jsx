import Child1 from "./Child1";
import { createContext } from 'react';

export const Context = createContext()  // 创建一个上下文对象
export default function Parent() {
    return (
        <div>
            <h2> 父组件四 </h2>
            <Context.Provider value={'父组件的数据'}>
                <Child1/>
            </Context.Provider>
        </div>
    )
}