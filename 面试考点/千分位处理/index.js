const num = 35168461321.542345;
// 结果为：35,168,461,321.54
function toThousand(num) {
    num = num.toFixed(2);
    let str = num.toString();
    let [int, decimal] = str.split('.');
    let result = '';
    for(let i = int.length - 1, count = 1; i >= 0; i--, count++) {
        result = int[i] + result;
        if(count % 3 === 0 && i !== 0) {
            result = ',' + result;
        }
    }
    return result + '.' + decimal;

}
console.log(toThousand(num));