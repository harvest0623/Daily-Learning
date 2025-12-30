import { createPortal } from "react-dom"

export default function App2() {
    const content = <div className="btn">
                        <button>按钮</button>
                    </div>
    return createPortal(content);
}
