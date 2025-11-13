// '上海自来水来自海上' //回文

let str = 'yessey'

// function isPalindrome(s){
//     let arr = str.split('').reverse().join('')
//     return arr == str
// }

function isPalindrome(s){
    let left = 0;
    let right = str.length - 1;
    while(left < right){
        if(str[left] !=  str[right]){
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(str);