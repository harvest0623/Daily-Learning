import MonacoEditor from '@monaco-editor/react'
import type { EditorProps, OnMount } from '@monaco-editor/react'
import { createATA } from './Editor/ata.ts'

export interface EditorFile {
    name: string
    value: string
    language: string
}

interface Props {
    file: EditorFile
    onChange?: EditorProps['onChange'],
    options?: EditorProps['options'],
}

export default function Editor(props: Props) {
    const { file, onChange, options } = props;

    // const code = `
    // import './App.scss'
    // import lodash from 'lodash'

    // export default function App() {
    //   return (
    //     <div>Hello World</div>
    //   )
    // }`

    // 编辑器加载完毕执行的回调
    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, () => {
            editor.getAction('editor.action.formatDocument')?.run();
        })

        // 兼容处理 jsx
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            esModuleInterop: true,
        })

        // 类型提示
        const ata = createATA((code, path) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`);
        })

        // 监听编辑器内容变化，更新类型提示
        editor.onDidChangeModelContent(() => {
            ata(editor.getValue());
        })
        ata(editor.getValue());
    }

    return (
        <MonacoEditor
            height="100%"
            language={file.language}
            path={file.name}
            value={file.value}
            onMount={handleEditorMount}
            onChange={onChange}
            options={{
                minimap: {
                    enabled: false,
                },
                fontSize: 14,
                scrollBeyondLastLine: false,
                scrollbar: {
                    verticalScrollbarSize: 6,
                    horizontalScrollbarSize: 6,
                },
                ...options,
            }}
        />
    )
}