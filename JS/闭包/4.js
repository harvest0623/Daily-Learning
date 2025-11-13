function foo() {
    var myname = 'Henry';
    var age = 18;
    function bar() {
        console.log(myname);
    }
    return bar;
}
var baz = foo();
baz();