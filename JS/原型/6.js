// Array.prototype.abc = function() {};
// const arr = []; // new Array()
// const arr2 = [];

Grand.prototype.house = function(){
    console.log('四合院');
}
function Grand() {
    this.card = 10000;
}
Parent.prototype = new Grand(); // {card: 10000}.__proto__ = Grand.prototype.__proto__ = Object.prototype.__proto__ = null
function Parent() {
    this.lastName = 'harvest';
}
Child.prototype = new Parent(); // {lastName = 'harvest'}.__proto__ = arent.prototype
function Child() {
    this.age = 18;
}
const c = new Child(); // {age: 18}.__proto__ = Child.prototype
console.log(c.card);
c.house();
console.log(c.toString());