import React, { Component } from 'react'

export default class App extends Component {
    constructor() {
        console.log('constructor');
        super();
        this.state = {
            count: 0
        }
    }
    componentDidMount() {
        console.log('组件加载完毕');
    }

    componentDidUpdate() {
        console.log('组件更新完毕');
    }

    componentWillUnmount() {
        
    }
    add() {
        // this.state.count++
        // console.log(this.state.count);
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        console.log('render');
        return (
            <div>
                <h2>{this.state.count}</h2>
                <button onClick={this.add.bind(this)}>add</button>
            </div>
        )
    }
}

