import React from "react";
import MiddleItem from "./MiddleItem";

export default class MiddleList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list:[1,2,3,4,5,6,7,8,9]
        }
    }

    render(){
        return (
            <div className='MiddleList'>
                {this.state.list.map((item,index)=>{
                    return (
                        <MiddleItem 
                            props={item}
                            key={index} />
                    )
                })}
            </div>
        )
    }
}