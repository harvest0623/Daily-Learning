const num = 35168461321.542345;
function toThousand(num) {
    const fixedNum = num.toFixed(2);
    const [int, decimal] = fixedNum.split('.');
    // 整数部分转数组并反转，方便从左往右数3位
    const reverseInt = int.split('').reverse();
    const result = [];
    reverseInt.forEach((char, index) => {
        result.push(char);
        // 每3位加逗号，且不是最后一位
        if ((index + 1) % 3 === 0 && index !== reverseInt.length - 1) {
            result.push(',');
        }
    });
    // 反转回来并拼接
    const finalInt = result.reverse().join('');
    return `${finalInt}.${decimal}`;
}
console.log(toThousand(num)); // 输出 35,168,461,321.54