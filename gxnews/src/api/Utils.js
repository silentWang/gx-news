export default class Utils {
    constructor(){}

    static escapeHtml(str){
        let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        str = str.replace(/gif@/g,'gif?@');
        str = str.replace(/padding-bottom:( ?)[0-9]+(.?)\d+%/g,"");
        str = str.replace(/max-width:(\s+)(\d+)px/g,"");
        return str
    }
    

}