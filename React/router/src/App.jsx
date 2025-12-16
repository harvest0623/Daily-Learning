import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./views/login/Login"
import Home from './views/home/Home'
import Class from './views/class/Class'
import LeetCode from './views/leetcode/LeetCode'

export default function App() {
    return (
        <div>
            {/* 开辟一个路由配置区间 */}
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to='/login'/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/home' element={<Home/>}>
                        <Route path='/home' element={<Navigate to='/home/class'/>}></Route>
                        <Route path='/home/class' element={<Class/>}></Route>
                        <Route path='/home/leetcode' element={<LeetCode/>}></Route>
                    </Route>
                    <Route path='*' element={<h2>NOT FOUND</h2>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
