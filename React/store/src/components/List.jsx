import { useEffect } from "react";
import useListStore from "../store/list"

export default function List() {
    // 从仓库拿list数据和fetchList方法
    const list = useListStore((state) => state.list);
    const fetchList = useListStore((state) => state.fetchList);

    // 组件一加载就调用接口拉数据
    useEffect(() => {
        fetchList()
    }, [])
    console.log(list);
    return (
        <div>
            {
                list.map((item) => {
                    return <div key={item.name}>{item.name}</div>
                })
            }
        </div>
    )
}
