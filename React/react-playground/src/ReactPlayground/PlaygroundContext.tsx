import { createContext, useState, type PropsWithChildren } from 'react'
import type { EditorFile } from '../components/CodeEditor/Editor.tsx'
import { getFileNameLanguage } from '../ReactPlayground/utils.ts'
import { initFiles } from './files.ts'

export interface Files {
    [key: string]: EditorFile
}

export interface PlaygroundContext {
    selectedFileName: string,
    files: Files,
    setSelectedFileName: (fileName: string) => void,
    setFiles: (files: Files) => void,
    removeFile: (fileName: string) => void,
    updateFileName: (oldFileName: string, newFileName: string) => void,
    addFile: (fileName: string) => void,
}

// files = {
//     'App.tsx': {
//         name: 'App.tsx',
//         value: '',
//         language: 'typescriptreact',
//     },
//     'index.tsx': {
//         name: 'index.tsx',
//         value: '',
//         language: 'typescriptreact',
//     },
// }


export const PlaygroundContext = createContext<PlaygroundContext>({  // 创建一个上下文对象，它是响应式的
    selectedFileName: 'App.tsx',
} as PlaygroundContext)  // 类型断言，告诉 ts 这就是上下文对象，你别管


export const PlaygroundProvider = (props: PropsWithChildren) => {
    const { children } = props;
    const [files, setFiles] = useState<Files>(initFiles);
    const [selectedFileName, setSelectedFileName] = useState<string>('App.tsx');

    const addFile = (name: string) => {
        setFiles((prevFiles) => {
            return {
                ...prevFiles,
                [name]: {
                    name,
                    value: '',
                    language: getFileNameLanguage(name),  // 'home.tsx'
                },
            }
        })
    }

    // const removeFile = (name: string) => {
    //   delete files[name]
    //   setFiles({...files})
    // }

    const removeFile = (name: string) => {
        setFiles((prevFiles) => {
            const { [name]: _, ...restFiles } = prevFiles;
            return restFiles;
        })
    }

    const updateFileName = (oldFileName: string, newFileName: string) => {
        if (!files[oldFileName] || !newFileName || oldFileName === newFileName) {
            return;
        }

        setFiles((prevFiles) => {
            const { [oldFileName]: oldFile, ...restFiles } = prevFiles;
            return {
                ...restFiles,
                [newFileName]: {
                    ...oldFile,
                    name: newFileName,
                    language: getFileNameLanguage(newFileName),
                },
            }
        })
    }

    return (
        <PlaygroundContext.Provider
            value={{
                selectedFileName,
                files,
                setSelectedFileName,
                setFiles,
                addFile,
                removeFile,
                updateFileName,
            }}
        >
            {children}
        </PlaygroundContext.Provider>
    )
}