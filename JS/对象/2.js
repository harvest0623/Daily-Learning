function Insert(name, age, job) {
    const obj = {
        name: name,
        age: age,
        job: job
    }
    return obj;
}

Insert('henry',19,'coder');

function Car(color) {
    this.name = 'su7';
    this.height = '1400';
    this.long = '4800';
    this.weight = '1500';
    this.color = color;
}

const car1 = new Car('purple'); // 实例化一个对象
// const car2 = new Car('blue');
const car2 = new Car('purple');
console.log(car1);
console.log(car2);

console.log(car1 == car2)