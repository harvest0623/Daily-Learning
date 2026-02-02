# 将 tsx 编译为 js
- @babel/standalone (babel的浏览器版本)
- @types/babel__standalone (babel的浏览器版本的类型定义)

# 资源处理
- import { useState } from 'react';
- import Aaa from './Aaa.tsx';

需要用到：babel (parse、transform、generate)   AST -- 抽象语法树

const url = URL.createObjectURL(new Blob([code1], { type: 'application/javascript' }));   将某份资源处理成一个 blob 地址，并在 babel 编译的过程中将 from "xxx" 修改成 from "blob:http://xxxxxx"

# babel
- @babel/core (babel的核心版本)
- @types/babel__core (babel的核心版本的类型定义)

# 引入 React
<script type="importmap">
    {
        "imports": {
            "react": "https://esm.sh/react@18.2.0"
        }
    }
</script>

# 代码提示器
npm i @monaco-editor/react

# 预览
iframe 标签

左侧的 tsx 代码被编译，编译完后引入带一个 html文件中，并将这个 html 文件展示在iframe中