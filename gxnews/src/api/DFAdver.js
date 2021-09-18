import Utils from "@/js/Utils"
class DFAdver {
    static instance(){
        if(!DFAdver._instance){
            DFAdver._instance = new DFAdver();
        }
        return DFAdver._instance
    }
    
    constructor(){
        this.advDataList = [101232,101233,101234,101235,101236,101237,101238,101239,101240,101241];;
        this.advConfig = {};
        this.advConfigList = [];
        this.index = 0;
        this.uniqueIdx = 0;
        this.maxPageNum = 10;
        this.isloading = false;
    }

    getNextAd(){
        if(this.index >= this.advDataList.length){
            this.index = 0;
        }
        let advID = this.advDataList[this.index];
        let elementID = "adv_1000" + this.uniqueIdx;
        let config = {advID,elementID,data:null};
        this.advConfig[elementID] = config;
        this.advConfigList.push(config);
        this.index++;
        this.uniqueIdx++;
        return config;
    }

    getAdvDataById(id){
        if(!this.advConfig[id]) return null;
        return this.advConfig[id].data;
    }

    addAdvData(data){
        if(!data) return;
        let array = [];
        let needlen = 0;
        for(let key in data){
            needlen++;
        }
        let length = this.advConfigList.length;
        let step = 0;
        for(let i = 0;i < length;i++){
            let conf = this.advConfigList[i];
            if(conf.data) continue;
            for(let id in data){
                if(id == conf.advID){
                    conf.data = data[id].data;
                    array.push(conf);
                    step++;
                    break;
                }
            }
            if(step >= needlen) break;
        }
        for(let conf of array){
            if(this.callbacks && this.callbacks[conf.elementID]){
                let fun = this.callbacks[conf.elementID];
                fun.func.call(fun.context);
            }
        }
    }

    addCallBacks(eid,func,context){
        if(!this.callbacks){
            this.callbacks = {};
        }
        this.callbacks[eid] = {func,context};
        let data = this.getAdvDataById(eid);
        if(data){
            func.call(context);
        }
    }

    /**懒加载 进入可视范围才加载 */
    checkDFADLoad(classname){
        let elements = document.getElementsByClassName(classname);
        if(!elements || elements.length == 0) return;
        if(!this.adsPieces) this.adsPieces = {};
        if(!this.adsPieces[classname]){
            let pagenum = 1;
            this.adsPieces[classname] = {};
            this.adsPieces[classname][pagenum] = {pagenum,loaded:false};
            this.loadNext(classname);
        }
        else{
            let pagenum = -1;
            let isload = false;
            let len = elements.length;
            for(let i = 0;i < len;i++){
                pagenum = 1 + Math.ceil((i + 1)/this.maxPageNum);
                if((pagenum - 1) * this.maxPageNum >= len) continue;
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
                this.loadNext(classname);
            }
        }
    }

    loadNext(classname){
        if(this.isloading) return;
        let loaddata = null;
        for(let page in this.adsPieces[classname]){
            let info = this.adsPieces[classname][page];
            if(info && !info.loaded){
                loaddata = info;
                break;
            }
        }
        if(loaddata){
            console.log("load next " + loaddata.pagenum)
            this.isloading = true;
            this.getAdvInfo(loaddata.pagenum).then(()=>{
                loaddata.loaded = true;
                this.adsPieces[classname][loaddata.pagenum].loaded = true;
                this.isloading = false;
                this.loadNext(classname);
            });
        }
    }

