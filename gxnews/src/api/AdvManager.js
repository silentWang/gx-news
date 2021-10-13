import AdvService from './AdvService'
import Utils from "@/js/Utils"
class AdvManager {
    static Instance(){
        if(!AdvManager._instance){
            AdvManager._instance = new AdvManager();
        }
        return AdvManager._instance;
    }

    constructor(){
        this.dfQueues = [];
        this.isRequest = false;
        this.uniqueId = 0;
    }

    getUniqueID(){
        this.uniqueId++;
        return this.uniqueId;
    }

    /**********************************df优先 360打底式请求队列 start *****************************************/
    pushMergeRequest(params){
        this.dfQueues.push(params);
        if(this.isRequest) return;
        this.sendMergeMsg();
    }
    async sendMergeMsg(){
        if(!this.dfQueues || this.dfQueues.length == 0){
            this.isRequest = false;
            return;
        }
        this.isRequest = true;
        let queueData = this.dfQueues.shift();
        let res = null;
        let array = queueData.array;
        let advs = queueData.advs;
        let adtype1 = advs[0].ad_type;
        let adtype2 = advs[1] ? advs[1].ad_type : "";
        let adtype3 = advs[2] ? advs[2].ad_type : "";
        let advType = adtype1;
        if(adtype1 == Utils.ADV_TYPE.BAIDU){
            this.loadBaiduAD(array,advs);
        }
        else if(adtype1 == Utils.ADV_TYPE.DFTT){
            res = await AdvService.requestDFTT(queueData);
            if(!res || Utils.getObjectLength(res) == 0){
                advType = adtype2;
                if(adtype2 == Utils.ADV_TYPE.BAIDU){
                    this.loadBaiduAD(array,advs);
                }
                else if(adtype2 == Utils.ADV_TYPE.TSZ){
                    res = await this.load360AD(queueData);
                    if(!res || Utils.getObjectLength(res) == 0){
                        if(adtype3 == Utils.ADV_TYPE.BAIDU){
                            advType = adtype3;
                            this.loadBaiduAD(array,advs);
                        }
                    }
                }
            }
        }
        else if(adtype1 == Utils.ADV_TYPE.TSZ){
            res = await this.load360AD(queueData);
            if(!res || Utils.getObjectLength(res) == 0){
                advType = adtype2;
                if(adtype2 == Utils.ADV_TYPE.DFTT){
                    res = await AdvService.requestDFTT(queueData);
                    if(!res || Utils.getObjectLength(res) == 0){
                        if(adtype3 == Utils.ADV_TYPE.BAIDU){
                            advType = adtype3;
                            this.loadBaiduAD(array,advs);
                        }
                    }
                }
                else if(adtype2 == Utils.ADV_TYPE.BAIDU){
                    this.loadBaiduAD(array,advs);
                }
            }
        }
        if(advType == Utils.ADV_TYPE.BAIDU){
            this.isRequest = false;
            this.sendMergeMsg();
            return;
        }
        if(process.env.NODE_ENV != "production"){
            console.log(`--------${advType}---------`,res);
        }
        if(res && Utils.getObjectLength(res) > 0){
            let confs = queueData.array;
            for(let i = 0;i < confs.length;i++){
                let conf = confs[i];
                let data = res[conf.advID];
                if(data && data.data){
                    conf.data = data.data;
                    conf.data.advType = advType;
                    conf.callback.call(conf.context);
                }
            }
            for(let i = 0;i < confs.length;i++){
                let conf = confs[i];
                if(conf.data){
                    conf.callback.call(conf.context);
                }
            }
        }
        this.isRequest = false;
        this.sendMergeMsg();
    }

    loadBaiduAD(array,advs){
        for(let i = 0;i < array.length;i++){
            let conf = array[i];
            let ele = document.getElementById(conf.elementID);
            if(!ele) continue;
            ele.innerHTML = advs[0].ad_script;
            Utils.changeAndExecuteJS(ele);
        }
    }

    async load360AD(queueData){
        let res = {};
        let length = queueData.showarray.length;
        for(let i = 0;i < length;i++){
            let tdata = await AdvService.request360(queueData.showarray[i]);
            if(tdata){
                res[queueData.imparray[i]] = {data:tdata};
            }
        }
        return res;
    }
    
    /**********************************df优先 360打底式请求队列 end *****************************************/
    
}

export default AdvManager.Instance();

