import axios from './request'
import NetHttp from './NetHttp'
import Utils from '../js/Utils';
class AdvService {
    constructor(){
        this.axios = axios;   
    }

    static Instance(){
        if(!AdvService._instance){
            AdvService._instance = new AdvService();
        }
        return AdvService._instance;
    }
    /**********************************东方广告start************************************** */
    /**
     * newdsp 请求参数示例
     * required 必填字段
     * recommended 推荐字段，尽可能的填写这些字段
     * optional 可选字段，若缺失使用空字符串或者 Boolean 值 false，亦可删除此字段
     * 说明中由 dsp 广告提供的参数，请联系 dsp 配置
     * 请求超时时间 1500ms
     * 依赖 jQuery 1.8.0+，兼容至 IE8
     */
     getDFTTParams(params){
        let getNewdspParam = {
            // 设备信息
            device: {
                terminal: 'PC', // string 终端：PC、WAP、APP
                deviceType: 'PC', // string 设备类型（默认为 PC）：PC - 个人计算机、PHONE - 手机设备、TABLET - 平板设备
                ip:Utils.myIP ? Utils.myIP : ""
            },
            // 站点信息
            site: {
                uid: new Date().getTime() + "" + Math.random().toString().slice(3,7), // required | String | 17 位用户ID (13 位时间戳 + 4 位随机数)
                qid: '04369', // required | String / Number | 渠道
                siteid: 1015, // required | String / Number | 站点 ID，dsp 广告提供
                sitename: 'waibu', // required | String | 站点名称，dsp 广告提供
                version: '1.0.1' // recommended | String | 软件版本，默认为 1.0.1
            },
            // 页面信息
            page: {
                pgtype: 'sy', // required | String | 页面类型 sy ny fny
                newstype: 'index', // required | String | 页面类型
                pgnum: params.pagenum, // optional | String / Number | 当前屏数，如不填则默认为 1，如果是滚动加载信息流广告则必填此项
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
            // imparray: [100006, 100007, 100008], // required | Array | 本次需要请求的广告 ID，dsp 广告提供
            imparray: params.imparray,
            // 广告上报信息，与广告信息中 ID 对应
            report: params.report,
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

    requestDFTT(data){
        return new Promise((resolve,reject)=>{
            let params = this.getDFTTParams(data);
            NEWDSP_20200715.GET_DSP_DATA(params, (res) => {
                resolve(res);
            });
        });
    }
    /**********************************东方广告end************************************** */

    /**********************************360广告start************************************** */
    /**获取360广告(单独样式信息流)0YzcKg */
    get360Params(showId){
        let userid = this.axios.defaults.headers["userId"];
        let uid = userid + "_" + new Date().getTime();
        let params = {of:4,newf:1,type:1,showid: showId,uid,reqtimes:1,refurl:document.referrer,mid:"",impct:1,queryword:"",
            // scheme:"https",
            //cname:"",
            //title:"",
            //tck:"",
            //schannel:"",
            // imgfmt:""
        };
        return params;
    }

    request360(showid = "7dJ8Xl"){
        return new Promise((resolve,reject)=>{
            let url = process.env.NODE_ENV == "development" ? "http://show.g.mediav.com/s" : "https://show-g.mediav.com/s";
            let params = this.get360Params(showid);
            NetHttp.jsonp(url,params).then((res)=>{
                if(!res || !res.ads || !res.ads.length || !res.ads[0]){
                    resolve(null);
                    return;
                }
                let adv = res.ads[0];
                resolve(adv);
            });
        });
    }
    /**********************************360广告end************************************** */

}

export default AdvService.Instance();