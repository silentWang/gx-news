import NetHttp from './NetHttp'
export default class AdvertiseUtils {
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
}