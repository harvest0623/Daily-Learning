# 类型
1. 原始类型 
number, string, boolean, undefined, null, Symbol, Bigint
2. 引用类型

# typeof
1. 可以准确的判断除了 null 以外的所有原始类型
2. 用 typeof 判断引用类型， 只有 function 能判断成功
- typeof 会通过将值转换为二进制来判断类型，对于二进制数据前三位是 0 的统一识别为对象，所有引用类型转为二进制前三位都是 0，而 null 转为二进制全是 0

# instanceof
1. x instanceof x 能判断引用类型，无法判断原始类型
- instanceof 通过隐式原型链的查找来判断 x 是否隶属于 X 这个类型