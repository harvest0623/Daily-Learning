import React, { useCallback, useMemo, useReducer, memo } from 'react'

interface Data {
    result: number
}

interface Action {
    type: string,
    num: number
}

export default function App4() {
    const [res, dispatch] = useReducer(reducer, {result: 0});
    function reducer(state: Data, action: Action) {
        switch (action.type) {
            case 'add':
                return {result: state.result + action.num};
            case 'minus':
                return {result: state.result - action.num};
            default:
                return {result: 0};
        }   
    }

    const count = useMemo(() => {
        console.log('useMemo');
        return res.result * 10;
    }, [])

    const cb = useCallback(() => {
        console.log('cb');
        return 666;
    }, [])
    return (
        <div>
            <div onClick={() => dispatch({type: 'add', num: 2})}>加</div>
            <div onClick={() => dispatch({type: 'minus', num: 1})}>减</div>
            <h1>{res.result} -- {count}</h1>
            <Child count={count} cb={cb}/>
        </div>
    )
}

const Child = memo((props: {count: number, cb: Function}) => {
    console.log('child');
    return <h2>{props.count}</h2>;
})