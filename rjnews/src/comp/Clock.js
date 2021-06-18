import React from 'react';
export default class Clock extends React.Component{
    constructor(props){
        super(props)
        this.state = {date:new Date()}
    }

    componentDidMount(){
        this.timerId = setInterval(() => {
            this.setState({
                date:new Date()
            });
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    render(){
        return (
            <div>
                <h1>时钟</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}