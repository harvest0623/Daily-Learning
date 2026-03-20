const num = 35168461321.542345;
function toThousand(num) {
    // 配置：中文环境、保留2位小数、只显示数字
    return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}
console.log(toThousand(num)); // 输出 35,168,461,321.54