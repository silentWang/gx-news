import React from "react";

export default class MenuItem extends React.Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            selected:props.selected
        }
    }

    gotoCatery(idx){
        this.props.onSelect(idx)
    }
    
    render(){
        let selected = this.props.selected;
        return (
            <div className="MenuItem" onClick={()=>{this.gotoCatery(this.props.id)}}>
                <a href={'#'} className={selected ? "MenuItem_A_Selected" : "MenuItem_A_Normal"}>{this.props.title}</a>
                <img src={selected ? "./assets/refresh.png" : ""} alt=""/>
            </div>
        )
    }
}