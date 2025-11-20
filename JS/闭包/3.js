function bar() {
    console.log(myName);
}
function foo() {
    var myName = 'henry';
    bar();
}
var myName = 'harvest';
foo();

function test() {
    console.log(1);
}