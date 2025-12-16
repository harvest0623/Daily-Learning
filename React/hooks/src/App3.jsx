import React, { Component } from 'react';

export default class App3 extends Component {
    constructor(props) {
        super(props);
        // 初始化状态：模拟“入职时的工作清单”和“待办数量”
        this.state = {
            workList: [], // 工作清单
            todoCount: 0  // 待办数量
        };
        // 模拟一个“上班期间的定时提醒”
        this.timer = null;
    }

    // 1. componentDidMount：组件“入职第一天”
    // 刚渲染完成（办完入职手续）就触发，只执行一次！
    // 适合做“入职首件事”：比如对接接口拿数据、初始化定时器、绑定事件
    componentDidMount() {
        console.log('✨ 组件入职报到！');
        // 模拟“入职先拉取工作清单”（发请求）
        fetch('https://mock-api.com/work/list')
        .then(res => res.json())
        .then(data => {
                this.setState({
                workList: data.list,
                todoCount: data.list.length
            });
        });
        // 模拟“入职后设置定时提醒”（比如每小时检查待办）
        this.timer = setInterval(() => {
            console.log('⏰ 定时检查：当前待办数 →', this.state.todoCount);
        }, 3600000);
    }

    // 2. componentDidUpdate：组件“每次改需求”
    // 状态/属性变化后（改了工作方案）触发，每次更新都会执行！
    // 适合做“需求变更后的同步操作”：比如待办数变了，同步更新统计
    componentDidUpdate(prevProps, prevState) {
        // 注意！一定要加判断，否则会无限循环（改状态→触发更新→又改状态→再更新）
        if (prevState.todoCount !== this.state.todoCount) {
            console.log('📝 需求变更！待办数从', prevState.todoCount, '变成', this.state.todoCount);
            // 模拟“待办数变了，同步到公司看板”
            console.log('🔄 已同步待办数到公司看板～');
        }
    }

    // 3. componentWillUnmount：组件“离职前”
    // 组件销毁（离职）前触发，只执行一次！
    // 适合做“离职收尾工作”：清定时器、解绑事件、取消请求，避免内存泄漏
    componentWillUnmount() {
        console.log('👋 组件准备离职！');
        // 清除定时提醒（带走自己的东西，不占公司资源）
        clearInterval(this.timer);
        // 模拟“取消未完成的请求”（避免离职后还发请求打扰公司）
        this.cancelRequest && this.cancelRequest();
        console.log('✅ 收尾工作完成，可安心离职～');
    }

    // 模拟“新增待办”（触发状态更新，进而触发componentDidUpdate）
    addTodo = () => {
        this.setState(prevState => ({
            todoCount: prevState.todoCount + 1
        }));
    };

    render() {
        const { workList, todoCount } = this.state;
        return (
            <div className="work-container">
                <h3>打工人的工作面板</h3>
                <p>当前待办数：{todoCount}</p>
                <button onClick={this.addTodo}>新增待办（改需求）</button>
                <ul>
                    {workList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
}