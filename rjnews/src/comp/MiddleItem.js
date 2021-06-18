import React from "react";

export default class MiddleItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item:""
        }
    }

    render(){
        return (
            <div className="MiddleItem">
                <a className="MiddleItemA">
                    <img src="https://lupic.cdn.bcebos.com/20191203/3016335818_23.jpg" alt=""/>
                </a>
                <div className="MiddleItemInfo">
                    <h3>
                        <a>你好啊，大家都好！你好啊，大家都好！</a>
                    </h3>
                    <div>
                        <a>2012/05/26</a>
                    </div>
                </div>
            </div>
        )
    }
}