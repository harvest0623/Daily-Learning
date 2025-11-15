let current = 1;  // 第几题
let questionList = [];  // 存放整份题目数据
let answerList = [];  // 存放用户选中的答案
const list = document.querySelector('.list');  // ul
let selectId = null;  // 用户选中的答案 id
const goResult = document.querySelector('.goResult');

// 开始
getData().then((res) => {
    // console.log(res)
    questionList = res;  // 从后端请求到的数据先保存一份
    // 设置头部
    setHead(res, current);
    // 展示题目
    showQuestion(res, current);
})

// 当用户点击某一个答案选项时
function selectItem(id) {
    selectId = id;
    answerList.push(id);
}

// 点下一题
const next = document.querySelector('.next')
next.addEventListener('click', () => {
    if (selectId == null) {
        alert('答案不能为空');
        return;
    }
    // 真的要展示下一题的数据
    current++;
    if (current == questionList.length) {
        goResult.classList.remove('hide');
        next.classList.add('hide');
    }
    setHead(questionList, current);
    showQuestion(questionList, current);
    selectId = null;  // 每次点完下一题重置，为了下一次点击判断
})
// 点提交
goResult.addEventListener('click', () => {
    if (selectId == null) { // 最后一题没选答案
      alert('答案不能为空');
      return;
    }
    // 弹出得分
    // 1.遍历整个题目数据
    // 拿到每道题的答案选项，正确的选项已经在数据中标注好了
    // 对比用输入的答案answerList来评分
    // 浏览器本地保存答案
    // localStorage.setItem('answerList', JSON.stringify(answerList))
    // window.location.href = `http://127.0.0.1:5500/result.html`
})
function getData() {
    // js 中发送接口请求
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        // 准备请求参数
        xhr.open('GET', 'https://mock.mengxuegu.com/mock/6767738f98077b17fe6792e2/question-naire', true);
        // 发送请求
        xhr.send();
        // 监听请求的不同状态
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200){
                // console.log(xhr.responseText);
                const data = JSON.parse(xhr.responseText); // 将数据的格式处理成json 格式
                // console.log(data.questions);
                resolve(data.questions);
            }
        }
    })
}
function setHead(arr, curr) {
    // 修改head
    const currentNum = document.getElementById('currentNum');
    currentNum.innerText = curr;

    const totalNum = document.getElementById('totalNum');
    totalNum.innerText = arr.length;

    const barProgess = document.querySelector('.bar-progess');
    barProgess.style.width = (curr / arr.length) * 100 + '%';
}

function showQuestion(arr, current) {
    // 修改题号
    const num = document.getElementById('num');
    num.innerText = current;
    
    console.log(arr[0]);

    // 修改问题
    const questionTitle = document.querySelector('.question-title');
    questionTitle.innerText = arr[current - 1].topic_name;

    // 设置答案
    const topic_answer = arr[current - 1].topic_answer;

    let lis = '';
    for (let i = 0; i < topic_answer.length; i++) {
      const li = `
        <li onClick="selectItem(${topic_answer[i].topic_answer_id})">
          <input type="radio" name="item" id="item${topic_answer[i].topic_answer_id}">
          <label for="item${topic_answer[i].topic_answer_id}">${topic_answer[i].answer_name}</label>
        </li>
      `
      lis = lis + li;
    }
    list.innerHTML = lis;
}