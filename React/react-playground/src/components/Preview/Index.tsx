import { compile } from './compiler.ts'
import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext.tsx'
import Editor from '../CodeEditor/Editor.tsx'

export default function Preview() {
    const { files } = useContext(PlaygroundContext);
    const [compiledCode, setCompiledCode] = useState<string>('');
    // console.log(compile(files), 'compiledCode');

    useEffect(() => {
        setCompiledCode(compile(files));
    }, [files]);
    return (
        <div style={{height: '100%'}}>
            <Editor file={{
                name: 'dist.js',
                value: compiledCode,
                language: 'typescript',
            }} />
        </div>
    )
}