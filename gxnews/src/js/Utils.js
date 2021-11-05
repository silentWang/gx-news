import CompatibleUtils from '@/js/CompatibleUtils'
export default class Utils {
    constructor(){
    }

    static PositionType = {
        POSITION_MAIN:"main",
        POSITION_SIDE:"side",
        POSITION_HEADER:"header",
        POSITION_FOOTER:"footer",
        POSITION_MIDDLE:"middle",
        POSITION_BOTTOM:"bottom"
    }

    static ADV_TYPE = {
        DFTT:"advdf",
        TSZ:"adv360",
        BAIDU:"advbd",
    }

    static addWindowClick(func,context){
        if(!this.windowClkFunc){
            this.windowClkFunc = [{func,context}];
            CompatibleUtils.addEvent(window,"click",()=>{
                for(let f of this.windowClkFunc){
                    if(f.func){
                        f.func.call(f.context);
                    }
                }
            },this);
        }
        else{
            this.windowClkFunc.push({func,context});
        }
    }

    static checkIsIE(){
        let us = navigator.userAgent;
        let isIE1 = us.indexOf("MSIE") > -1;
        let isIE2 = !!window.ActiveXObject || "ActiveXObject" in window
        return isIE1 || isIE2;
    }

    static checkIsIEVer(version = 9){
        if(!this.checkIsIE()) return false;
        let bool = this.checkIsLds();
        if(bool) return true;
        let ver = navigator.appVersion;
        let vers = ver.split(";");
        let trimver = vers[1].replace(/[]/g,"");
        if(trimver.search(version) >= 0) return true;
        return false;
    }

    static checkIsLds(){
        let ua = navigator.userAgent;
        console.log(ua)
        if(ua.indexOf("Trident\/7.0") >= 0 && ua.indexOf("WOW64") >= 0 && ua.indexOf("Mozilla\/5.0") >= 0) {
            // alert("ccccccccccc")
            return true;
        }   
        return false;
    }

    static escapeHtml(str){
        let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        // str = str.replace(/gif@/g,'gif?@');
        str = str.replace(/\.gif/g,'.gif??');
        str = str.replace(/padding-bottom:( ?)[0-9]+(.?)\d+%/g,"");
        str = str.replace(/max-width:(\s+)(\d+)px/g,"");
        return str
    }
    /**
     * yMdhmsw
     */
    static getTimeStr(type = "y",dots = [":"]){
        let time = new Date();
        let y = time.getFullYear();
        let M = time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth();
        let d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
        let h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
        let m = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        let s = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
        let weeks = "日一二三四五六";
        let w = "星期" + weeks[time.getDay()];
        let obj = {y,M,d,h,m,s,w};
        let str = "";
        let dot = "";
        let dlen = dots.length;
        let len = type.length;
        for(let i = 0;i < len;i++){
            let key = type[i];
            if(i < dlen){
                dot = dots[i];
            }
            else{
                dot = "";
            }
            str += obj[key] + dot;
        }
        return str;
    }

    static getObjectLength(object){
        let needlen = 0;
        if(!object || typeof object != "object") return needlen;
        for(let key in object){
            needlen++;
        }
        return needlen;
    }

    static getUrlParams(){
        let url = window.location.href;
        let arr = url.split("?");
        if(arr.length < 2) return {};
        let str = arr[1];
        let qarr = str.split("&");  
        let obj = {};
        for(let i = 0;i < qarr.length;i++){
            let qstr = qarr[i];
            let vls = qstr.split("=");
            if(vls.length == 2){
                let v = vls[1];
                obj[vls[0]] = v.split("#")[0];
            }
        }
        return obj;
    }

    static addAdverToPage(parent,adverId){
        let code = "";
        adverId = "u6531718";
        (window.slotbydup = window.slotbydup || []).push({
            id: "u6531718",
            container: parent,
            async: true
        });
    }
    /**曝光打点统计 */
    static upStatistics(url) {//url - 广告请求链接
        let img = new Image();//new Image实例
        let key = 'mediav_sio_log_' + Math.floor(Math.random() * 2147483648).toString(36);
        window[key] = img;
        img.onload = img.onerror = img.onabort = ()=>{//销毁相关实例
            img.onload = img.onerror = img.onabort = null;
            window[key] = null;
            img = null;
        };
        img.src = url;//利用image src加载url实现曝光统计
    }

