export default function App5() {
    const songs = [
        { id: 1, name: '稻香' },
        { id: 2, name: '夜曲' }
    ];
    // 带参数的事件函数
    const handler = (name) => {
        console.log('点击了歌曲：', name);
    };
    return (
        <ul>
            {songs.map((item) => (
                <li 
                    key={item.id} 
                    // 箭头函数传参，点击时执行handler并传入歌曲名
                    onClick={() => handler(item.name)}
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
}