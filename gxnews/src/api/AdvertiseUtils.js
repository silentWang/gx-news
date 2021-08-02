import NetHttp from './NetHttp'
class AdvertiseUtils {
    constructor(){
    }
    static getOS(){
        let sUserAgent = navigator.userAgent;
        let isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        let isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac) return "Mac";
        let isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix) return "Unix";
        let isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        if (isLinux) return "Linux";
        if (isWin) {
            let isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";
            let isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";
            let isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";
            let isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";
            let isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";
            let isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
            if (isWin10) return "Win10";
        }
        return "other";
    }

    static getNet(){
        let ua = navigator.userAgent;
        let networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
        networkStr = networkStr.toLowerCase().replace('nettype/', '');
        let networkType,type = 0;
        switch(networkStr) {
            case 'wifi':
                networkType = 'wifi';
                type = 0;
                break;
            case '4g':
                networkType = '4g';
                type = 3;
                break;
            case '3g':
                networkType = '3g';
                type = 2;
                break;
            case '3gnet':
                networkType = '3g';
                type = 2;
                break;
            case '2g':
                networkType = '2g';
                type = 1;
                break;
            default:
                networkType = 'other';
        }
        return {network:networkType,type};
    }

    static getPos(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos)=>{
                this.position = pos;
            });
        }
    }

    static getPublicParams(){
        let time = new Date().getTime();
        let rand1 = Math.random().toString().slice(2,6);
        let rand2 = Math.random().toString().slice(2,8);
        let params = {
            /**标识一次请求的唯一id，格式：毫秒时间戳+4位随机数（17） */
            requestId:`${time}${rand1}`,
            /**string 终端：PC,WAP,APP */
            terminal:"PC",		
            apiVersion:"1.0.1",
            /**广告位信息，在同一次请求中，至少包含一个广告位信息  一次BidRequest至少包含一个imp对象*/
            imp:[{
                /**曝光id，格式：毫秒时间戳+6位随机数（19） */
                impId:`${time}${rand2}`,
                /**广告位id，需在后台进行申请获取； */
                slotId:"",
                pageNum:1
            }],	
            /**站点信息（条件必填）只有当前广告位展现在某个PC或WAP站时，该对象才需要被设置 */
            site:{
                /**站点id，需要在后台进行申请 */
                siteid:"",
                /**站点名称*/
                siteName:"热点新闻",
                /**渠道号 required*/	
                qid:"dftt",
                /**页面类型（譬如：ny） required */
                pageType:"ny",	
                /**当前页面的url，必传  required*/
                pageUrl:"",
                /**当前站点的域名；程序动态获取，不能写死；required */
                domain:document.domain,
                /**程序动态获取，不能写死 required */
                referer:"no-referrer",
                /**首页传频道类型；详情页传新闻分类 */
                newstype:"index"
            },
            /**设备信息 */
            device:	{
                /**required	string	浏览器user agent,对于从网页中发起的竞价请求，必须提供完整的ua信息；描述发起当前竞价请求的浏览器User Agent */
                userAgent:navigator.userAgent,
                /**required	string	当前设备的IP信息 */
                ip:"",
                /**required	string	设备类型 */
                deviceType:"PC",
                /**个人计算机 */
                PC:"PC",
                /**手机设备 */
                PHONE:"",
                /** 平板设备*/
                TABLET:"",
                /**required	string	WINDOWS - Windows操作系统，包含PC和移动版本 */
                os:this.getOS(),
                /**Apple PC设备的操作系统 */
                MACOS:"",
                /**Linux操作系统 */
                LINUX:"",
                /**Apple移动设备的操作系统 */
                IOS:"",
                /**Android操作系统 */
                ANDROID:"",
                /**required	string	操作系统版本号 (例如：3.1.2) */
                osVersion:"1.0.1",
                /**required	int	物理屏幕高度 */
                height:window.screen.width,
                /** required	int	物理屏幕宽度*/
                width:window.screen.height
            },
            /**用户信息 */
            user:{
                /** required	string	用户id，web和wap必传,32位*/
                userId:"16225123241340085783169054822330",
                /**optional	int	出生年份，四位数字 */
                birthYear:"2000",	
                /**optional	string	性别 */
                gender:"M"
            }
        }
        return params;
    }

    static getDFTTAdver(){
        let params = this.getPublicParams();
        NetHttp.post("",params).then((res)=>{
            console.log(res)
        });
    }

    static getCSSPParams(){
        let id = "fjqs"+new Date().getTime();
        let userid = localStorage.getItem("rdxw_15de_userId");
        let pos = this.position ? this.position : {};
        let params = {
            /**string 请求ID */
            id:id,
            /**string（必填） 在Cloud-SSP创建完广告位后，SSP会为每个广告位返回字符串格式的唯一标识 */
            key:"c59281bd-1dd7-42b9-935c-a8da2b80d2e3",
            /**int64 应用ID */
            appid:"",
            /**int64 用户ID */
            userid:userid,
            /**int 单次请求广告创意个数 */
            count:1,
            /**string User Agent */
            ua:window.userAgent,
            /**string Ip地址 */
            ip:"",
            /** string（建议） 移动设备IMEI[明文]*/
            did:"",
            /**string 移动设备IMEI[SHA-1处理] */
            didsha1:"",
            /**string 移动设备IMEI[MD5处理] */
            didmd5:"",
            /** string（建议） 移动设备Android-ID[明文]*/
            dpid:"",
            /**string 移动设备Android-ID[SHA-1处理] */
            dpidsha1:"",
            /**string 移动设备Android-ID[MD5处理] mac string（建议） 设备网卡MAC[明文] macsha1 string 设备网卡MAC[SHA-1处理] macmd5 string 设备网卡MAC[MD5处理] */
            dpidmd5:"",
            /**string 移动设备IDFA[明文] */
            idfa:"",
            /**string 移动设备IDFA[SHA-1处理] */
            idfasha1:"",
            /**string 移动设备IDFA[MD5处理]参数 类型 含义 */
            idfamd5:"",
            /**string（建议） 用户Cookie maker string */
            cookie:"",
            /**string(建议) 设备型号 设备操作系统类型
            0 - Windows os int（建议）
            1 - MacOS
            2 - Linux
            3 - iOS
            4 - Android */
            model:this.getOS() == "Mac" ? "Mac" : "Windows",
            /**string（建议） 设备操作系统版本号 */
            osv:"10.0",
            /**int 设备屏幕宽度 */
            screen_w:window.screen.width,
            /**int 设备屏幕高度 */
            screen_h:window.screen.height,
            /**设备类型int（建议）0 - PC
                1 - Phone 2 - Tablet */
            devicetype:0,
            /**int（建议） 0- 电信
                1 - 移动
                2 - 联通
                3 - 网通
                网络接入方式 */
            carrier:0,
            /**int（建议） 0 - Wi-Fi
            1 - 2G网络
            2 - 3G网络
            3 - 4G网络
            4 - 有线宽带*/
            connectiontype:this.getNet().type,
            /**double GPS经度值 */
            lon:pos.coords ? pos.coords.longitude : 0,
            /**double GPS纬度值 */
            lat:pos.coords ? pos.coords.latitude : 0,
            /**string 设备当前所在国家 */
            country:"ch",
            /**string 设备当前所在省份 */
            prov:"",
            /**string 设备当前所在城市 */
            city:"",
            /**string 设备当前所在商圈 */
            commercial:"",
            /**定位信息获取方式  int 1 - GPS
            2 - IP翻译
            3 -  用户自行提供*/
            locationtype:1
        }
        return params;
    }

    static load360Ad(container,width,pureAdNum = 10,errorFunc = null){
        // 参数说明：
        // 1. w: 广告宽度
        // 2. showid: 根据需要填写测试showid或正式showid
        // 3. placeholderId: 广告所在容器id，不填则在NEWS_FEED方法调用位置创建广告
        // 5. inject: 一般情况下默认为‘cads’即可
        NEWS_FEED({
            w: width,
            placeholderId: container, // 指定插入位置
            showid: 'dujNK0', // 需要替换showid
            inject: 'cads',
        //  noCSS: true, //是否不加载默认css， 默认为false（加载默认css）。
            pureAdNum: pureAdNum, //一次请求的广告条数，建议值设置为 N 或 N+1 （N为一屏所容纳的广告条数）
            useCapture: true,
        //  displayType: 'singleImage', //固定单图样式展现
        //  onFailSign: 'test', //媒体可自定义属性和值，用作本次加载的标记
        //  userConf: { //前端样式配置，按需使用
        //      titleFontSize: 14,
        //      titleFontColor: "#34c75f",
        //      titleHover: "#f00",
        //      titleFontFamily: "Microsoft Yahei",
        //      contentBackground: "#a69898"
        //  },
            onFail: function(param){ //广告加载失败时触发的回调（仅在函数调用触发了请求时才能响应onFail）
                /*param：参数为NEWS_FEED调用时的入参*/
                console.log(param, '广告加载失败时触发了回调');
                if(errorFunc){
                    errorFunc();
                }
            }
        });
        // feed_ts.js 引用一次即可，里面定义了NEWS_FEED方法。
        // NEWS_FEED方法可重复调用，每调用一次即加载一条广告。（最多支持同时 {{pureAdNum}} 条广告处于加载中状态）
        // 屏蔽中参数可按需放开使用 
    }
}
// AdvertiseUtils.getPos();
export default AdvertiseUtils