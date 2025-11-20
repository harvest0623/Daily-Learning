const fn = function(x, y, z) {
    return x + y;
}; // new Function()

// console.log(fn.name);
// console.log(fn.length);
// fn(1,2);

// console.log(fn.prototype);

// Car.prototype.name = 'su7-Ultra';
// Car.prototype.long = 4800;
// Car.prototype.height = 1400;
// Car.prototype.weight = 1.5;

// function Car(color){
//     // const this = {}  // 1.

//     // this.name = 'su7-Ultra';
//     // this.lang = 4800;
//     // this.height = 1400;
//     // this.weight = 1.5;
//     this.color = color; // 2.

//     // return this;  // 3.
// }
// // const car1 = new Car('pink');
// // console.log(car1.name);


Car.prototype.name = 'su7-Ultra';
function Car(color){
    this.color = color; 
}
const car1 = new Car('pink');
console.log(car1.name); 