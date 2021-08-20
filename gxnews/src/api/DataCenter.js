import axios from './request'
import AdvertiseUtils from './AdvertiseUtils'
import Utils from '.././js/Utils'
import NetHttp from './NetHttp'
//本地化
let isLocalTest = false;
class DataCenter {
    static _instance;
    static instance(){
        if(!this._instance){
            this._instance = new DataCenter();
        }
        return this._instance;
    }
    
    constructor(){
        this.axios = axios;
        this.maxTSZNum = 4;
        this.isCanLoadNext = true;
    }

    setQid(qid){
        axios.defaults.headers["qid"] = qid ? qid : ""
    }

    getRealUrl(cmd = ""){
        return process.env.PROXY_BASE + cmd;
    }

    uploadAct(url){
        this.axios.get(url);
    }

    getRandomAdverInfo(position){
        if(!this._adverIdx){
            this._adverIdx = 110000;
        }
        else{
            this._adverIdx++;
        }
        let ad = {};
        if(this.adverList){
            ad = this.adverList[position];
        }
        let info;
        if(ad){
            info = {};
            info.id = this._adverIdx;
            info.ad_script = ad.ad_script;
            info.ad_title = ad.ad_title;
        }
        return info;
    }
    
    addSimulateClick(classname){
        if(!Utils.checkIsIE()) return;
        // console.log("执行了 准备");
        Utils.addDelay(()=>{
            let elements = document.getElementsByClassName(classname);
            if(!elements || elements.length == 0) return;
            let info = this.adsPieces && this.adsPieces[classname];
            // console.log("开始判断info");
            if(!info) return;
            let page = -1;
            for(let num in info){
                let data = info[num];
                if(data && data.loaded){
                    page = data.pagenum;
                    if(Math.random() > 0.5) break;
                }
            }
            if(page < 0) return;
            let index = 0;
            index = (page - 1) * this.maxTSZNum + Math.floor(this.maxTSZNum*Math.random());
            // console.log("ddddddddd:"+index);
            if(index >= elements.length) return;
            let ele = elements[index];
            let links = ele.getElementsByTagName("a");
            if(!links || links.length == 0) return;
            let link = links[0];
            link.click();
            // window.open(link.href,"_blank");
            // console.log("跳转了" + link.href)
        },this,3600);
    }

    /**加载广告 360一次最多4条 */
    addAdsByClassName(classname){
        if(!classname) return
        let elements = document.getElementsByClassName(classname);
        if(!elements || elements.length == 0) return
        let len = elements.length;
        for(let i = 0;i < len;i++){
            let element = elements[i];
            if(!element) continue;
            this.changeAndExecuteJS(element);
        }
    }
    /**默认打底广告 */
    getDefaultBDAdv(){
        let advcode = `<div class="_fnnhq1kgkkb"></div>
        <script type="text/javascript">
            (window.slotbydup = window.slotbydup || []).push({
                id: "u6606892",
                container: "_fnnhq1kgkkb",
                async: true
            });
        </script>`;
        return advcode;
    }
    /**懒加载 进入可视范围才加载 */
    checkAdverLoad(classname){
        let elements = document.getElementsByClassName(classname);
        if(!elements || elements.length == 0) return;
        if(!this.adsPieces) this.adsPieces = {};
        if(!this.adsPieces[classname]){
            let pagenum = 1;
            this.adsPieces[classname] = {};
            this.adsPieces[classname][pagenum] = {pagenum,loaded:false};
            this.addAdsByClassName2(classname,pagenum);
        }
        else{
            let pagenum = -1;
            let isload = false;
            let len = elements.length;
            for(let i = 0;i < len;i++){
                pagenum = 1 + Math.ceil((i + 1)/this.maxTSZNum);
                if((pagenum - 1) * this.maxTSZNum >= len) continue;
                let info = this.adsPieces[classname][pagenum];
                if(info) continue;
                let ele = elements[i];
                if(Utils.checkIsInViewport(ele)){
                    this.adsPieces[classname][pagenum] = {pagenum,loaded:false};
                    isload = true;
                    break;
                }
            }
            if(isload){
                this.addAdsByClassName2(classname,pagenum);
            }
        }
    }

