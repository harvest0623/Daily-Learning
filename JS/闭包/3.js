function bar() {
    console.log(myName);
}
function foo() {
    var myName = '小君';
    bar();
}
var myName = '冯总';
foo();

function test() {
    console.log(1);
}