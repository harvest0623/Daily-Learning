let str = 'hello world'
// console.log(str.length);
// console.log(str.charAt(1));

// console.log(str + ' hi ');

// let arr = str.split(' ')
// arr.splice(1,0,'hh')
// console.log(arr.join(' '));




// 方式1：+ 号拼接（最常用）
const str1 = '奶茶';
const str2 = '加珍珠';
const drink = str1 + str2 + '加椰果';
console.log(drink); // 输出 "奶茶加珍珠加椰果"🥤

// 方式2：concat() 方法（多字符串拼接）
const fullStr = str1.concat(str2, '加芋圆');
console.log(fullStr); // 输出 "奶茶加珍珠加芋圆"

// 方式3：插入指定位置（数组辅助）
const sentence = '我喜欢编程';
const arr = sentence.split(''); 
arr.splice(3, 0, 'JavaScript');
const newSentence = arr.join('');
console.log(newSentence); // 输出"我喜欢JavaScript编程"💻