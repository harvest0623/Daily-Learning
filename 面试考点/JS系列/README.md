# 一、数组中常用的方法有哪些？
1. **增：** push、unshift、splice、concat、fill
2. **删：** pop、shift、splice、slice、filter
3. **改：** copyWithin
4. **查：** find、findIndex、indexOf、includes
5. **排序：** sort、reverse、toReverse
6. **转换：** toString、join、split
7. **遍历：** map、forEach、filter、reduce、some、every

# 二、字符串中常用的方法有哪些？
1. **增：** concat
2. **删：** slice
3. **改：** trim、trimRight、trimLeft、toLowerCase、toUpperCase、padStart、padEnd、repeat、replace、replaceAll
4. **查：** indexOf、includes、startsWith、endsWith、charAt
5. **转换：** split

# 三、谈谈 JS 中的类型转换机制？
- 是什么：
    - 显式类型转换：人为地将一个类型转换为另一个类型
    - 隐式类型转换：JS 引擎在执行运算或者判断语句等情况时，将两种不同类型的值转换为相同类型
- 特点：
    - 显式类型转换：使用 Number()、String()、Boolean() 等构造函数，或者调用对象的 toString()、valueOf() 方法
    - 隐式类型转换：四则运算符(+、-、*、/)，判断语句(if、while、for)，逻辑运算符(&&、||、!)，==、!=

# 四、== 和 === 有什么区别？
- ==：会进行类型转换，判断值是否相等
- ===：不会进行类型转换，判断值和类型是否都相等