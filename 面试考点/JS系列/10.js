// var a = 1;
// function foo() {
//     var a = 2;
//     function bar() {
//         console.log(this.a);
//     }
//     bar();
// }
// foo();


// function foo() {
//     console.log(this.a);
// }
// var obj = {
//     a: 1,
//     b: foo
// }
// var obj2 = {
//     a: 2,
//     c: obj.b()
// }
// obj2.c;

// var obj = {
//     a: 1
// }
// function foo(x, y) {
//     console.log(this.a, x + y);
// }
// // foo.call(obj, 1, 2);
// // foo.apply(obj, [1, 2]);
// const bar = foo.bind(obj, 2);
// bar(3);

// function Foo() {
//     let obj = {};
//     Foo.call(obj);
//     this.a = 1;
//     obj.__proto__ = Foo.prototype;
//     return obj;
// }
// var f = new Foo();
// console.log(f);

// var a = 100;
// function bar () {
//     const foo = () => {
//         console.log(this.a);
//     }
//     foo();
// }
// bar();


const Foo = () => {
    this.a = 1;
}

// const f = new Foo()
console.log(Foo instanceof Function);