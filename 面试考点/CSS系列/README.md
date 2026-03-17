## 一、说说你对 css 盒子模型的理解
### 1. **是什么：** 在浏览器渲染页面的时候，渲染引擎会根据 css 盒模型的标准来将每一个容器分成内容区域（content）、内边距区域（padding）、边框区域（border）、外边距区域（margin）
### 2. **特点：**
- 标准盒模型：width = content
- 怪异盒模型：width = content + padding + border
### 3. **应用场景：**
- 标准盒模型：一般用于内容区域的宽度计算
- 怪异盒模型：一般用于需要包含内边距和边框的情况

## 二、CSS 选择器有哪些？优先级是怎样的？
### 1. **是什么：** CSS 选择器是用来选择 HTML 元素的一种机制，通过选择器可以将 CSS 样式应用到对应的 HTML 元素上
### 2. **分类：**
- 基础选择器：类名选择器、标签选择器、类选择器、ID 选择器、后代选择器、通配符选择器
- 组合选择器：后代选择器、子选择器、相邻兄弟选择器、群组选择器
- 伪类选择器：:hover、:active、:focus、:first-child 等
- 伪元素选择器：::before、::after、::first-letter、::first-line 等
### 3. **优先级：**
- important > 内联样式 > ID 选择器 > 类选择器/属性选择器/伪类选择器 > 标签选择器/伪元素选择器
- 当权选择器的优先级相同时，后出现的样式会覆盖先出现的样式

## 三、说说 em/px/rem/vw/vh 的区别
### 1. **分类：**
- em：相对单位，相对于父元素的字体大小
- px：绝对单位，像素
- rem：相对单位，相对于根元素的字体大小
- vw：相对单位，相对于视口宽度的百分比
- vh：相对单位，相对于视口高度的百分比
### 2. **区别：**
- em 是相对单位，根据父元素的字体大小来计算，而 px 是绝对单位，不依赖于其他元素
- rem 是相对单位，根据根元素的字体大小来计算，而 vw/vh 是相对单位，根据视口的宽度/高度来计算

## 四、css中，有哪些方式可以隐藏元素，区别是什么？
### 1. **分类：**
- display: none; 不占据文档流， 无法触发事件
- visibility: hidden; 占据文档流， 无法触发事件
- opacity: 0; 占据文档流， 可以触发事件
- transform: scale(0); 占据文档流， 不可以触发事件
- clip-path: polygon(0 0, 0 0, 0 0, 0 0); 占据文档流， 不可以触发事件
### 2. **区别：**
- display: none; 隐藏元素，不占据文档流，无法触发事件
- visibility: hidden; 隐藏元素，占据文档流，无法触发事件
- opacity: 0; 隐藏元素，占据文档流，可以触发事件
- transform: scale(0); 隐藏元素，占据文档流，不可以触发事件
- clip-path: polygon(0 0, 0 0, 0 0, 0 0); 隐藏元素，占据文档流，不可以触发事件
- position: absolute; 隐藏元素，不占据文档流，不可以触发事件

## 五、元素水平垂直居中的方式有哪些？
### 1. **定位 + margin: auto;**
- 子元素设置定位（position: absolute; 或 position: fixed;）
- 子元素设置 margin: auto;
### 2. **定位 + margin负值 （子元素宽度和高度已知）**
- 子元素设置定位（position: absolute; 或 position: fixed;）
- 子元素设置 margin-left: -50%; margin-top: -50%;
### 3. **定位 + transform: translate(-50%, -50%);**
- 子元素设置定位（position: absolute; 或 position: fixed;）
- 子元素设置 transform: translate(-50%, -50%);
### 4. **flex 布局**
- 父元素设置 display: flex;
- 子元素设置 margin: auto;
### 5. **grid 布局**
- 父元素设置 display: grid;
- 子元素设置 place-items: center;
### 6. **table-cell 布局**
- 父元素设置 display: table-cell;
- 子元素设置 vertical-align: middle;
- 子元素设置 text-align: center;

## 六、谈谈你对 BFC 的理解
### 1. **是什么：** BFC（Block Formatting Context）是 CSS 中的一种布局机制，它会创建一个独立的渲染区域，内部的元素不会影响到外部的元素
### 2. **触发条件：**
- 根元素（html）
- 浮动元素（float 不为 none）
- 绝对定位元素（position 为 absolute 或 fixed）
- 行内块元素（display 为 inline-block）
- 表格单元格元素（display 为 table-cell）
- 表格标题元素（display 为 table-caption）
- 匿名表格单元格元素（display 为 table、inline-table、table-row、table-row-group、table-header-group、table-footer-group）
### 3. **特点：**
- BFC在计算高度时，会包含浮动子元素的高度
- BFC不会与浮动元素重叠
- 内部的元素不会影响到外部的元素
### 4. **应用场景：**
- 防止 margin 折叠
- 包含浮动元素
- 阻止元素被浮动元素覆盖
- 清除浮动

