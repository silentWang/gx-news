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
        let advType = "advDFTT";
        let res = await AdvService.requestDFTT(queueData);
        if(!res || Utils.getObjectLength(res) == 0){
            let length = queueData.showarray.length;
            res = {};
            for(let i = 0;i < length;i++){
                let tdata = await AdvService.request360(queueData.showarray[i]);
                res[queueData.imparray[i]] = {data:tdata};
            }
            advType = "adv360";
        }
        // console.log(advType,res);
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
    /**********************************df优先 360打底式请求队列 end *****************************************/
    
}

export default AdvManager.Instance();

