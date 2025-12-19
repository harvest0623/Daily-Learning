import { create } from "zustand";

const fetchApi = async() => {
    const response = await fetch('https://mock.mengxuegu.com/mock/66585c4db462b81cb3916d3e/songer/songer');
    const res = await response.json();
    return res.data;  // async函数中 return 的值等同于 promise 里面 resolve 出来的值
}
const useListStore = create((set) => ({
    list: [],
    fetchList: async() => {
        const res = await fetchApi();
        set({list: res})
    }
}))

export default useListStore