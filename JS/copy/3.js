const obj = {
    name: 'henry',
    like: ['🏸']
}
const obj2 = {
    age: 18
}
obj.name = 'harvest';
obj.like[0] = '🎤'
const newObj = Object.assign({}, obj);
console.log(newObj);
// console.log(newObj == obj);