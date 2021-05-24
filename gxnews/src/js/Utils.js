export default class Utils {
    constructor(){}

    static PositionType = {
        POSITION_MAIN:"main",
        POSITION_SIDE:"side",
        POSITION_HEADER:"header",
        POSITION_FOOTER:"footer",
        POSITION_MIDDLE:"middle",
        POSITION_BOTTOM:"bottom"
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

    static addAdverToPage(parent,adverId){
        let code = "";
        adverId = "u6531718";
        (window.slotbydup = window.slotbydup || []).push({
            id: "u6531718",
            container: parent,
            async: true
        });
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
    static addDelay(delay,func,context,times){
        if(!Utils.delayFuns){
            Utils.delayFuns = [];
            Utils.delayIntervalId = setInterval(() => {
                let funs = Utils.delayFuns;
                if(!funs || funs.length == 0) return;
                let len = funs.length;
                let now = new Date().getTime();
                for(let i = len - 1;i >= 0;i--){
                    let fobj = funs[i];
                    if(now - fobj.curTime >= delay){
                        fobj.curTime = now;
                        if(!fobj.func){
                            funs.splice(i,1);
                        }
                        else{
                            if(fobj.context){
                                fobj.func.call(fobj.context);
                            }
                            else{
                                fobj.func();
                            }
                            if(fobj.times && fobj.times > 0){
                                fobj.count++;
                                if(fobj.count >= fobj.times){
                                    funs.splice(i,1);
                                }
                            }
                        }
                    }
                }
            }, 100);
        }
        let curTime = new Date().getTime();
        Utils.delayFuns.push({curTime,delay,func,context,times,count:0});
    }

}