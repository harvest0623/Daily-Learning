const num = 35168461321.542345;
function toThousand(num) {
    // 先保留两位小数，避免小数位数干扰
    const fixedNum = num.toFixed(2);
    
    // 正则核心：匹配整数部分从右往左每三位（非开头）
    return fixedNum.replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
console.log(toThousand(num)); // 输出 35,168,461,321.54