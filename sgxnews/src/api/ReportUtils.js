// 360上报
class ReportUtils {
    constructor(){
        this.ImageDic = {};
    }

    static instance(){
        if(this._inst == null){
            this._inst = new ReportUtils();
        }
        return this._inst;
    }

    isArray(){
        return "[object Array]" == Object.prototype.toString.call(a);
    }

    log(url){
        let img = new Image()
        let key = 'mediav_sio_log_' + Math.floor(Math.random() * 2147483648).toString(36);
        this.ImageDic[key] = img;
        img.onload = img.onerror = img.onabort = function () {
            img.onload = img.onerror = img.onabort = null;
            this.ImageDic[key] = null;
            img = null;
        };
        img.src = url;
    }
    /**
     * @function
     * @description 曝光监测
     * @param {object} container - 包含data-imptk的dom
     * */
    trackImptk(adv){
        if(!adv) return;
        let imptk = adv.imptk || [];
        if (imptk){
            imptk = this.isArray(imptk) ? imptk : imptk.split(',');
            for (let i = 0; i < imptk.length; i++) {
                this.log(imptk[i]);
            }
        }
    }
    /**
     * @function
     * @description 点击监测发送
     * @param {object} container - 包含data-clktk的dom
     * */
    trackClick(adv){
        let clktk = adv.clktk;
        try {
            clktk = JSON.parse(container.getAttribute('data-clktk'));
        } catch (e) {
            clktk = container && container.getAttribute('data-clktk') || [];
        }
        if (clktk) {
            clktk = this.isArray(clktk) ? clktk : clktk.split(',');
            for (var i = 0; i < clktk.length; i++) {
                this.log(clktk[i]);
            }
        }
    }
}

export default ReportUtils.instance()