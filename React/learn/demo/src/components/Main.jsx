// components/Main.jsx（主体组件）
export default function Main() {
    const songs = [{ id: 1, name: '稻香' }, { id: 2, name: '夜曲' }];
    return (
        <main>
          <h2>热门歌曲</h2>
          <ul>
            {
              songs.map(item => <li key={item.id}>{item.name}</li>)
            }
          </ul>
        </main>
    );
}