## 七、怎么理解回流重绘？(从输入url到页面渲染的过程)
### 1. **输入url 后发生了什么？**
- 浏览器会根据 url 解析出域名和路径
- 浏览器会根据域名查询 DNS 服务器，获取到 ip 地址
- 浏览器会根据 ip 地址和端口号，建立 tcp 连接
- 浏览器会根据路径，向服务器发送 http 请求
- 服务器会根据请求，返回 html 文件
- 浏览器会根据 html 文件，解析出 dom 树
- 浏览器会根据 html 文件，解析出 css 文件
- 浏览器会根据 css 文件，解析出 css 规则
- 浏览器会根据 dom 树和 css 规则，渲染出页面
### 2. **浏览器获取到服务端的资源后，要干什么？**
- 解析 HTML 资源，生成 DOM 树
- 解析 CSS 资源，生成 CSSOM 树
- 将 DOM 树和 CSSOM 树合并成渲染树
- 根据渲染树，计算元素的位置和大小（回流）
- 根据渲染树，绘制元素到屏幕上（重绘）
### 3. **分类：**
- DOM树： 
``` 
{
    tag: 'div',
    children: [ {
        tag: 'p',
        children: [ {
            tag: 'span',
            children: [ {
                tag: 'text', text: 'hello world'
            }
            ]
        }
        ]
    }
    ]
}
```
- CSSOM树： 
```
{ 
    .box: { 
        tag: 'div', 
        style: { 
            width: '100px', height: '100px', color: 'red' 
        } 
    } 
}
```
- render树：
```
{
    tag: 'div',
    style: { width: '100px', height: '100px', color: 'red' },
    children: [ {
        tag: 'p',
        style: { width: '100px', height: '100px', color: 'red' },
        children: [ {
            tag: 'span',
            style: { width: '100px', height: '100px', color: 'red' },
            children: [ {
                tag: 'text', text: 'hello world'
            }
            ]
        }
        ]
    }
    ]
}
```
### 4. **回流和重绘的区别？**
- 回流是指元素的位置或大小发生了变化，需要重新计算布局
- 重绘是指元素的外观发生了变化，需要重新绘制
- **回流会触发重绘，但是重绘不一定会触发回流**
- 回流的成本要高于重绘
- 优化回流和重绘的方法：
    - 减少回流和重绘的次数
    - 批量操作 DOM 元素
    - 使用 transform 和 opacity 等属性，避免回流
### 5. **发生回流的场景：**
- **是什么：** 页面元素的几何属性发生变化时，浏览器会重新计算元素的位置和大小，这个过程称为回流
- **场景：**
    - 页面初始渲染
    - 元素的几何属性发生变化（如宽度、高度、margin、padding、border 等）
    - 元素的位置发生变化（如 top、bottom、left、right 等）
    - 元素的显示状态发生变化（如 display、visibility 等）
    - 元素的父元素或祖先元素的几何属性发生变化
    - 元素的字体大小发生变化
    - 元素的内容发生变化（如文本内容、图片等）
### 6. **发生重绘的场景：**
- **是什么：** 页面元素的外观发生变化时，浏览器会重新绘制元素，这个过程称为重绘
- **场景：**
    - 元素的颜色发生变化（如 color、background-color 等）
    - 元素的边框样式发生变化（如 border-style、border-width 等）
    - 元素的轮廓样式发生变化（如 outline-style、outline-width 等）
    - 元素的可见性发生变化（如 visibility 等）
    - 元素的伪类状态发生变化（如 :hover、:active 等）
- **浏览器的优化机制：** 由于每一次回流都会造成额外的计算消耗，所以浏览器会维护一个优化队列。将回流行为存放在队列中，直到一定时间后，或者达到阈值后，浏览器会一次性执行队列中的回流行为。
- **导致回流的特例：**
    - offsetWidth、offsetHeight、...
    - clientWidth、clientHeight、...
    - scrollWidth、scrollHeight、...
- **应用场景：** 将元素脱离文档流后再批量修改元素的几何属性，再将元素重新插入文档流中，这样可以减少回流的次数。

## 八、什么是响应式布局？你是怎么在项目中实现响应式布局的？
### 1. **是什么：** 指的是页面能够根据不同的设备屏幕尺寸，自动调整布局和样式，以提供更好的用户体验
### 2. **实现方式：**
- **媒体查询（Media Query）：** 利用 CSS 中的 @media 规则，根据不同的屏幕尺寸，定义不同的样式规则。
- **弹性布局（Flexible Layout）：** 利用 CSS 中的 flexbox 布局模型，将页面元素组织成弹性容器，根据屏幕尺寸，自动调整元素的位置和大小。
- **网格布局（Grid Layout）：** 利用 CSS 中的 grid 布局模型，将页面元素组织成网格容器，根据屏幕尺寸，自动调整元素的位置和大小。
- **rem 单位 + 媒体查询：** 利用 rem 单位，根据屏幕尺寸，动态调整元素的大小。同时，利用媒体查询，根据不同的屏幕尺寸，定义不同的 rem 单位值。
- **vw/vh 单位：** 利用 vw/vh 单位，根据屏幕尺寸，动态调整元素的大小。1vw 等于屏幕宽度的 1%，1vh 等于屏幕高度的 1%。
### 3. **应用场景：**
- 移动设备
- 平板电脑
- 桌面电脑

## 九、css中常见的实现动画的方式有哪些？
### 1. **过渡（Transition）：** 利用 CSS 中的 transition 属性，定义元素在状态变化时的过渡效果。
### 2. **动画（Animation）：** 利用 CSS 中的 @keyframes 规则，定义元素在动画过程中的状态变化。
### 3. **转变动画（Transform）：** 利用 CSS 中的 transform 属性，定义元素在动画过程中的位置、大小、旋转等变化。

## 十、如何用css画一个三角形？
### 1. 利用border属性
- 利用border属性，将元素的四个边框设置为不同的颜色，然后将元素的宽度和高度设置为0，就可以实现一个三角形。
- 代码如下：
```
.triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}
```
### 2. 利用clip-path属性
- 利用clip-path属性，将元素的形状裁剪为三角形。
- 代码如下：
```
.triangle {
    width: 100px;
    height: 100px;
    background-color: red;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
```