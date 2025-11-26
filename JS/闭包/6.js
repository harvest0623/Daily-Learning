// var good = "张三的快递"; // 放大街上（全局作用域）
// function getGood() {
//   console.log(good); // 谁都能拿，输出“张三的快递”
// }
// getGood();

// var wallet = "全局钱包(100块)"; 
// function myHome() {
//     var wallet = "卧室钱包(2000块)"; // 卧室里的钱包，只在卧室有效
//     console.log(wallet); // 用的是卧室里的，输出2000
// }
// myHome();
// console.log(wallet); // 只能拿到大街上的，输出100

// if (true) {
//   let money = 500; // 锁在衣柜格子（块级作用域）里
// }
// console.log(money); // 报错！外面打不开这格子

// function myHome() {
//   var TV = "客厅的大电视"; 
//   let sofa = "客厅沙发";
//   {
//     let sofa = "卧室小沙发"; 
//     var eat = "客厅零食"; // var没格子锁，掉客厅里了
//     let clothes = "卧室睡衣";
//     console.log(TV); // 卧室里找不到，喊房东（客厅）→ 找到电视，输出“大电视”
//     console.log(sofa); // 卧室里有小沙发，直接拿→ 输出“小沙发”
//   }
//   console.log(sofa); // 客厅里的大沙发→ 输出“客厅沙发”
//   console.log(eat); // 零食掉客厅了→ 输出“客厅零食”
//   console.log(clothes); // 睡衣锁在卧室格子里→ 报错！拿不到
// }
// myHome();

function leave() {
  var left = "租客的笔记本电脑"; // 卧室里的行李
  function cleaner() { // 保洁是卧室里的“内部员工”
    console.log(left); // 保洁能拿这行李
  }
  return cleaner; // 租客把保洁“带走了”
}
var cleaner1 = leave(); // 租客退租了，卧室该被清了
cleaner1(); // 但保洁居然拿出了“笔记本电脑”！