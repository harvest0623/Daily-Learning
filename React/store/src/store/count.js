import { create } from "zustand";

const useCountStore = create((set) => ({
    // 数据
    count: 0,
    age: 19,
    increase: () => set((state) => ({count: state.count + 1})),  // 用 set 修改 state 中的值会带来视图更新
    decrease: (val) => set((state) => ({count: state.count - val}))
}))

export default useCountStore
