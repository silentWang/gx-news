import '.././App.css'
import React from "react";
import MenuItem from "./MenuItem"

export default class MenuList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listItems:[],
            curSelectIndex:0
        }
        this.gotoCatogry = this.gotoCatogry.bind(this);
    }

    componentDidMount(){
        let arr = [];
        let names = ["推荐","社会","娱乐","国际","军事","财经","体育","养生","笑话","汽车"]
        for(let i = 0;i < names.length;i++){
            arr.push({id:i + 1,title:names[i]});
        }
        this.setState({
            listItems:arr,
            curSelectIndex:arr[0].id
        })
    }

    gotoCatogry(idx){
        this.setState({
            curSelectIndex:idx
        })
    }

    render(){
        return (
            <div className="MenuList">
                {this.state.listItems.map((item,index)=>{
                    return (
                        <MenuItem 
                            title={item.title}
                            id={item.id}
                            selected={this.state.curSelectIndex === item.id} 
                            key={index.toString()} 
                            onSelect={this.gotoCatogry} />
                    )
                })}
            </div>
        )
    }
}