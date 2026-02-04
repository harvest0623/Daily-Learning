import { ENTRY_FILE_NAME } from '../../ReactPlayground/files';
import type { Files } from '../../ReactPlayground/PlaygroundContext.tsx'
import { transform } from '@babel/standalone'
import type { BabelFileResult, PluginObj } from '@babel/core';
import type { EditorFile } from "../CodeEditor/Editor";

export const babelTransform = (filename: string, code: string, files: Files) => {
    
    let res = '';
    try {
        res = transform(code, {
            presets: ['react', 'typescript'],
            filename,
            plugins: [customResolver(files)],  // 需要一个插件，在编译的过程中将 import 引入的文件路径替换为 blob
            retainLines: true,  // 保留原有格式
        }).code!;
    } catch (error) {
        console.error('编译出错:', error);
    }
    return res;
}

function customResolver(files: Files): PluginObj {
    return {
        visitor: {
            ImportDeclaration(path) {
                // path.node.source.value = '666';
                const modulepath = path.node.source.value;
                if(modulepath.startsWith('.')) {  // 都是我们自己写的模块
                    const file = getModuleFile(files, modulepath);
                    if(!file) {
                        return;
                    }
                    if(file.name.endsWith('.css')) {  // 是 css 文件就不处理成 blob，而是把 css 转成 js 语法
                        path.node.source.value = CssToJS(file);
                    } else if (file.name.endsWith('.json')) {    
                        path.node.source.value = JsonToJS(file);
                    } else {
                        path.node.source.value = URL.createObjectURL(
                            new Blob([babelTransform(file.name, file.value, files)], { type: 'application/javascript' })
                        );
                        return;
                    }
                }
            }
        }
    }
}

export const compile = (files: Files) => {
    const main = files[ENTRY_FILE_NAME];
    return babelTransform(ENTRY_FILE_NAME, main.value, files);
}

function getModuleFile(files: Files, modulepath: string) {
    let moduleName = modulepath.split('./').pop() || '';   //  './App.tsx' => 'App.tsx'
    if (moduleName.includes('.')) {
        const realModuleName = Object.keys(files).filter(key => {
            return key.endsWith('.ts') || key.endsWith('.tsx') || key.endsWith('.js') || key.endsWith('.jsx');
        }).find(key => {
            return key.split('.').includes(moduleName);
        })
        if (realModuleName) {
            moduleName = realModuleName;
        }
    }
    return files[moduleName];
}

const JsonToJS = (file: EditorFile) => {
    const js = `export default ${file.value}`;
    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }));
}

const CssToJS = (file: EditorFile) => {
    const randomId = new Date().getTime();
    const js = `
    (() => {
        const stylesheet = document.createElement('style')
        stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
        document.head.appendChild(stylesheet)

        const styles = document.createTextNode(\`${file.value}\`)
        stylesheet.innerHTML = ''
        stylesheet.appendChild(styles)
    })()
        `;
    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }));
}