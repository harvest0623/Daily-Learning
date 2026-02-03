import type { Files } from './PlaygroundContext'
import main from './template/main.tsx?raw' // ?raw 表示直接引入文件内容，不进行解析  === fs.readFileSync
import AppCss from './template/App.css?raw'
import App from './template/App.tsx?raw'
import importMap from './template/import-map.json?raw'
import { getFileNameLanguage } from './utils'

// app 文件名
export const APP_COMPONENT_FILE_NAME = 'App.tsx';
// 项目入口文件名
export const ENTRY_FILE_NAME = 'main.tsx';
// es module 导入映射文件
export const IMPORT_MAP_FILE_NAME = 'import-map.json';

export const initFiles: Files = {
    [ENTRY_FILE_NAME]: {
        name: ENTRY_FILE_NAME,
        value: main,
        language: getFileNameLanguage(ENTRY_FILE_NAME),
    },
    [APP_COMPONENT_FILE_NAME]: {
        name: APP_COMPONENT_FILE_NAME,
        value: App,
        language: getFileNameLanguage(APP_COMPONENT_FILE_NAME),
    },
    [IMPORT_MAP_FILE_NAME]: {
        name: IMPORT_MAP_FILE_NAME,
        value: importMap,
        language: getFileNameLanguage(IMPORT_MAP_FILE_NAME),
    },
    ['App.css']: {
        name: 'App.css',
        value: AppCss,
        language: getFileNameLanguage('App.css'),
    },
}