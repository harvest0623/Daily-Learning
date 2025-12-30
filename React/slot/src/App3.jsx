import Protal from "./components/Protal"

export default function App3() {
    const content = <div className="btn">
                        <button>按钮</button>
                    </div>
    
    return <Protal attach={document.body}>{content}</Protal>
}
