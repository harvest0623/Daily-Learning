# 一、说说你对 css 盒子模型的理解
1. **是什么：** 在浏览器渲染页面的时候，渲染引擎会根据 css 盒模型的标准来将每一个容器分成内容区域（content）、内边距区域（padding）、边框区域（border）、外边距区域（margin）
2. **特点：**
    - 标准盒模型：width = content
    - 怪异盒模型：width = content + padding + border
3. **应用场景：**
    - 标准盒模型：一般用于内容区域的宽度计算
    - 怪异盒模型：一般用于需要包含内边距和边框的情况

# 二、CSS 选择器有哪些？优先级是怎样的？
1. **是什么：** CSS 选择器是用来选择 HTML 元素的一种机制，通过选择器可以将 CSS 样式应用到对应的 HTML 元素上。
2. **分类：**
    - 基础选择器：类名选择器、标签选择器、类选择器、ID 选择器、后代选择器、通配符选择器
    - 组合选择器：后代选择器、子选择器、相邻兄弟选择器、群组选择器
    - 伪类选择器：:hover、:active、:focus、:first-child 等
    - 伪元素选择器：::before、::after、::first-letter、::first-line 等
3. **优先级：**
    - important > 内联样式 > ID 选择器 > 类选择器/属性选择器/伪类选择器 > 标签选择器/伪元素选择器
    - 当权选择器的优先级相同时，后出现的样式会覆盖先出现的样式

# 三、说说 em/px/rem/vw/vh 的区别
1. **分类：**
    - em：相对单位，相对于父元素的字体大小
    - px：绝对单位，像素
    - rem：相对单位，相对于根元素的字体大小
    - vw：相对单位，相对于视口宽度的百分比
    - vh：相对单位，相对于视口高度的百分比
2. **区别：**
    - em 是相对单位，根据父元素的字体大小来计算，而 px 是绝对单位，不依赖于其他元素
    - rem 是相对单位，根据根元素的字体大小来计算，而 vw/vh 是相对单位，根据视口的宽度/高度来计算

# 四、css中，有哪些方式可以隐藏元素，区别是什么？
1. **分类：**
    - display: none; 不占据文档流， 无法触发事件
    - visibility: hidden; 占据文档流， 无法触发事件
    - opacity: 0; 占据文档流， 可以触发事件
    - transform: scale(0); 占据文档流， 不可以触发事件
    - clip-path: polygon(0 0, 0 0, 0 0, 0 0); 占据文档流， 不可以触发事件
2. **区别：**
    - display: none; 隐藏元素，不占据文档流，无法触发事件
    - visibility: hidden; 隐藏元素，占据文档流，无法触发事件
    - opacity: 0; 隐藏元素，占据文档流，可以触发事件
    - transform: scale(0); 隐藏元素，占据文档流，不可以触发事件
    - clip-path: polygon(0 0, 0 0, 0 0, 0 0); 隐藏元素，占据文档流，不可以触发事件
    - position: absolute; 隐藏元素，不占据文档流，不可以触发事件

# 五、元素水平垂直居中的方式有哪些？
1. 定位 + margin: auto;
    - 子元素设置定位（position: absolute; 或 position: fixed;）
    - 子元素设置 margin: auto;
2. 定位 + margin负值 （子元素宽度和高度已知）
    - 子元素设置定位（position: absolute; 或 position: fixed;）
    - 子元素设置 margin-left: -50%; margin-top: -50%;
3. 定位 + transform: translate(-50%, -50%);
    - 子元素设置定位（position: absolute; 或 position: fixed;）
    - 子元素设置 transform: translate(-50%, -50%);
4. flex 布局
    - 父元素设置 display: flex;
    - 子元素设置 margin: auto;
5. grid 布局
    - 父元素设置 display: grid;
    - 子元素设置 place-items: center;
6. table-cell 布局
    - 父元素设置 display: table-cell;
    - 子元素设置 vertical-align: middle;
    - 子元素设置 text-align: center;