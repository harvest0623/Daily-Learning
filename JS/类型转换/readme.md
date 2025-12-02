# == vs ===
== 在判断值的过程中会发生隐式类型转换

# 类型转换
1. 显示类型转换
2. 隐式类型转换

# 原始值转原始值
1. 转数字 Number(x) ==> ToNumber(x);
2. 转字符串 String(x) ==> ToString(x);
3. 转布尔 boolean(x) ==> ToBoolean(x);

# 引用类型转原始值 (v8自发的执行)
- 通常发生在隐式转换过程中
- 显示转换存在 原始 -> 原始， 引用 -> 原始
- 隐式转换存在 原始 -> 原始， 引用 -> 原始

1. 转布尔 -- 所有的引用引用类型转 Boolean 都是 true
2. 转数字
    1. Number(x)
    2. ToNumber(ToPrimitive(x, Number))

    - ToPrimitive:
    1. 调用 valueOf 方法，如果得到原始值，则返回
    2. 否则，调用 toString 方法，如果得到原始值，则返回
    3. 否则，报错

3. 转字符串
    1. String(x)
    2. ToString((ToPrimitive(x, Number)))  

    - ToPrimitive:
    1. 调用 toString 方法，如果得到原始值，则返回
    2. 否则，调用 valueOf 方法，如果得到原始值，则返回
    3. 否则，报错

# toString()
1. {}.toString()  // '[object Object]'
2. [].toString()  // 返回由数组内部元素以逗号拼接的字符串
3. 其他.toString()  // 将值用引号引起来

# 什么情况下会发生隐式类型转换
1. 四则运算  + - * / %
2. 判断语句 if  while  ==  >=  <=  >  <  !=

# +
1. 作为一元运算符，会直接调用 ToNumber(x)
2. 作为二元运算符
    val1 + val2
    lprim = ToPrimitive(val1)   rprim = ToPrimitive(val2)
    lprim + rprim
    1. 如果 lprim 或者 rprim 有一个是字符串，另一个直接被
    2. 否则 全部 ToNumber