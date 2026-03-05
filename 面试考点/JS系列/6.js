// function A() {
//     let num = 100;
//     function B() {
//         console.log(num);
//     }
//     return B;
// }

// let b = A();
// b();

function add() {
    let num = 0;
    return () => {
        num++;
        return num; 
    }
}

const res = add();
res();  // 1
res();  // 2
res();  // 3