# react 16.8 之前
- 类组件
    1. 通过 this.state = {} 来存放组件的状态(状态指的是，一经修改就会导致组件重新渲染)
    2. 通过 setState 来修改某个变量的状态，带来组件的重新渲染

- 生命周期
    1. componentDidMount
    2. componentDidUpdate
    3. componentWillUnmount

# v17 +
- 函数组件
- hooks 为函数组件带来了活力
1. useState()  为函数组件定义状态
2. useEffect(() => {}) 会在组件初次加载和每次重新渲染时触发
    useEffect(() => {}, []) 只在组件初次加载时触发
    useEffect(() => {}, [x]) 初次加载，和 x 值变更时触发
    useEffect 中返回一个函数，该函数会在组件销毁前触发