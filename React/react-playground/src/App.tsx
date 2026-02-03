import ReactPlayground from './ReactPlayground/Index'
import './App.scss'
import { PlaygroundProvider } from './ReactPlayground/PlaygroundContext'

export default function App() {
    return (
        <PlaygroundProvider>
            <ReactPlayground />
        </PlaygroundProvider>
    )
}