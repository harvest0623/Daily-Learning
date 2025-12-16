import './Home.css'
import { Outlet, Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="home">
            <header className="header">
                <span>后台管理系统</span>
                <span>harvest</span>
            </header>
            <main className='body'>
                <aside className='aside'>
                    <ul>
                        <li><Link to='/home/class'>课程</Link></li>
                        <li><Link to='leetcode'>算法</Link></li>
                    </ul>
                </aside>
                <main className='content'>
                    <Outlet></Outlet>
                </main>
            </main>
        </div>
    )
}