    async addAdsByClassName2(classname,pagenum){
        let promise = new Promise((resolve,reject)=>{resolve()});
        if(!classname) return promise;
        let elements = document.getElementsByClassName(classname);
        if(!elements || elements.length == 0) return promise;
        if(!this.adsPieces) this.adsPieces = {};
        let len = elements.length;
        let advobj = this.adsPieces[classname][pagenum];
        if(advobj.loaded || !this.isCanLoadNext) return;
        this.isCanLoadNext = false;
        let arr1 = [];
        let arr2 = [];
        let prebool = false;
        for(let i = 0;i < len;i++){
            let element = elements[i];
            if(!element || element.innerHTML == "") continue;
            let advtype = element.getAttribute("advtype");
            if(advtype == "advbd"){
                // this.changeAndExecuteJS(element);
                arr1.push(element);
                prebool = true;
            }
            else if(advtype == "adv360"){
                arr2.push(element);
                prebool = true;
            }
            else{
                this.changeAndExecuteJS(element);
            }
        }
        if(!prebool){
            advobj.loaded = true;
            this.isCanLoadNext = true;
            return promise;
        }
        // console.log(classname);
        if(arr1.length > 0){
            await this.handleTSZNext(pagenum,arr1,true);
        }
        if(arr2.length > 0){
            await this.handleTSZNext(pagenum,arr2);
        }
        advobj.loaded = true;
        this.isCanLoadNext = true;
        for(let key in this.adsPieces){
            let info = this.adsPieces[key];
            let bool = false;
            for(let page in info){
                if(info[page] && !info[page].loaded){
                    this.addAdsByClassName2(key,parseInt(page));
                    bool = true;
                    break;
                }
            }
            if(bool) break;
        }
        if(arr2.length > 0){
            Utils.addDelay(()=>{
                let bdadv = this.getDefaultBDAdv();
                for(let i = 0;i < arr2.length;i++){
                    let ele = arr2[i];
                    let fele = ele.firstChild;
                    if(fele && fele.nodeName == 'NEWSFEED' && fele.offsetHeight <= 0){
                        ele.innerHTML = bdadv;
                        ele.isAdLoaded = false;
                        this.changeAndExecuteJS(ele,true);
                    }
                }
            },this,5000,1);
        }
    }
    
