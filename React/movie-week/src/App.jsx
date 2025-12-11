import { useState, useEffect } from 'react';
import './app.css';
import MovieItem from './components/MovieItem'

export default function App() {
    const [movieList, setMovieList] = useState([])
    useEffect(() => {
        // 发请求
        fetch('https://apis.netstart.cn/maoyan/index/movieOnInfoList')
        .then(res => res.json())
        .then(data => {
            console.log(data.movieList);
            // movieList = data.movieList
            setMovieList(data.movieList)
        })
    }, [])

    return (
        <div className="page">
            <div className="head">一周口碑电影榜</div>
            <div className="banner">
                <div className="title">
                    <p className='title-bar'>一周口碑电影榜</p>
                    <i className='iconfont icon-icon-douban'></i>
                </div>
            </div>
            <div className="content">
                <div className="nav">
                    <div className="num">看过0部/共10部</div>
                    <div className="login">登录查看成就</div>
                </div>
                {
                    movieList.map((item, i) => {
                        return <MovieItem key={item.id} data={item} />
                    })
                }
            </div>
        </div>
    )
}