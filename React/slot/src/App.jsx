// import './App.css'
import Border from "./components/Border"
import Aaa from "./components/Aaa"

export default function App() {
    return (
        <div>
            {/* <Border>
                <div className="home">首页</div>
            </Border> */}

            <div className="container">
                <Aaa>
                    {
                        // <a href="#">首页</a>
                        // <a href="#">关于</a>
                        // <a href="#">我的</a>
                        [
                            <span>111</span>,
                            <span>333</span>,
                            [<span>222</span>, <span>222</span>]
                        ]
                    }
                </Aaa>
            </div>
        </div>
    )
}
