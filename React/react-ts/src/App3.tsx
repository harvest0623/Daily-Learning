import React, { useEffect, useRef } from 'react'

const Child: React.ForwardRefRenderFunction<HTMLInputElement> = (props, ref) => {
    return (
        <div>
            <input ref={ref} />
        </div>
    )
}
const WrapChild = React.forwardRef(Child); // 将 WrapChild 上的 ref 传递给 Child 组件

export default function App3() {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        console.log(ref.current);
        ref.current?.focus();
    });
    return (
        <div>
            {/* <input ref={ref} /> */}
            <WrapChild ref={ref}></WrapChild>
        </div>
    )
}