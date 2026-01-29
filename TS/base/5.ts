// let num = 123;
// num = '123';  // 报错

let someValue: any = 123;

// let strLength = someValue.length;
let strLength = (someValue as string).length;  // 写法一
// let strLength = (<string>someValue).length;  // 写法二

// 类型守卫
// interface Person {
//     name: string,
//     age: number,
//     sex?: unknown
// }
// const person: Person = {
//     name: 'henry',
//     age: 18,
//     sex: '男'
// }

type Person = string | number | boolean;
const a: Person = 'hello';
const b: Person = 123;
const c: Person = true;

type PartialX = {x: number}
type Point = PartialX & {y: number}
const p: Point = {
    x: 10,
    y: 20
}