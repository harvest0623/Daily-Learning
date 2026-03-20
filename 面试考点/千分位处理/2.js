const num = 35168461321.542345;
// 结果为：35,168,461,321.54
function toThousand(num) {
    num = num.toFixed(2);
    const [integer, decimal] = String.prototype.split.call(num, '.');
    const res = [];
    let len = 0;    

    for (let i = integer.length - 1; i >= 0; i--) {
        res.unshift(integer[i]);
        len++;
        if (len % 3 === 0 && i !== 0) {
            res.unshift(',');
        }
    }
    const str = res.join('') + '.' + decimal;
    return str;
}
console.log(toThousand(num));