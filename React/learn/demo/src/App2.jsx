import './App2.css'
export default function App(){
    const name = 'henry';
    const songs = [
        {id: 1, name: '稻香'},
        {id: 2, name: '夜曲'},
        {id: 3, name: '晴天'}
    ];
    let flag = true;
    const styleObj = {
        color: 'red'
    }
    return (
        <div>
            {/* <h1>你好,我是{name}</h1> */}
            <ul>
                {
                    songs.map((item, i) => {
                        return <li key={item.id}>{item.name}</li>
                    })
                }
            </ul>
            {/* <h2>{flag ? '我比他帅' : '他比我帅'}</h2>
            <h2>{flag && '只有flag为真才显示我'}</h2>
            <div className="box" style={{color: 'green'}}>帅哥</div>
            <div className="box" style={styleObj}>帅哥</div>
            <div className="box">帅哥</div> */}
        </div>
    );
}
