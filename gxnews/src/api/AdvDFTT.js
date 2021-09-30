import Utils from "@/js/Utils"
import AdvManager from "./AdvManager";
export default class AdvDFTT {
    constructor(container = "",dfttIds = [],showIds = []){
        let sids = [101237,101238,101239,101240,101241];
        this.dfttIDS = dfttIds && dfttIds.length > 0 ? dfttIds : sids;
        let tids = ["k9ohe1","u7zGw0","YOOvNu","XpSS6i","z8dR81","jzKRfS","s5RjZC","uEwdQM","xuUEzU","th3oer"];
        this.showIDS = showIds && showIds.length > 0 ? showIds : tids;
        this.advConfigList = [];
        this.stepIndex = 0;
        this.showIndex = 0;
        this.maxOnePage = this.dfttIDS.length;
        let element = document.getElementsByClassName(container);
        this.container = element && element[0] ? element[0] : "";
        this.isFirst = true;
    }

    getNextAd(callback,context){
        let index1 = this.stepIndex >= this.dfttIDS.length ? 0 : this.stepIndex;
        let index2 = this.showIndex >= this.showIDS.length ? 0 : this.showIndex;
        let advID = this.dfttIDS[index1];
        let showId = this.showIDS[index2];
        let elementID = "dfttadv_1000" + AdvManager.getUniqueID();
        let config = {advID,elementID,showId,callback,context,data:null,loaded:false};
        this.stepIndex = index1 + 1;
        this.showIndex = index2 + 1;
        this.advConfigList.push(config);
        return config;
    }
    /**懒加载 进入可视范围才加载  flag*/
    checkLoad(){
        let length = this.advConfigList.length;
        if(length == 0) return;
        let array = [];
        if(this.isFirst){
            for(let i = 0;i < 2;i++){
                let config = this.advConfigList[i];
                if(i < this.maxOnePage){
                    array.push(config);
                }
                else{
                    break;
                }
            }
            this.isFirst = false;
        }
        else{
            for(let i = 0;i < length;i++){
                let config = this.advConfigList[i];
                if(config.data || config.loaded) continue;
                let ele = document.getElementById(config.elementID);
                if(!ele) continue;
                if(Utils.checkIsInViewport(ele)){
                    config.loaded = true;
                    array.push(config);
                    if(array.length >= this.maxOnePage){
                        this.getData(array);
                        array = [];
                    }
                }
            }
        }
        if(array.length > 0){
            this.getData(array);
        }
    }

    getData(array){
        let length = array.length;
        let imparray = [];
        let report = {};
        let showarray = [];
        for(let i = 0;i < length;i++){
            let conf = array[i];
            if(conf.data) continue;
            imparray.push(conf.advID);
            showarray.push(conf.showId);
            report[conf.advID] = {
                container: "#"+conf.elementID, // required | selector | 广告位选择器（通过此选择器只能获取到唯一 dom 的选择器），class / id / 属性选择器 / ...
                $scrollBox: this.container
            }
        }
        AdvManager.pushMergeRequest({imparray,report,showarray,array});
    }

    reset(){
        let length = this.advConfigList.length;
        if(length == 0) return;
        for(let i = 0;i < length;i++){
            let config = this.advConfigList[i];
            config.data = null; 
            config.loaded = false;
        }
        this.isFirst = true;
    }

}