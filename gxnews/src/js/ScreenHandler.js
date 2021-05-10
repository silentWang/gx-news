export default class ScreenHandler {
    
    constructor(timeout,backFunc){
        this.timeOut = timeout;
        this.backFunc = backFunc;
        this.addEvent();
        this.curTime = new Date().getTime();
        this.reWatch();
    }
    addEvent(){
        document.body.onmousemove = this.triggerEvent.bind(this);
        document.body.onmousedown = this.triggerEvent.bind(this);
        document.body.onkeydown = this.triggerEvent.bind(this);
        document.body.onkeypress = this.triggerEvent.bind(this);
    }
    triggerEvent(){
        this.curTime = new Date().getTime();
        this.reWatch();
    }
    reWatch(){
        clearTimeout(this.timeOutId);
        let _this = this;
        this.timeOutId = setTimeout(() => {
            if(_this.backFunc){
                _this.backFunc();
            }
        }, this.timeOut);
    }
}