    /**广告iframe上报 */
    static upToAdverByIframe(advers = []){
        if(!advers || advers.length == 0) return;
        let len = advers.length;
        let element = document.getElementById("common_other_container");
        element.innerHTML = "";
        let div = document.createElement("div");
        for(let i = 0;i < len;i++){
            let url = advers[i];
            if(url){
                let iframe = document.createElement("iframe");
                iframe.src = url;
                div.append(iframe);
            }
        }
        element.appendChild(div);
    }

    static changeAndExecuteJS(element){
        let sScript = element.getElementsByTagName("script")[0];
        if(!sScript) return;
        element.removeChild(sScript);
        let nScript = document.createElement("script");
        nScript.type = "text/javascript";
        nScript.innerHTML = sScript.innerHTML;
        element.appendChild(nScript);
    }
    /**判断是否进入可视区域 */
    static checkIsInViewport(ele){
        if(!ele || ele.style.display == "none") return false;
        let client = CompatibleUtils.getCompatibleValue();
        let viewPortHeight = client.clientHeight;
        let top = ele.getBoundingClientRect() && ele.getBoundingClientRect().top
        return top <= viewPortHeight
    }
    /**加密方法 */
    static encodeStr(s){
        if(!s) return "";
        console.log(new Date().getTime());
        let amd = "3254896710";
        let bmd = "cnYDSmVUhRoCZbfQvxaBWkgLATejlHpdKErIiuJNPMsXwqFGzyOt";
        let cmd = "0341728956";
        let xmd = "ꞬꞴꞰꞪꞖꞜꞡꞦꞶꞮ";
        let ymd = "Ὲᾈᾯίώὸὗὀἶἕ";
        let xl = xmd.length;
        let yl = ymd.length;
        let bl = bmd.length;
        let cl = cmd.length;
        let fmd = [];
        let sl = s.length;
        for(let i = 0;i < sl;i++){
            let ac = s.charCodeAt(i);
            let a = s.charAt(i);
            if(ac == 61){
                fmd.push(xmd.charAt(~~(xl*Math.random())));
            }
            else if(ac == 38){
                fmd.push(ymd.charAt(~~(yl*Math.random())))
            }
            else if(ac >= 65 && ac <= 122){
                let bi = bmd.indexOf(a);
                let c = ~~cmd.charAt(bi%cl);
                let p = ~~amd.charAt(c);
                let d = (bi + p)%bl;
                let e = 3 + (~~(6*Math.random()));
                fmd.push(`${bmd.charAt(d)}${e}${bi}`);
            }
            else{
                let n = ~~(3*Math.random());
                let r = ~~(10*Math.random())
                fmd.push(`${bmd.charAt(n + parseInt(a))}${n}${a}${r}`);
            }
        }
        let fs = fmd.join("");
        console.log(s);
        console.log(fs);
        console.log(new Date().getTime());
        console.log(this.decode(fs));
        console.log(new Date().getTime());
        return fs;
    }
    /**解密 */
    static decode(s){
        let xr = /(Ɡ|Ꞵ|Ʞ|Ɦ|Ꞗ|Ꞝ|ꞡ|Ꞧ|Ꞷ|Ɪ)/g;
        let yr = /(Ὲ|ᾈ|ᾯ|ί|ώ|ὸ|ὗ|ὀ|ἶ|ἕ)/g;
        let br = /(c|n|Y|D|S|m|V|U|h|R|o|C|Z|b|f|Q|v|x|a|B|W|k|g|L|A|T|e|j|l|H|p|d|K|E|r|I|i|u|J|N|P|M|s|X|w|q|F|G|z|y|O|t)/g;
        let bs = "cnYDSmVUhRoCZbfQvxaBWkgLATejlHpdKErIiuJNPMsXwqFGzyOt";
        let ba = bs.split("");
        let a = s.split(yr);
        let al = a.length;
        let parse = (d)=>{
            let kc = d.split(br);
            let kl = kc.length;
            let ks = "";
            for(let ki = 0;ki < kl;ki++){
                let kj = kc[ki];
                let kx = kj[0];
                if(kx >= 0){
                    if(kx > 2){
                        ks += kj.length == 2 ? ba[parseInt(kj[1])] : (kj.length == 3 ? ba[parseInt(kj[1] + "" + kj[2])] : "");
                    }
                    else{
                        ks += kj.length == 3 ? kj[1]:"";
                    }
                }
            }
            return ks;
        }
        let obj = {};
        for(let i = 0;i < al;i++){
            let b = a[i];
            let c = b.split(xr);
            if(c.length != 3) continue;
            let k = parse(c[0]);
            let v = parse(c[2]);
            if(!k || !v) continue;
            obj[k] = v;
        }
        return obj;
    }
    /**timer delay */
    static addDelay(func,context,delay = 1000,times = 1){
        if(!func) return;
        if(!Utils.delayFuns){
            Utils.delayFuns = [];
            window.requestAnimFrame(Utils.customUpdateFrame)
        }
        let curTime = new Date().getTime();
        let funs = Utils.delayFuns;
        let fo = {fc:func,tc:context,tn:times,cn:0}
        let ishave = false;
        for(let i = 0;i < funs.length;i++){
            let vo = funs[i];
            if(vo.d == delay){
                vo.fs.push(fo)
                ishave = true;
                break;
            }
        }
        if(ishave) return;
        funs.push({d:delay,c:curTime,fs:[fo]});
    }
    
