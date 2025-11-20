function Car(){ 
    // const obj = {};  // 步骤1：创建空对象
    this.name = 'su7';  // 步骤2，3
    // obj.__proto__ = Car.prototype; // 步骤4：连接原型
    // return obj; // 步骤5：返回对象
}
const car = new Car();
console.log(car.constructor); // 能找到构造函数Car，因为原型链连起来了