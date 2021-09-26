import axios from './request'
import Utils from "@/js/Utils"
import NetHttp from './NetHttp'
class TSZAdver {
    static instance(){
        if(!TSZAdver._instance){
            TSZAdver._instance = new TSZAdver();
        }
        return TSZAdver._instance
    }

    constructor(){
        this.advShowIDS = ["k9ohe1","u7zGw0","YOOvNu","XpSS6i","z8dR81","jzKRfS","s5RjZC","uEwdQM","xuUEzU","th3oer"];
        this.index = 0;
        this.axios = axios;
    }

    /**广告iframe上报 */
    upToAdverByIframe(advers = []){
        if(!advers || advers.length == 0) return;
        let len = advers.length;
        let element = document.getElementById("common_other_container");
        element.innerHTML = "";
        let div = document.createElement("div");
        for(let i = 0;i < len;i++){
            let adv = advers[i];
            if(adv.type == 3 && adv.impression && adv.impression.length > 0){
                for(let url of adv.impression){
                    let iframe = document.createElement("iframe");
                    iframe.src = url;
                    div.append(iframe);
                }
            }
        }
        // console.log(div);
        element.appendChild(div);
    }

    /**upTo360Adver */
    upTo360ShowLog(adv){
        if(!adv) return;
        let time = new Date().getTime();
        let imptk = adv.imptk;
        if(imptk && imptk.length > 0){
            for(let i = 0;i < imptk.length;i++){
                let imp = imptk[i];
                let imps = imp.replace("__EVENT_TIME_START__",time);
                Utils.upStatistics(imps);
            }
        }
        let adstk = adv.adstk;
        if(adstk && adstk.length > 0){
            for(let i = 0;i < adstk.length;i++){
                let adk = adstk[i];
                let adks = adk.replace("__EVENT_TIME_START__",time);
                Utils.upStatistics(adks);
            }
        }
    }
    /**点击广告 */
    upTo360ClkLog(adv,x,y,w,h,start){
        if(!adv) return;
        if(start == 1){
            this.advCop = {};
            let clktk = adv.clktk;
            let ctks = [];
            if(clktk && clktk.length > 0){
                for(let i = 0;i < clktk.length;i++){
                    let ctk = clktk[i];
                    ctks.push(ctk);
                }
            }
            this.advCop.clktk = ctks;
            this.advCop.curl = adv.curl;
        }
        let time = new Date().getTime();
        let clktk = this.advCop.clktk;
        if(clktk && clktk.length > 0){
            for(let i = 0;i < clktk.length;i++){
                if(start == 3){
                    Utils.upStatistics(clktk[i]);
                    continue;
                }
                clktk[i] = clktk[i].replace(/__OFFSET_X__/g,x);
                clktk[i] = clktk[i].replace(/__OFFSET_Y__/g,y);
                if(start == 1){
                    clktk[i] = clktk[i].replace(/__EVENT_TIME_START__/g,time);
                }
                else if(start == 2){
                    clktk[i] = clktk[i].replace(/__EVENT_TIME_END__/g,time);
                }
                clktk[i] = clktk[i].replace(/__ADSPACE_W__/g,w);
                clktk[i] = clktk[i].replace(/__ADSPACE_H__/g,h);
            }
        }
        if(this.advCop.curl){
            let curl = this.advCop.curl;
            curl = curl.replace(/__OFFSET_X__/g,x);
            curl = curl.replace(/__OFFSET_Y__/g,y);
            if(start == 1){
                curl = curl.replace(/__EVENT_TIME_START__/g,time);
            }
            else if(start == 2){
                curl = curl.replace(/__EVENT_TIME_END__/g,time);
            }
            curl = curl.replace(/__ADSPACE_W__/g,w);
            curl = curl.replace(/__ADSPACE_H__/g,h);
            this.advCop.curl = curl;
            if(start == 3){
                window.open(this.advCop.curl,"_blank");
            }
        }
    }
    /**上报  type : click open close  action:left,right*/
    upToActivity(actid,type,action){
        if(process.env.NODE_ENV != "production") return;
        let url = this.getRealUrl("/v1/demo/index");
        let userid = this.axios.defaults.headers["userId"];
        let params = "?userid=" + userid + "&" + "actid=" + actid;
        if(type){
            params += "&type=" + type;
        }
        if(action){
            params += "&action=" + action;
        }
        let rurl = url + params;
        console.log(actid + "----" + type + "----" + action)
        this.axios.get(rurl).then((res)=>{
            // console.log(res);
        });
    }
    /**get TSZ */
    async getAdvData(params){
        let imparray = params.imparray;
        let data = {};
        let slen = this.advShowIDS.length;
        let len = imparray.length;
        for(let i = 0;i < len;i++){
            let info = await this.getJSONAdvData(this.advShowIDS[this.index]);
            this.index++;
            if(this.index >= slen) this.index = 0;
            if(info){
                data[imparray[i]] = {data:info};
            }
        }
        return data;
    }
    /**获取360广告(单独样式信息流)0YzcKg */
    getJSONAdvData(showid = "7dJ8Xl"){
        let userid = this.axios.defaults.headers["userId"];
        let uid = userid + "_" + new Date().getTime();
        let params = {
            of:4,
            newf:1,
            type:1,
            showid,
            uid,
            reqtimes:1,
            refurl:document.referrer,
            mid:"",
            impct:1,
            queryword:"",
            // scheme:"https",
            cname:"",
            title:"",
            tck:"",
            schannel:"",
            // imgfmt:""
        };
        let url = process.env.NODE_ENV == "development" ? "http://show.g.mediav.com/s" : "https://show-g.mediav.com/s";
        return NetHttp.jsonp(url,params).then((res)=>{
            // res = {ads:[{curl:"https://wwww.baidu.com",title:"我是你爸爸",img:"https://s3m6.nzwgs.com/galileo/b8aebc644651b4d466feeaca30dd76c0.jpg_.webp"}]}
            if(!res || !res.ads || !res.ads.length) return null;
            let adv = res.ads[0];
            if(!adv) return null;
            // this.upTo360ShowLog(adv);
            return adv;
        });
    }

}

export default TSZAdver.instance();