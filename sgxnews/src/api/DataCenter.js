import axios from './request'
import Utils from '.././js/Utils'
import NetHttp from './NetHttp'
import AdvDFTT from './AdvDFTT'
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
    }

    setQid(qid){
        axios.defaults.headers["qid"] = qid ? qid : ""
    }

    /**创建一个广告管理
     * container 父滚动容器
     * dfttIds 东方广告ids
     * showIds  360 showids
     */
    createAdvItem(container = "",name = "actionDefault"){
        let item = new AdvDFTT(container);
        item.name = name;
        return item;
    }

    getRealUrl(cmd = ""){
        return process.env.PROXY_BASE + cmd;
    }
    /**渠道path路径 */
    getModeUrlRoot(){
        let mode = process.env.BUILD_MODE;
        if(mode >= 100){
            let type = mode%10;
            let xpath = ~~((~~(mode/10))*10);
            xpath = type >= 5 ? "test" + xpath : xpath;
            return xpath + "/";
        }
        return "100/";
    }
    /**跳转对应url 002特殊*/
    getJumpToPath(){
        let mode = process.env.BUILD_MODE;
        if(mode == 1 || mode == 3) return "";
        if(mode >= 100){
            let type = mode%10;
            let xpath = ~~((~~(mode/10))*10);
            let tpath = type >= 5 ? "test" + xpath : xpath;
            if(type == 2 || type == 6){
                xpath = "home/"+tpath
            }
            return xpath + "/";
        }
        return "100/";
    }

    getNextId(){
        if(!this.index) this.index = 10000;
        this.index++;
        return this.index;
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
        if(process.env.NODE_ENV == "development"){
            console.log("上报类型start="+start+",x=" + x + ",y=" + y)
        }
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
                // window.open(this.advCop.curl,"_blank");
            }
        }
    }
    /**上报  qid 渠道号*/
    upToActivity(type){
        let mode = this.getModeUrlRoot();
        let channel_code = mode && mode.slice(0,3);
        if(process.env.NODE_ENV != "production"){
            console.log(channel_code + "----" + type)
            return;
        }
        let url = "http://api.kukumai.cn/RedisData";//this.getRealUrl("/v1/demo/index");
        let userid = this.axios.defaults.headers["userId"];
        let params = "?userid=" + userid + "&" + "channel_code=" + channel_code;
        if(type){
            params += "&type=" + type;
        }
        let rurl = url + params;
        this.axios.get(rurl).then((res)=>{
            // console.log(res);
        });
    }
    /**获取本机ip */
    getIP(){
        if(this.myIP) return this.myIP;
        this.myIP = "";
        if(returnCitySN && returnCitySN.cip){
            this.myIP = returnCitySN.cip;
        }
        if(process.env.NODE_ENV == "development"){
            console.log("IP相关信息",returnCitySN);
        }
        return this.myIP;
    }
    /**地域屏蔽 */
    getAreaData(){        
        if(Utils.getRegion()) return new Promise((resolve,reject)=>{resolve()});
        let url = "https://1320418215543173.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/Dtxww/ClientArea/";
        return this.axios.get(url).then(res=>{
            let area = res.data
            Utils.setRegion(area.data);
        })
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
    /****************************json版接口******************************************** */
    getJsonUrl(type,cateid){
        let env = process.env.NODE_ENV;
        let mode = process.env.BUILD_MODE;
        let path = this.getModeUrlRoot();
        let root = "//news.kukumai.cn";
        let url = "";
        if(type == "home"){
            url = `${root}/data/online/${path}home/home_data.json`;
            if(env == "development"){
                url = `/data/develop/${path}home/home_data.json`;
            }
            else if(mode == 8 || (mode >= 100 && mode%100 == 5)){
                url = `${root}/data/develop/${path}home/home_data.json`;
            }
            return url;
        }
        if(type == "detail"){
            let query = Utils.getUrlParams();
            let cateid = query.cateid ? query.cateid : 1;
            url = `${root}/data/online/${path}detail/mini_detail_v_${cateid}.json`;
            if(env == "development"){
                url = `/data/develop/${path}detail/mini_detail_v_${cateid}.json`;
            }
            else if(mode == 7 || (mode >= 100 && mode%10 == 7)){
                url = `${root}/data/develop/${path}detail/mini_detail_v_${cateid}.json`;
            }
            return url;
        }
        if(type == "mini"){
            url = `${root}/data/online/${path}mini/mini_data_${cateid}.json?v=${new Date().getTime()}`;
            if(env == "development"){
                url = `/data/develop/${path}mini/mini_data_${cateid}.json?v=${new Date().getTime()}`;
            }
            else if(mode == 6 || (mode >= 100 && mode%10 == 5)){
                url = `${root}/data/develop/${path}mini/mini_data_${cateid}.json?v=${new Date().getTime()}`;
            }
            return url;
        }
        return url;
    }
    /**首页新接口 */
    getHomeInfo(){
        let ext = this.getJsonUrl("home");
        return this.axios.get(ext,{headers:{'Content-Type':'application/json'}}).then(res=>{
            let data = res.data;
            return {code:200,data};
        });
    }
    /**详情页单接口 */
    getDetailInfo(){
        if(this.detailData) return new Promise((resolve,reject)=>{resolve(this.detailData)});
        let query = Utils.getUrlParams();
        let ext = this.getJsonUrl("detail");
        return this.axios.get(ext,{headers:{'Content-Type':'application/json'}}).then(res=>{
            let data = res.data;
            if(query.from && !Utils.isLimitRegion(data.area_limit)){
                window.location.href = `http://news.kukumai.cn/?id=${query.id}&from=${query.from}`;
                return {code:-1};
            }
            this.detailData = {code:200,data};
            return this.detailData;
        });
    }
    /**get mini info */
    async getMiniInfo(cateid = 1,page = 1){
        if(page == 1){
            let ext = this.getJsonUrl("mini",cateid);
            let res = await this.axios.get(ext,{headers:{'Content-Type':'application/json'}});
            let data = res.data;
            this.upToAdverByIframe(data.main_list);
            return {code:200,data};
        }
        let ext = "/v1/mini/index?cateid=" + cateid + "&page=" + page;
        let url = this.getRealUrl(ext);
        return this.axios.get(url).then(res=>{
            let data = res.data;
            // console.log(data.data.main_list);
            if(data.code == 200){
                this.upToAdverByIframe(data.data.main_list);
            }
            return data;
        });
    }
}

export default DataCenter.instance();