    static removeDelay(delay,func,context = null){
        let funs = Utils.delayFuns;
        if(!funs || funs.length == 0) return;
        for(let i = 0;i < funs.length;i++){
            let vos = funs[i];
            if(vos.d == delay){
                let fs = vos.fs;
                for(let j = fs.length - 1;j >= 0;j--){
                    let f = fs[j];
                    if(f.fc == func){
                        if(!context || context == f.tc){
                            fs.splice(j,1);
                        }
                        break;
                    }
                }
                break;
            }
        }
    }

    static updateDelay(){
        let ds = Utils.delayFuns;
        if(!ds || ds.length <= 0) return;
        let n = new Date().getTime();
        for(let i = ds.length - 1;i >= 0;i--){
            let f = ds[i];
            if(n - f.c >= f.d){
                f.c = n;
                let fs = f.fs;
                for(let j = fs.length - 1;j >= 0;j--){
                    let s = fs[j];
                    s.cn++;
                    let b = s.tn && s.tn > 0 && s.cn >= s.tn;
                    b && fs.splice(j,1);
                    s.tc ? s.fc.call(s.tc,b):s.fc(b)
                }
                fs.length == 0 && ds.splice(i,1);
            }
        }
    }

    static customUpdateFrame(stamp){
        Utils.updateDelay();
        window.requestAnimFrame(Utils.customUpdateFrame)
    }

    /**rem方案 */
    static immediatelyAdaption(){
        let docEle = document.documentElement;
        let resizeEvt = "orientationchange" in window ? 'orientationchange' : 'resize';
        let recalculate = ()=>{
            let clientWid = docEle.clientWidth;
            if(!clientWid) return;
            clientWid = clientWid > 750 ? 750 : clientWid;
            docEle.style.fontSize = 100*clientWid/750 + "px";
        }
        if(!document.addEventListener) return;
        window.addEventListener(resizeEvt,recalculate,false);
        document.addEventListener("DOMContentLoaded",recalculate,false);
    }
    /**过滤广告 */
    static filterAdvList(array = [],regions){
        let isfilter = this.isLimitRegion(regions);
        if(!isfilter || array.length == 0) return array;
        let results = [];
        for(let i = 0;i < array.length;i++){
            if(array[i].type != 2){
                results.push(array[i]);
            }
        }
        return results;
    }

    static getRegion(){
        let region = localStorage.getItem("fjqs_region_cache");
        return region;
    }
    static setRegion(name){
        if(name && name.search("市") >= 0){
            name = name.split("市")[0];
        }
        if(name && name.search("自治区") >= 0){
            name = name.split("自治区")[0];
        }        
        localStorage.setItem("fjqs_region_cache",name);
    }

    static isOnlyRegion(regions){
        let mode = process.env.BUILD_MODE;
        let ischeck = mode == 3 || mode == 7;
        if(!ischeck) return;
        ischeck = false;
        let region = this.getRegion();
        if(regions && region){
            ischeck = regions.search(region) >= 0;
        }
        return ischeck;
    }

    static isLimitRegion(regions){
        let mode = process.env.BUILD_MODE;
        let ischeck = mode == 3 || mode == 7;
        if(!ischeck) return;
        ischeck = false;
        let region = this.getRegion();
        if(regions && region){
            ischeck = regions.search(region) >= 0;
        }
        return ischeck;
    }

}