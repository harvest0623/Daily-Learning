// 0.1 + 0.222

function add(x, y) {
    let xStr = x.toString().split('.')[1];  // '1'
    let yStr = y.toString().split('.')[1];  // '222'
    const maxLen = Math.max(xStr.length, yStr.length);
    // '1'
    xStr = xStr.padEnd(maxLen, '0');  // '900'
    yStr = yStr.padEnd(maxLen, '0');  // '222'
    for (let i = maxLen - 1; i >= 0; i--) {
        const x = xStr[i];
        const y = yStr[i];
        const sum = Number(x) + Number(y);
        console.log(sum);
    }
}
add(0.1, 0.222);