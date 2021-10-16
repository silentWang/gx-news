import Utils from "@/js/Utils"
import AdvManager from "./AdvManager";
export default class AdvDFTT {
    constructor(container = ""){
        this.dfttIDS = [];
        this.showIDS = [];
        this.advConfigList = [];
        this.stepIndex = 0;
        this.showIndex = 0;
        this.advData = [];
        let element = document.getElementsByClassName(container);
        this.container = element && element[0] ? element[0] : "";
        this.isFirst = true;
    }
    
    setIDS(info,isNormal = true){
        if(!info) return
        let advs = isNormal ? info.ad_script :info.open_script;
        if(!advs || advs.length == 0) return
        advs.sort((a,b)=>{
            return b.ad_weight - a.ad_weight;
        });
        let arr1 = [];
        let arr2 = [];
        let r = Math.ceil(100*Math.random());
        for(let i = 0;i < advs.length;i++){
            if(r <= advs[i].ad_weight){
                arr1.push(advs[i]);
            }
            else{
                arr2.push(advs[i]);
            }
        }
        this.advData = arr1.concat(arr2);
        for(let adv of advs){
            if(adv.ad_type == "advdf"){
                let dfttIds = adv.ad_script.split(",")
                this.dfttIDS = dfttIds && dfttIds.length > 0 ? dfttIds : [];
            }
            else if(adv.ad_type == "adv360"){
                let showIds = adv.ad_script.split(",")
                this.showIDS = showIds && showIds.length > 0 ? showIds : [];
            }
            else if(adv.ad_type == "advbd"){}
        }
        this.maxOnePage = this.dfttIDS.length > 0 ? this.dfttIDS.length : 1;
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
    /**懒加载 进入可视范围才加载  
     * firstNum
     * flag*/
    checkLoad(firstNum = 1){
        let length = this.advConfigList.length;
        if(length == 0 || !this.advData || this.advData.length == 0) return;
        let array = [];
        if(this.isFirst){
            for(let i = 0;i < firstNum;i++){
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
        if(process.env.NODE_ENV != "production"){
            console.log(`--------${this.name} checkload num:${length}---------`,array);
            console.log(`advConfigList:`,this.advConfigList.length);
        }
        // let imparray = [];
        // let report = {};
        // let showarray = [];
        for(let i = 0;i < length;i++){
            let conf = array[i];
            if(conf.data) continue;
            let imparray = [conf.advID];
            let showarray = [conf.showId];
            let report = {};
            report[conf.advID] = {
                container: "#"+conf.elementID, // required | selector | 广告位选择器（通过此选择器只能获取到唯一 dom 的选择器），class / id / 属性选择器 / ...
                $scrollBox: this.container
            }
            AdvManager.pushMergeRequest({imparray,report,showarray,array:[array[i]],advs:this.advData});
        }
    }
    // getData(array){
    //     let length = array.length;
    //     let imparray = [];
    //     let report = {};
    //     let showarray = [];
    //     for(let i = 0;i < length;i++){
    //         let conf = array[i];
    //         if(conf.data) continue;
    //         imparray.push(conf.advID);
    //         showarray.push(conf.showId);
    //         report[conf.advID] = {
    //             container: "#"+conf.elementID, // required | selector | 广告位选择器（通过此选择器只能获取到唯一 dom 的选择器），class / id / 属性选择器 / ...
    //             $scrollBox: this.container
    //         }
    //     }
    //     AdvManager.pushMergeRequest({imparray,report,showarray,array,advs:this.advData});
    // }

    reset(){
        let length = this.advConfigList.length;
        if(length == 0) return;
        this.advConfigList = [];
        // for(let i = 0;i < length;i++){
        //     let config = this.advConfigList[i];
        //     config.data = null; 
        //     config.loaded = false;
        // }
        this.isFirst = true;
    }

}