    /**
     * newdsp 请求参数示例
     * required 必填字段
     * recommended 推荐字段，尽可能的填写这些字段
     * optional 可选字段，若缺失使用空字符串或者 Boolean 值 false，亦可删除此字段
     * 说明中由 dsp 广告提供的参数，请联系 dsp 配置
     * 请求超时时间 1500ms
     * 依赖 jQuery 1.8.0+，兼容至 IE8
     */
     getReqParams(pagenum){
        let imparray = [];
        let report = {};
        let len = this.advConfigList.length;
        let start = 0;
        for(let i = 0;i < len;i++){
            let conf = this.advConfigList[i];
            if(conf.data) continue;
            imparray.push(conf.advID);
            report[conf.advID] = {
                "container": conf.elementID,
                "$scrollBox":$("mini_middle")[0]
            }
            start++;
            if(start >= this.maxPageNum) break;
        }
        let getNewdspParam = {
            // 设备信息
            device: {
                terminal: 'PC', // string 终端：PC、WAP、APP
                deviceType: 'PC' // string 设备类型（默认为 PC）：PC - 个人计算机、PHONE - 手机设备、TABLET - 平板设备
            },
            // 站点信息
            site: {
                uid: new Date().getTime() + "" + Math.random().toString().slice(3,7), // required | String | 17 位用户ID (13 位时间戳 + 4 位随机数)
                qid: '1', // required | String / Number | 渠道
                siteid: 1015, // required | String / Number | 站点 ID，dsp 广告提供
                sitename: 'waibu', // required | String | 站点名称，dsp 广告提供
                version: '1.0.1' // recommended | String | 软件版本，默认为 1.0.1
            },
            // 页面信息
            page: {
                pgtype: 'sy', // required | String | 页面类型 sy ny fny
                newstype: 'index', // required | String | 页面类型
                pgnum: pagenum // optional | String / Number | 当前屏数，如不填则默认为 1，如果是滚动加载信息流广告则必填此项
            },
            // 地理位置信息
            position: {
                country: '', // recommended | string | 国家，获取不到则为空字符串
                province: '', // recommended | string | 省份，获取不到则为空字符串
                city: '' // recommended | string | 城市，获取不到则为空字符串
            },
            // 其他补充信息
            other: {
                istest: process.env.NODE_ENV != "production", // required | Boolean | 是否是开发或者测试环境，影响数据请求的接口地址
                isWaive: false // optional | Boolean | 是否放弃请求 newdsp 广告(默认为 false)，直接返回结果 null
            },
            // 广告信息
            imparray: imparray,//[100006], // required | Array | 本次需要请求的广告 ID，dsp 广告提供
            // imparray: [100006, 100007, 100008], // required | Array | 本次需要请求的广告 ID，dsp 广告提供
            // 广告上报信息，与广告信息中 ID 对应
            report: report
            //{
            // 100006: {
            //     container: containers[0], // required | selector | 广告位选择器（通过此选择器只能获取到唯一 dom 的选择器），class / id / 属性选择器 / ...
            //     $scrollBox: document.getElementsByClassName("mini_middle")[0] // optional | jQuery dom | 广告位所在的滚动容器，不填或者为空则默认为 $(window)
            // },
            // 100007: {
            //     container: containers[1], // required | selector | 广告位选择器（通过此选择器只能获取到唯一 dom 的选择器），class / id / 属性选择器 / ...
            //     $scrollBox: '' // optional | jQuery dom | 广告位所在的滚动容器，不填或者为空则默认为 $(window)
            // },
            // 100008: {
            //     container: containers[2], // required | selector | 广告位选择器（通过此选择器只能获取到唯一 dom 的选择器），class / id / 属性选择器 / ...
            //     $scrollBox: '' // optional | jQuery dom | 广告位所在的滚动容器，不填或者为空则默认为 $(window)
            // }
            // }
        };
        return getNewdspParam;
    }

    getAdvInfo(pagenum){
        return new Promise((resolve,reject)=>{
            // let data = null; 
            // this.addAdvData(data);
            // resolve(data);
            // return;

            let params = this.getReqParams(pagenum);
            NEWDSP_20200715.GET_DSP_DATA(params, (data) => {
                // console.log(JSON.stringify(data))
                this.addAdvData(data);
                resolve();
            });
        });
    }

}

export default DFAdver.instance();