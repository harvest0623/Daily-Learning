// 石头剪刀布
// 人类在终端输入 node 2.js rock  电脑自动出一个，并输出对战结果

const playerAction = process.argv[process.argv.length - 1];
// console.log(playerAction);
const arr = ['rock', 'scissor', 'paper'];
const index = Math.floor(Math.random() * 3);
const computerAction = arr[index];

// 比较
if (computerAction === playerAction) {
    console.log('平局');
} else if ((playerAction === 'rock' && computerAction === 'scissor') ||
    (playerAction === 'scissor' && computerAction === 'paper') ||
    (playerAction === 'paper' && computerAction === 'rock')) {
        console.log('你赢了');
} else {
    console.log('你输了');
}