    handleTSZNext(pagenum,arr,check = false){
        return new Promise((resolve,reject)=>{
            let start = (pagenum - 1) * this.maxTSZNum;
            let end = start + this.maxTSZNum;
            let sarr = arr.slice(start,end);
            // console.log(start+"---------"+end);
            for(let i = 0;i < sarr.length;i++){
                this.changeAndExecuteJS(sarr[i],check);
            }
            if(check){
                resolve();
                return;
            }
            let func = ()=>{
                let len = sarr.length;
                let isAllFinish = true;
                for(let i = 0;i < len;i++){
                    let ele = sarr[i];
                    if(ele.isAdLoaded) continue;
                    if(ele.style.display == "none") continue;
                    let fele = ele.firstChild;
                    if(!fele) continue;
                    if(fele.nodeName == 'NEWSFEED'){
                        ele.isAdLoaded = true;
                        continue;
                    }
                    isAllFinish = false;
                    break;
                }
                if(isAllFinish){
                    Utils.removeDelay(40,func);
                    Utils.addDelay(resolve,this,100);
                    // console.log("load complete")
                }
            }
            Utils.addDelay(func,this,40,0);
        });
    }
    /**change function */
    changeAndExecuteJS(element,loaded = true){
        if(element.isAdLoaded) return;
        if(element.style.display == "none") return;
        let sScript = element.getElementsByTagName("script")[0];
        if(!sScript) return;
        element.removeChild(sScript);
        let nScript = document.createElement("script");
        nScript.type = "text/javascript";
        nScript.innerHTML = sScript.innerHTML;
        element.appendChild(nScript);
        element.isAdLoaded = loaded;
    }
    /**get current ads copy */
    addAdCopied(sclsname,tclsname){
        if(!this.adsPieces) return false;
        let savedAds = this.adsPieces[tclsname];
        if(!savedAds || savedAds.length == 0) return false;
        let elements = document.getElementsByClassName(sclsname);
        if(!elements) return false;
        let len = elements.length;
        if(len == 0) return false;
        for(let i = 0;i < len;i++){
            let sele = elements[i];
            let tele = savedAds[~~(savedAds.length * Math.random())];
            sele.innerHTML = tele.innerHTML;
        }
        return true;
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
        // console.log(actid + "----" + type + "----" + action)
        this.axios.get(rurl).then((res)=>{
            // console.log(res);
        });
    }
    /**获取360广告(单独样式信息流)0YzcKg */
    get360AdvData(showid = "0YzcKg"){
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
            if(!res || !res.ads || !res.ads.length) return null;
            let adv = res.ads[0];
            if(!adv) return null;
            this.upTo360ShowLog(adv);
            let info = {
                cateId: -100,
                from: "360",
                id: -10000,
                pics: [adv.img],
                time: "",
                title: adv.title,
                type: 1,
                url:adv.curl,
                adv:adv
            }
            return info;
        });
    }
    /**新闻列表 */
    getNewsList(){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"cateId":1,"cateName":"\u63a8\u8350"},{"cateId":3,"cateName":"\u793e\u4f1a"},{"cateId":4,"cateName":"\u5a31\u4e50"},{"cateId":5,"cateName":"\u56fd\u9645"},{"cateId":6,"cateName":"\u519b\u4e8b"},{"cateId":7,"cateName":"\u8d22\u7ecf"},{"cateId":8,"cateName":"\u4f53\u80b2"},{"cateId":9,"cateName":"\u517b\u751f"},{"cateId":10,"cateName":"\u7b11\u8bdd"},{"cateId":11,"cateName":"\u6c7d\u8f66"}]}
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        let url = this.getRealUrl("/v1/news/cate");
        return this.axios.get(url).then(res=>res.data)
    }
    /**分类下资讯列表 */
    getNewsListById(idx,page = 1){
        if(isLocalTest){
            let data = {};
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        let ext = "/v1/news/list?cateid="+idx + "&page=" + page;
        let url = this.getRealUrl(ext);
        return this.axios.get(url).then(res=>{
            let data = res.data;
            if(data.code == 200){
                this.upToAdverByIframe(data.data);
            }
            return data;
        });
    }
    /**新闻详情 */
    getNewsDetailById(idx){
        if(isLocalTest){
            let data = {
                "status": "success", 
                "code": 200, 
                "data": {}
            }
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        let ext = "/v1/news/detail?id=" + idx
        let url = this.getRealUrl(ext);
        return this.axios.get(url).then(res=>res.data)
    }
    /**24小时热销 */
    get24HoursNews(){
        if(isLocalTest){
            let data = {};
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        let url = this.getRealUrl("/v1/news/index");
        return this.axios.get(url).then(res=>res.data)
    }
    /**滚动新闻 */
    getTimeNewsList(){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"id":2,"title":"\u201c\u719f\u86cb\u8fd4\u751f\u5b75\u5c0f\u9e21\u201d\u8bba\u6587\u4f5c\u8005\u75db\u54ed","url":"http:\/\/news.dtxww.cn\/#\/content?id=7782"}]}
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        let url = this.getRealUrl("/v1/news/fast");
        return this.axios.get(url).then(res=>res.data)
    }
    /**详情页左侧热点、 小编推荐、视角*/
    getDetailLeftNews(){
        if(isLocalTest){
            let data = {}
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        let url = this.getRealUrl("/v1/news/hot");
        return this.axios.get(url).then(res=>res.data)
    }
    /**详情页底部推荐*/
    getDetailDownNews(){
        if(isLocalTest){
            let data = {}
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        let url = this.getRealUrl("/v1/news/rec");
        return this.axios.get(url).then(res=>res.data)
    }
    /**广告位信息*/
    getAdverInfo(type){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"id":2,"ad_title":"\u6d4b\u8bd5\u5e7f\u544a\u4f4d1","ad_script":"<div class=\"_nxesvse7q3\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6531718\",\r\n        container: \"_nxesvse7q3\",\r\n        async: true\r\n    });\r\n<\/script>"}]};
            return new Promise((resolve,reject)=>{
                resolve(data);
            });
        }
        let ext = "/v1/adv/index?type=" + type;
        let url = this.getRealUrl(ext);
        return this.axios.get(url).then(res=>{
            let data = res.data.data;
            let info = this.adverList;
            if(!info){
                this.adverList = data;
            }
            else{
                for(let key in data){
                    info[key] = data[key];
                }
            }
            return res.data;
        });
    }
    /**mini页list信息 */
    getMiniList(idx,page = 1){
        if(isLocalTest){
            let data = {}
            return new Promise((resolve,reject)=>{
                resolve(data)
            })
        }
        let ext = "/v1/news/minimain?cateid=" + idx + "&page=" + page;
        let url = this.getRealUrl(ext);
        return this.axios.get(url).then(res=>res.data)
    }
    /**mini页右侧list */
    getMiniRightList(){
        if(isLocalTest){
            let data = {}
            return new Promise((resolve,reject)=>{
                resolve(data)
            })
        }
        let url = this.getRealUrl("/v1/news/mini");
        return this.axios.get(url).then(res=>res.data)
    }
    /****************************优化版接口******************************************** */
    /**详情页单接口 */
    getDetailInfo(){
        let ext = "//news.dtxww.cn/data/mini_detail.json";
        if(process.env.NODE_ENV == "development"){
            ext = "/data/mini_detail.json";
        }
        return this.axios.get(ext,{headers:{'Content-Type':'application/json'}}).then(res=>{
            let data = res.data;
            return {code:200,data};
        });
    }
    /**get mini info */
    getMiniInfo(cateid = 1,page = 1){
        if(page == 1){
            let ext = `//news.dtxww.cn/data/mini_data_${cateid}.json`;
            if(process.env.NODE_ENV == "development"){
                ext = `/data/mini_data_${cateid}.json`;
            }
            return this.axios.get(ext,{
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(res=>{
                let data = res.data;
                // console.log("-------------");
                // console.log(data.main_list);
                this.upToAdverByIframe(data.main_list);
                return {code:200,data};
            });
        }
        let ext = "/v1/mini/index?cateid=" + cateid + "&page=" + page;
        let url = this.getRealUrl(ext);
        return this.axios.get(url).then(res=>{
            let data = res.data;
            console.log(data.data.main_list);
            if(data.code == 200){
                this.upToAdverByIframe(data.data.main_list);
            }
            return data;
        });
    }
}

export default DataCenter.instance();
