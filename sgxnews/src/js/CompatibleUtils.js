/**
 * 适配相关
 */
export default class CompatibleUtils {
    constructor(){}

    /**get compatible attr */
    static getCompatibleValue(){
        let clientWidth,clientHeight,scrollWidth,scrollHeight,scrollLeft,scrollTop;
        if(document.compatMode == "BackCompat"){
            clientWidth = document.body.clientWidth;
            clientHeight = document.body.clientHeight;
            scrollWidth = document.body.scrollWidth;
            scrollHeight = document.body.scrollHeight;
            scrollLeft = document.body.scrollLeft;
            scrollTop = document.body.scrollTop;
        }
        else{
            clientWidth = document.documentElement.clientWidth;
            clientHeight = document.documentElement.clientHeight;
            scrollWidth = document.documentElement.scrollWidth;
            scrollHeight = document.documentElement.scrollHeight;
            scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        }
        let attrVaule = {clientWidth,clientHeight,scrollWidth,scrollHeight,scrollLeft,scrollTop};
        return attrVaule;
    }
    /**get clientHeight */
    static getViewPort(){
        let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        return {clientWidth,clientHeight};
    }
    /**添加事件 兼容*/
    static addEvent(target,eventType,listen,context){
        if(document.addEventListener){
            target.addEventListener(eventType,listen.bind(context));
        }
        else{
            target.attachEvent(eventType,listen.bind(context));
        }
    }
    /**移除事件 */
    static removeEvent(target,eventType,listen){
        if(document.removeEventListener){
            target.removeEventListener(eventType,listen);
        }
        else {
            target.detachEvent(eventType,listen);
        }
    }
}