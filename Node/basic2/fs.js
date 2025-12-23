const fs = require('fs');

// fs.readFile('./text.txt', 'utf-8', (err, data) => {
//     if (!err) {
//         console.log(data);
//     }
// })

// const data = fs.readFileSync('./text.txt', 'utf-8');
// console.log(data);

fs.writeFile('./readme.md', '你好', (err) => {
    if (!err) {
        console.log('写入成功');
    }
})