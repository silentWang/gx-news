export default class Utils {
    constructor(){}

    static PositionType = {
        POSITION_MAIN:"main",
        POSITION_SIDE:"side",
        POSITION_HEADER:"header",
        POSITION_FOOTER:"footer",
    }

    static escapeHtml(str){
        let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        str = str.replace(/gif@/g,'gif?@');
        str = str.replace(/padding-bottom:( ?)[0-9]+(.?)\d+%/g,"");
        str = str.replace(/max-width:(\s+)(\d+)px/g,"");
        return str
    }

    static addAdverToPage(parent,adverId){
        let code = "";
        adverId = "u6531718";
        (window.slotbydup = window.slotbydup || []).push({
            id: "u6531718",
            container: parent,
            async: true
        });
    }

    static changeAndExecuteJS(element){
        let sScript = element.getElementsByTagName("script")[0];
        if(!sScript) return;
        element.removeChild(sScript);
        let nScript = document.createElement("script");
        nScript.type = "text/javascript";
        nScript.innerHTML = sScript.innerHTML;
        element.appendChild(nScript);
    }

}