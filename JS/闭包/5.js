var arr = [];
for (var i = 1; i <= 5; i++) {
    function foo(j) {
        arr.push(function(){
            console.log(j);
        })
    }
    foo(i);
}

for (let n = 0; n < arr.length; n++) {
    arr[n]();
}