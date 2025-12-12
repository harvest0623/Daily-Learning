// App.jsx（根组件）
import Head from './components/Head';
import Main from './components/Main';

export default function App6() {
    return (
        <div className="app">
            {/* 引入头部组件 */}
            <Head />
            {/* 引入主体组件 */}
            <Main />
        </div>
    );
}

// export default function App6() {
//     const arr = [1, 2, 3, 4];
//     // map返回新数组，可直接渲染或赋值使用
//     const newArr = arr.map(item => item * 10);
//     return (
//         <div>
//             <p>原数组：{arr.join(',')}</p>
//             <p>放大10倍:{newArr.join(',')}</p>
//         </div>
//     );
// }