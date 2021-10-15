import CompatibleUtils from './CompatibleUtils'
export default class ScreenHandler {
    
    constructor(timeout,backFunc){
        this.timeOut = timeout;
        this.backFunc = backFunc;
        this.addEvent();
        this.curTime = new Date().getTime();
        this.reWatch();
    }
    addEvent(){
        CompatibleUtils.addEvent(document.body,"mousemove",this.triggerEvent,this);
        CompatibleUtils.addEvent(document.body,"mousedown",this.triggerEvent,this);
        CompatibleUtils.addEvent(document.body,"click",this.triggerEvent,this);
        CompatibleUtils.addEvent(document.body,"mouseup",this.triggerEvent,this);
        CompatibleUtils.addEvent(window,"mousewheel",this.triggerEvent,this);
        CompatibleUtils.addEvent(document.body,"keydown",this.triggerEvent,this);
        CompatibleUtils.addEvent(document.body,"keypress",this.triggerEvent,this);
        CompatibleUtils.addEvent(document.body,"keyup",this.triggerEvent,this);
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
    destroy(){
        clearTimeout(this.timeOutId);
        this.backFunc = null;
        CompatibleUtils.removeEvent(document.body,"mousemove",this.triggerEvent,this);
        CompatibleUtils.removeEvent(document.body,"mousedown",this.triggerEvent,this);
        CompatibleUtils.removeEvent(document.body,"click",this.triggerEvent,this);
        CompatibleUtils.removeEvent(document.body,"mouseup",this.triggerEvent,this);
        CompatibleUtils.removeEvent(window,"mousewheel",this.triggerEvent,this);
        CompatibleUtils.removeEvent(document.body,"keydown",this.triggerEvent,this);
        CompatibleUtils.removeEvent(document.body,"keypress",this.triggerEvent,this);
        CompatibleUtils.removeEvent(document.body,"keyup",this.triggerEvent,this);
    }
}