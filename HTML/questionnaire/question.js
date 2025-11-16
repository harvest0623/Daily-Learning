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
    
    // 确保只显示5道题
    if (questionList.length > 5) {
        questionList = questionList.slice(0, 5);
    }
    
    // 设置头部，但初始进度条为0%
    setHead(questionList, current);
    
    // 确保初始进度条为0%
    const barProgress = document.querySelector('.bar-process');
    barProgress.style.width = '0%';
    // 展示题目
    showQuestion(questionList, current);
})

// 为提交按钮添加href属性，确保即使JavaScript被禁用也能跳转到结果页面
document.addEventListener('DOMContentLoaded', function() {
    const goResultButton = document.querySelector('.goResult');
    if (goResultButton) {
        goResultButton.href = 'result.html';
    }
});

// 当用户点击某一个答案选项时
function selectItem(id) {
    selectId = id;
    // 获取当前题目的索引
    const currentIndex = current - 1;
    
    // 如果是修改之前的答案，则替换，否则添加新答案
    if (answerList.length > currentIndex) {
        answerList[currentIndex] = id;
    } else {
        answerList.push(id);
    }
    // 注意：现在不在这里更新进度条，只在点击下一题或提交时更新
}

// 点下一题
const next = document.querySelector('.next')
next.addEventListener('click', () => {
    if (selectId == null) {
        alert('答案不能为空');
        return;
    }
    // 确保答案正确保存在对应的位置
    const currentIndex = current - 1;
    if (answerList.length > currentIndex) {
        answerList[currentIndex] = selectId;
    } else {
        answerList.push(selectId);
    }

    // 要展示下一题的数据
    current++;

    // 关键：在这里更新进度条，确保每次点击下一题后进度条正好增加20%
    setHead(questionList, current);

    if (current == questionList.length) {
        goResult.classList.remove('hide');
        next.classList.add('hide');
    }
    showQuestion(questionList, current);
    // 如果有之前回答过的答案，自动选中
    if (answerList.length >= current) {
        selectId = answerList[current - 1];
        // 找到对应的radio并选中
        setTimeout(() => {
            const radio = document.getElementById(`item${selectId}`);
            if (radio) {
                radio.checked = true;
            }
        }, 0);
    } else {
        selectId = null;  // 每次点完下一题重置，为了下一次点击判断
    }
})
// 点提交
goResult.addEventListener('click', () => {
    if (selectId == null) { // 最后一题没选答案
        alert('答案不能为空');
        return;
    }
    // 确保最后一题答案正确保存在对应的位置
    const currentIndex = current - 1;
    if (answerList.length > currentIndex) {
        answerList[currentIndex] = selectId;
    } else {
        answerList.push(selectId);
    }
    
    // 提交时更新进度条到100%
    const barProgress = document.querySelector('.bar-process');
    barProgress.style.width = '100%';
    
    // 计算得分
    let correctCount = 0;
    
    // 遍历所有题目，对比用户答案和正确答案
    questionList.forEach((question, index) => {
        // 找到用户提交的该题答案
        const userAnswer = answerList[index];

        // 找到正确答案（假设正确答案在topic_answer中标记为is_correct: true）
        const correctAnswer = question.topic_answer.find(answer => answer.is_correct === true);
        
        // 如果找到正确答案且用户选择了正确答案
        if (correctAnswer && userAnswer === correctAnswer.topic_answer_id) {
            correctCount++;
        }
    });
    
    // 计算得分百分比
    const score = Math.round((correctCount / questionList.length) * 100);
    // alert(`您的得分是：${score}分，答对了${correctCount}题，共${questionList.length}题`);
    
    // 保存答案到本地存储
    localStorage.setItem('answerList', JSON.stringify(answerList));
    localStorage.setItem('correctCount', correctCount);
    localStorage.setItem('totalQuestions', questionList.length);
    localStorage.setItem('score', score);
    
    // 跳转到结果页面
    window.location.href = 'result.html';
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

    const barProgress = document.querySelector('.bar-progess') || document.querySelector('.bar-process');

    // 确保进度条有平滑过渡动画
    if (!barProgress.style.transition) {
        barProgress.style.transition = 'width 0.5s ease-in-out';
    }

    // 只根据已完成的题目数量来计算进度
    // 例如：5题中完成1题，进度就是20%
    const answeredCount = answerList.length;

    
    // 计算进度百分比
   const progressPercentage = (answeredCount / arr.length) * 100;
    
    // 更新进度条宽度，实现绿色滚动效果
    barProgress.style.width = progressPercentage + '%';
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
        `;
        lis = lis + li;
    }
    list.innerHTML = lis;
}