import axios from './request'
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
    /**加载广告 */
    addAdsByClassName(classname,force = false){
        if(!classname) return;
        let elements = document.getElementsByClassName(classname);
        if(!elements || elements.length == 0) return;
        let len = elements.length;
        for(let i = 0;i < len;i++){
            let element = elements[i];
            if(!element.isAdLoaded || force){
                let sScript = element.getElementsByTagName("script")[0];
                if(!sScript) continue;
                element.removeChild(sScript);
                let nScript = document.createElement("script");
                nScript.type = "text/javascript";
                nScript.innerHTML = sScript.innerHTML;
                element.appendChild(nScript);
                element.isAdLoaded = true;
            }
        }
    }
    /**新闻列表 */
    getNewsList(){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"cateId":1,"cateName":"\u63a8\u8350"},{"cateId":3,"cateName":"\u793e\u4f1a"},{"cateId":4,"cateName":"\u5a31\u4e50"},{"cateId":5,"cateName":"\u56fd\u9645"},{"cateId":6,"cateName":"\u519b\u4e8b"},{"cateId":7,"cateName":"\u8d22\u7ecf"},{"cateId":8,"cateName":"\u4f53\u80b2"},{"cateId":9,"cateName":"\u517b\u751f"},{"cateId":10,"cateName":"\u7b11\u8bdd"},{"cateId":11,"cateName":"\u6c7d\u8f66"}]}
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        return this.axios.get("/v1/news/cate").then(res=>res.data)
    }
    /**分类下资讯列表 */
    getNewsListById(idx,page = 1){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"id":29414,"type":1,"title":"\u8b66\u65b9\u901a\u62a5\u7537\u5b50\u88ab\u8d27\u8f66\u8d27\u7269\u524a\u5934\uff1a\u4eba\u65e0\u5927\u788d\uff01","pics":["\/\/k-static.xsfaya.com\/uploads\/junshi-pic\/202105\/09\/1620553042_66741800.jpg"],"click":0,"cateId":1,"time":"2021\/05\/09","from":"\u7ea2\u7f51"},{"id":29415,"type":1,"title":"\u4f4e\u5934\u65cf\u201d\u8981\u8b66\u60d5\uff01\u91cd\u5e86\u7537\u5b50\u8d70\u8def\u770b\u624b\u673a\u5760\u6865\u6eba\u4ea1","pics":["\/\/k-static.xsfaya.com\/uploads\/junshi-pic\/202105\/09\/1620552406_64963000.jpg"],"click":0,"cateId":1,"time":"2021\/05\/09","from":"\u5317\u665a\u65b0\u89c6\u89c9\u7f51"},{"id":29430,"type":2,"title":"<div class=\"_nxesvse7q3\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6531718\",\r\n        container: \"_nxesvse7q3\",\r\n        async: true\r\n    });\r\n<\/script><div class=\"_ddjnyucn9y\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532355\",\r\n        container: \"_ddjnyucn9y\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":29430,"type":1,"title":"\u4e09\u8f6e\u8f66\u95ef\u7ea2\u706f\u649e\u5012\u5b66\u751f\u9003\u9038 \u70ed\u5fc3\u5e02\u6c11\u9a7e\u8f66\u5c06\u5176\u62e6\u505c","pics":["\/\/k-static.xsfaya.com\/uploads\/junshi-pic\/202105\/09\/1620552642_24302900.jpg"],"click":0,"cateId":1,"time":"2021\/05\/09","from":"\u5927\u4f17\u7f51"},{"id":29431,"type":1,"title":"\u5982\u6b64\u6551\u6c34\u8352\uff1f\u53f0\u5357\u6c11\u4f17\u6302\u6a2a\u5e45\u53f7\u53ec\uff1a\u5c0f\u4fbf\u4e0d\u51b2\u6c34","pics":["\/\/k-static.xsfaya.com\/uploads\/junshi-pic\/202105\/09\/1620550838_37218100.jpg"],"click":0,"cateId":1,"time":"2021\/05\/09","from":"\u6d77\u5916\u7f51"},{"id":29432,"type":2,"title":"<div class=\"_nxesvse7q3\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6531718\",\r\n        container: \"_nxesvse7q3\",\r\n        async: true\r\n    });\r\n<\/script><div class=\"_ddjnyucn9y\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532355\",\r\n        container: \"_ddjnyucn9y\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":29432,"type":1,"title":"\u94f6\u884c\u5b9a\u671f\u5b58\u6b3e\uff0c\u662f\u76f4\u63a5\u5b58\u4e09\u5e74\u8fd8\u662f\u5b58\u4e00\u5e74\u5230\u671f\u518d\u7eed\uff1f\u770b\u5b8c\u7ec8\u4e8e\u660e\u767d\u4e86","pics":["\/\/k-static.xsfaya.com\/uploads\/junshi-pic\/handcovercj\/202105\/08\/1620476431_92716800.jpg"],"click":0,"cateId":1,"time":"2021\/05\/09","from":"\u5343\u4fe1\u9f50\u98de"}]};
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        let ext = "/v1/news/list?cateid="+idx + "&page=" + page;
        return this.axios.get(ext).then(res=>res.data)
    }
    /**新闻详情 */
    getNewsDetailById(idx){
        if(isLocalTest){
            let data = {
                "status": "success", 
                "code": 200, 
                "data": {
                    "id": 20069, 
                    "category_id": 1, 
                    "article_id": 1136943, 
                    "title": "俄“喀山”号核潜艇将于5月7日服役，已经拖延两年", 
                    "keywords": "喀山,白蜡树,核潜艇", 
                    "description": "", 
                    "content": "<div id=\"main-content\" class=\"content\"><p>【环球网军事报道】俄罗斯卫星新闻通讯社5月6日报道，俄罗斯国防部信息和大众传播司表示，\"喀山\"号885M型（\"白蜡树-M\"级）多用途核潜艇将于5月7日入列俄罗斯海军。</p><p>俄国防部在消息中称，\"白蜡树-M\"级的\"喀山\"号导弹核潜艇的入列海军仪式将于5月7日在俄罗斯海军总司令尼古拉·叶夫梅诺夫海军上将的主持下举行。</p><p><em class=\"pic-con\"><img itemprop=\"image\" data-alt=\"885M型核潜艇\" src=\"//k-static.xsfaya.com/uploads/allimg/210506/11002031Y-0.jpg\" /><script>article.mmbox.load();</script></em></p><p>据悉，入列仪式将在建造潜艇的北德文斯克的北方机械制造厂举行。仪式上还将宣读海军总司令下达的潜艇入列海军的命令。\"喀山\"号成功通过测试的认证已经得到批准。</p><p>报道称，这艘潜艇原本应该在2019年交付给舰队，但是对改进型\"白蜡树\"级项目的测试拖延了交期，\"喀山\"号核潜艇的交付先是被推迟到了2020年，后又被推迟到2021年。</p><p>俄罗斯的舰队中现有一艘\"北德文斯克\"号核潜艇，该潜艇是按照类似但未改进的885型\"白蜡树\"级项目建造的。</p></div>@@@www@@@www@@@<div><p>hello world1</p></div>@@@www@@@www@@@<div><p>hello world2</p></div>@@@www@@@www@@@<div><p>hello world3</p></div>@@@www@@@www@@@<div><p>hello world end</p></div>", 
                    "click": 0, 
                    "thumb": "//k-static.xsfaya.com/uploads/allimg/210506/11002031Y-0-lp.jpg", 
                    "source_from": "环球网", 
                    "source_time": "2021/05/06", 
                    "data_source": "热点新闻_看看头条_中华网", 
                    "created_at": "2021-05-06 11:30:02", 
                    "updated_at": "2021-05-06 11:31:02"
                }
            }
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        let ext = "v1/news/detail?id=" + idx
        return this.axios.get(ext).then(res=>res.data)
    }
    /**24小时热销 */
    get24HoursNews(){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"id":25706,"type":1,"title":"\u641e\u7b11GIF\u8da3\u56fe:\u65b0\u5a18\u5b50\uff0c\u5927\u559c\u7684\u65e5\u5b50\uff0c\u8fd8\u8981\u81ea\u5df1\u5f00\u8f66\u53bb\u65b0\u5bb6\u5417","pics":["\/\/k-static.xsfaya.com\/uploads\/ext\/a\/dmfd\/160_100_\/t01e9bb5962f41e88c2.jpg"],"click":0,"cateId":10,"time":"2021-05-09 00:00:00","from":"\u7b11\u661f\u574a"},{"id":24,"type":1,"title":"\u5982\u679c\u4f17\u4eba\u90fd\u6ca1\u6709\u7ec3\u4e5d\u9634\u771f\u7ecf\uff0c\u534e\u5c71\u4e8c\u8bba\u56db\u7edd\u4e2d\u8c01\u6700\u5403\u4e8f","pics":["https:\/\/publish-pic-cpu.baidu.com\/5d425c4a-bffc-4491-8ce9-dd09e01b08e1.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/0be5f2f9-98c3-467b-8aa1-78eff1273b1e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/6ca1447d-83d5-4aa8-9d5b-37df207113a9.jpeg@w_228,h_152"],"click":0,"cateId":10,"time":"2021-02-21 09:00:26","from":"\u5929\u5929\u4e00\u53f6\u4e66"},{"id":4,"type":2,"title":"<div class=\"_42ux8lnjdye\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532356\",\r\n        container: \"_42ux8lnjdye\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":4,"type":1,"title":"\u539f\u6765\u5979\u5df2\u79bb\u4e16\uff0c\u5979\u539f\u4e3a\u6211\u56fd\u4e00\u7ea7\u64ad\u97f3\u5458\uff0c\u540d\u5634\u767d\u5ca9\u677e\u60cb\u60dc\u60bc\u5ff5","pics":["https:\/\/publish-pic-cpu.baidu.com\/c29a358c-2cdd-499f-97be-5276df08c06e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/9415acf0-542b-426d-b22c-c26bf427c761.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/8bf3b9be-b847-468f-ac9c-56eec9602ddf.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021-02-19 09:50:22","from":"\u519c\u592b\u751f\u6d3b"}]};
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        return this.axios.get("/v1/news/index").then(res=>res.data)
    }
    /**滚动新闻 */
    getTimeNewsList(){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"id":2,"title":"\u201c\u719f\u86cb\u8fd4\u751f\u5b75\u5c0f\u9e21\u201d\u8bba\u6587\u4f5c\u8005\u75db\u54ed","url":"http:\/\/news.dtxww.cn\/#\/content?id=7782"}]}
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        return this.axios.get("v1/news/fast").then(res=>res.data)
    }
    /**详情页左侧热点、 小编推荐、视角*/
    getDetailLeftNews(){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"name":"\u89c6\u89d2","list":[{"id":24,"type":1,"title":"\u5982\u679c\u4f17\u4eba\u90fd\u6ca1\u6709\u7ec3\u4e5d\u9634\u771f\u7ecf\uff0c\u534e\u5c71\u4e8c\u8bba\u56db\u7edd\u4e2d\u8c01\u6700\u5403\u4e8f","pics":["https:\/\/publish-pic-cpu.baidu.com\/5d425c4a-bffc-4491-8ce9-dd09e01b08e1.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/0be5f2f9-98c3-467b-8aa1-78eff1273b1e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/6ca1447d-83d5-4aa8-9d5b-37df207113a9.jpeg@w_228,h_152"],"click":0,"cateId":10,"time":"2021\/02\/21","from":"\u5929\u5929\u4e00\u53f6\u4e66"},{"id":6,"type":1,"title":"58\u5c81\u5f20\u51ef\u4e3d\u4e08\u592b\u66dd\u5149\uff0c\u539f\u6765\u662f\u6211\u4eec\u719f\u6089\u7684\u4ed6\uff1f\u602a\u4e0d\u5f97\u4e00\u76f4\u4e0d\u613f\u516c\u5f00","pics":["https:\/\/publish-pic-cpu.baidu.com\/2c0e70a6-4880-4153-b149-ff75414253b9.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/da78df18-6fae-4996-b596-00f75a882f7e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/ce09d7b2-6f8e-4adc-bd27-f3bde788746b.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/20","from":"\u8a00\u5802"},{"id":9,"type":2,"title":"<div class=\"_su6suwkmj5\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532623\",\r\n        container: \"_su6suwkmj5\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":9,"type":1,"title":"\u5728\u6218\u4e89\u5f53\u4e2d\uff0c\u4e3a\u4f55\u6ca1\u6709\u4eba\u62ff\u6389\u843d\u7684\u67aa\u652f\u4f7f\u7528\uff1f\u770b\u5b8c\u624d\u77e5\u6709\u591a\u53ef\u6015","pics":["https:\/\/publish-pic-cpu.baidu.com\/f1b03890-acd9-4345-8afb-683a79023d43.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/f226bc6e-9a2b-4093-bf17-69788249c152.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/b2174552-c82e-403f-bede-8b0ec211032d.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/14","from":"\u8981\u585e\u9635\u5730"},{"id":10,"type":1,"title":"\u6211\u8001\u5a46\u51fa\u5dee\u53bb\u4e86\uff0c\u7ed9\u6211\u62cd\u4e86\u4e2a\u7167\u7247\uff0c\u611f\u89c9\u81ea\u5df1\u88ab\u7eff\u4e86\u54c8\u54c8","pics":["https:\/\/publish-pic-cpu.baidu.com\/46133060-56ae-48ac-945a-269cc09aadab.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/6a0d2459-3018-4e31-bc9f-3cfc89bb5157.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/1ed9f2c6-024b-4085-a2bb-38eacbd8575a.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/01\/24","from":"\u9965\u997fDyle\u5c0f\u78e8\u783a"}]},{"name":"\u5c0f\u7f16\u7cbe\u9009","list":[{"id":1,"type":1,"title":"\u59d1\u5a18\uff0c\u9ad8\u94c1\u4e0a\u7a7f\u77ed\u88d9\u7761\u89c9\u4e00\u5b9a\u8981\u6ce8\u610f\u7761\u59ff\u554a\uff0c\u65c1\u8fb9\u7684\u4e58\u5ba2\u90fd\u8138\u7ea2\u4e86","pics":["https:\/\/publish-pic-cpu.baidu.com\/4d3c021d-e088-40e0-8b0e-3cf35a45f517.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/d72e3d37-57d3-4840-82eb-c0e107fe713d.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/e6965538-914a-4fee-837c-f11e81f2d5cd.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2020\/12\/04","from":"\u7f57\u777f\u7bee\u7403"},{"id":7,"type":1,"title":"\u6bcf\u65e5\u4e00\u7b11\uff1a\u5927\u53d4\u4f60\u968f\u4fbf\u5750\u5427\uff0c\u5c31\u51ed\u4f60\u8fd9\u88c5\u5907\u6ca1\u4eba\u6562\u548c\u4f60\u62a2\u4f4d\u7f6e","pics":["https:\/\/publish-pic-cpu.baidu.com\/09244c7e-97a7-4b6f-af42-cec0fca45ca0.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/e8c96f96-100c-41b7-8590-52924e79b8ee.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/54d789ff-2e13-46dd-9b42-85e32175f583.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/16","from":"\u641e\u7b11\u4e00\u7b50\u7b50"},{"id":8,"type":2,"title":"<div class=\"_su6suwkmj5\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532623\",\r\n        container: \"_su6suwkmj5\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":8,"type":1,"title":"\u51fa\u95e8\u5e2630\u4e2a\u4fdd\u95566\u4e2a\u52a9\u7406\uff0c\u88ab\u592e\u89c6\u70b9\u540d\u540e\uff0c\u5979\u4f9d\u7136\u201c\u5c61\u6559\u4e0d\u6539\u201d","pics":["https:\/\/publish-pic-cpu.baidu.com\/3010948f-10ce-453d-8bb8-060edcd7d47a.png@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/14135315-c093-4489-bc7d-157443a7d1dd.png@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/5232c90e-7981-4263-b504-b543b16aec9a.png@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/20","from":"\u6765\u65f6\u65e0\u58f0\u65e0\u606f"}]},{"name":"\u4eca\u65e5\u70ed\u70b9","list":[{"id":25706,"type":1,"title":"\u641e\u7b11GIF\u8da3\u56fe:\u65b0\u5a18\u5b50\uff0c\u5927\u559c\u7684\u65e5\u5b50\uff0c\u8fd8\u8981\u81ea\u5df1\u5f00\u8f66\u53bb\u65b0\u5bb6\u5417","pics":["\/\/k-static.xsfaya.com\/uploads\/ext\/a\/dmfd\/160_100_\/t01e9bb5962f41e88c2.jpg"],"click":0,"cateId":10,"time":"2021\/05\/09","from":"\u7b11\u661f\u574a"},{"id":27,"type":1,"title":"\u201c\u60f3\u73a9\u82f1\u96c4\u201d\u653e\u7f6e\u8fd9\u51e0\u4e2a\u82f1\u96c4\uff0c\u7edd\u5bf9\u8ba9\u961f\u53cb\u5f53\u573a\u5fc3\u51c9\uff01","pics":["https:\/\/publish-pic-cpu.baidu.com\/bbcc67dc-5728-47b2-bf3b-ba7997a0b46e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/6699504d-f858-40b2-a1c6-a72720f6978e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/d2899830-c4c2-467f-925c-581efc41362d.jpeg@w_228,h_152"],"click":0,"cateId":10,"time":"2021\/02\/15","from":"\u6e38\u620f\u8881\u4eba"},{"id":2,"type":2,"title":"<div class=\"_su6suwkmj5\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532623\",\r\n        container: \"_su6suwkmj5\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":2,"type":1,"title":"\u7236\u4eb2\u762b\u75ea\u6bcd\u4eb2\u667a\u969c\uff0c16\u5c81\u7a77\u95ef\u5317\u4eac\uff0c23\u5c81\u7206\u7ea2\u6625\u665a\uff0c\u4eca\u6210\u4e0a\u4ebf\u5973\u5bcc\u5a46","pics":["https:\/\/publish-pic-cpu.baidu.com\/19a61864-95c4-4f37-9e9e-3077b6059ac6.png@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/51dd2c85-c6f7-4101-b1ce-5a26cda5928d.png@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/06f00931-f91f-4461-ba0d-195bc64ebbeb.png@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/21","from":"\u8d35\u5708\u5c0f\u5a31\u4eba"},{"id":4,"type":1,"title":"\u539f\u6765\u5979\u5df2\u79bb\u4e16\uff0c\u5979\u539f\u4e3a\u6211\u56fd\u4e00\u7ea7\u64ad\u97f3\u5458\uff0c\u540d\u5634\u767d\u5ca9\u677e\u60cb\u60dc\u60bc\u5ff5","pics":["https:\/\/publish-pic-cpu.baidu.com\/c29a358c-2cdd-499f-97be-5276df08c06e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/9415acf0-542b-426d-b22c-c26bf427c761.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/8bf3b9be-b847-468f-ac9c-56eec9602ddf.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/19","from":"\u519c\u592b\u751f\u6d3b"},{"id":5,"type":2,"title":"<div class=\"_su6suwkmj5\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532623\",\r\n        container: \"_su6suwkmj5\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":5,"type":1,"title":"\u641e\u7b11\u804a\u5929\u8bb0\u5f55\uff1a\u4e08\u592b\uff1a\u6211\u8eab\u4f53\u8d8a\u6765\u8d8a\u5dee\u4e86\uff0c\u59bb\u5b50\u7684\u53cd\u5e94\u8ba9\u4eba\u7b11\u7ffb\u5929\uff01","pics":["https:\/\/publish-pic-cpu.baidu.com\/19d4ee78-a49d-4201-ba2f-8bf677534dd2.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/69d1c1d0-cb61-4978-bbdb-8f373aaadc4c.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/4bf95418-a5a1-4925-9ddc-701aca1df358.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/16","from":"\u821c\u8da3\u95fb"},{"id":18,"type":1,"title":"\u6211\u6000\u5ff5\u90a3\u4e9b\u5e74\uff0c\u8fc7\u5e74\u7684\u5473\u9053\u4e86\uff01","pics":["https:\/\/publish-pic-cpu.baidu.com\/1b2caf43-7fcc-410c-ad54-a0ca484f5f94.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/6f6258d2-3a14-482f-b049-a3cee56a6a87.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/11bc76e4-b30c-457f-88bc-1cd1e3cb87f3.jpeg@w_228,h_152"],"click":0,"cateId":7,"time":"2021\/02\/14","from":"\u68a6\u5706\u7684\u91d1\u7a9d"}]}]}
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        return this.axios.get("/v1/news/hot").then(res=>res.data)
    }
    /**详情页底部推荐*/
    getDetailDownNews(){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"id":27,"type":1,"title":"\u201c\u60f3\u73a9\u82f1\u96c4\u201d\u653e\u7f6e\u8fd9\u51e0\u4e2a\u82f1\u96c4\uff0c\u7edd\u5bf9\u8ba9\u961f\u53cb\u5f53\u573a\u5fc3\u51c9\uff01","pics":["https:\/\/publish-pic-cpu.baidu.com\/bbcc67dc-5728-47b2-bf3b-ba7997a0b46e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/6699504d-f858-40b2-a1c6-a72720f6978e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/d2899830-c4c2-467f-925c-581efc41362d.jpeg@w_228,h_152"],"click":0,"cateId":10,"time":"2021-02-15 21:24:52","from":"\u6e38\u620f\u8881\u4eba"},{"id":2,"type":1,"title":"\u7236\u4eb2\u762b\u75ea\u6bcd\u4eb2\u667a\u969c\uff0c16\u5c81\u7a77\u95ef\u5317\u4eac\uff0c23\u5c81\u7206\u7ea2\u6625\u665a\uff0c\u4eca\u6210\u4e0a\u4ebf\u5973\u5bcc\u5a46","pics":["https:\/\/publish-pic-cpu.baidu.com\/19a61864-95c4-4f37-9e9e-3077b6059ac6.png@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/51dd2c85-c6f7-4101-b1ce-5a26cda5928d.png@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/06f00931-f91f-4461-ba0d-195bc64ebbeb.png@w_228,h_152"],"click":0,"cateId":1,"time":"2021-02-21 09:38:39","from":"\u8d35\u5708\u5c0f\u5a31\u4eba"},{"id":3,"type":2,"title":"<div class=\"_71rmkiey94a\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532639\",\r\n        container: \"_71rmkiey94a\",\r\n        async: true\r\n    });\r\n<\/script><div class=\"_ftvrdvhu9mf\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532636\",\r\n        container: \"_ftvrdvhu9mf\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":3,"type":1,"title":"\u8a93\u6b7b\u634d\u536b\u56fd\u571f 4\u540d\u89e3\u653e\u519b\u727a\u7272 \u56fd\u9632\u90e8\u3001\u5916\u4ea4\u90e8\u53d1\u58f0\uff1a\u82f1\u96c4\u4e0d\u80fd\u9057\u5fd8","pics":[""],"click":0,"cateId":1,"time":"2021-02-21 10:15:02","from":"NULL"},{"id":5,"type":1,"title":"\u641e\u7b11\u804a\u5929\u8bb0\u5f55\uff1a\u4e08\u592b\uff1a\u6211\u8eab\u4f53\u8d8a\u6765\u8d8a\u5dee\u4e86\uff0c\u59bb\u5b50\u7684\u53cd\u5e94\u8ba9\u4eba\u7b11\u7ffb\u5929\uff01","pics":["https:\/\/publish-pic-cpu.baidu.com\/19d4ee78-a49d-4201-ba2f-8bf677534dd2.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/69d1c1d0-cb61-4978-bbdb-8f373aaadc4c.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/4bf95418-a5a1-4925-9ddc-701aca1df358.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021-02-16 10:51:47","from":"\u821c\u8da3\u95fb"},{"id":9,"type":2,"title":"<div class=\"_71rmkiey94a\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532639\",\r\n        container: \"_71rmkiey94a\",\r\n        async: true\r\n    });\r\n<\/script><div class=\"_ftvrdvhu9mf\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6532636\",\r\n        container: \"_ftvrdvhu9mf\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":9,"type":1,"title":"\u5728\u6218\u4e89\u5f53\u4e2d\uff0c\u4e3a\u4f55\u6ca1\u6709\u4eba\u62ff\u6389\u843d\u7684\u67aa\u652f\u4f7f\u7528\uff1f\u770b\u5b8c\u624d\u77e5\u6709\u591a\u53ef\u6015","pics":["https:\/\/publish-pic-cpu.baidu.com\/f1b03890-acd9-4345-8afb-683a79023d43.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/f226bc6e-9a2b-4093-bf17-69788249c152.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/b2174552-c82e-403f-bede-8b0ec211032d.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021-02-14 13:27:14","from":"\u8981\u585e\u9635\u5730"}]}
            return new Promise((resolve,reject)=>{resolve(data)})
        }
        return this.axios.get("/v1/news/rec").then(res=>res.data)
    }
    /**广告位信息*/
    getAdverInfo(type){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"id":2,"ad_title":"\u6d4b\u8bd5\u5e7f\u544a\u4f4d1","ad_script":"<div class=\"_nxesvse7q3\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6531718\",\r\n        container: \"_nxesvse7q3\",\r\n        async: true\r\n    });\r\n<\/script>"}]};
            return new Promise((resolve,reject)=>{
                resolve(data);
            });
        }
        let ext = "v1/adv/index?type=" + type;
        return this.axios.get(ext).then(res=>{
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
    getMiniList(idx){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"id":446337,"type":2,"title":"<div class=\"_saz02we328\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6547830\",\r\n        container: \"_saz02we328\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":446337,"type":1,"title":"\u52a9\u529b\u78b3\u8fbe\u5cf0\u3001\u78b3\u4e2d\u548c \u7eff\u8272\u79df\u8d41\u524d\u666f\u51e0\u4f55\uff1f","pics":["\/\/k-static.xsfaya.com\/uploads\/junshi-pic\/202105\/24\/1621838059_55807200.jpg"],"click":0,"cateId":1,"time":"2021\/05\/24","from":"\u7ecf\u6d4e\u53c2\u8003\u62a5"},{"id":446336,"type":2,"title":"<div class=\"_saz02we328\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6547830\",\r\n        container: \"_saz02we328\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":446336,"type":1,"title":"\u5973\u5b50\u63d2\u8db3\u522b\u4eba\u7684\u5a5a\u59fb\uff01\u8fd8\u4f2a\u88c5\u6210\u533b\u751f\u6df7\u8fdb\u75c5\u623f\u5bf9\u60c5\u654c\u6ce8\u5c04\u836f\u7269","pics":["\/\/k-static.xsfaya.com\/uploads\/allimg\/210524\/1446421424-0-lp.jpg"],"click":0,"cateId":1,"time":"2021\/05\/24","from":"\u534a\u5c9b\u6668\u62a5"},{"id":446335,"type":2,"title":"<div class=\"_saz02we328\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6547830\",\r\n        container: \"_saz02we328\",\r\n        async: true\r\n    });\r\n<\/script>"},{"id":446335,"type":1,"title":"\u53a6\u95e8\u8fde\u7eed2\u65e5\u65b0\u589e\u53f0\u6e7e\u5730\u533a\u8f93\u5165\u75c5\u4f8b","pics":["\/\/k-static.xsfaya.com\/utuku\/imgcdc\/160x0\/news\/20210524\/345b988d-823e-46ad-a40a-34b657989c5c.jpg"],"click":0,"cateId":1,"time":"2021\/05\/24","from":"\u89c2\u5bdf\u8005\u7f51"},{"id":446328,"type":2,"title":"<div class=\"_saz02we328\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6547830\",\r\n        container: \"_saz02we328\",\r\n        async: true\r\n    });\r\n<\/script>"}]}
            return new Promise((resolve,reject)=>{
                resolve(data)
            })
        }
        let ext = "v1/news/minimain?cateid=" + idx
        return this.axios.get(ext).then(res=>res.data)
    }
    /**mini页右侧list */
    getMiniRightList(){
        if(isLocalTest){
            let data = {"status":"success","code":200,"data":[{"name":"adv_list_3","list":[]},{"name":"adv_list_1","list":[{"id":25706,"type":1,"title":"\u641e\u7b11GIF\u8da3\u56fe:\u65b0\u5a18\u5b50\uff0c\u5927\u559c\u7684\u65e5\u5b50\uff0c\u8fd8\u8981\u81ea\u5df1\u5f00\u8f66\u53bb\u65b0\u5bb6\u5417","pics":["\/\/k-static.xsfaya.com\/uploads\/ext\/a\/dmfd\/160_100_\/t01e9bb5962f41e88c2.jpg"],"click":1,"cateId":10,"time":"2021\/05\/09","from":"\u7b11\u661f\u574a"},{"id":27,"type":1,"title":"\u201c\u60f3\u73a9\u82f1\u96c4\u201d\u653e\u7f6e\u8fd9\u51e0\u4e2a\u82f1\u96c4\uff0c\u7edd\u5bf9\u8ba9\u961f\u53cb\u5f53\u573a\u5fc3\u51c9\uff01","pics":["https:\/\/publish-pic-cpu.baidu.com\/bbcc67dc-5728-47b2-bf3b-ba7997a0b46e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/6699504d-f858-40b2-a1c6-a72720f6978e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/d2899830-c4c2-467f-925c-581efc41362d.jpeg@w_228,h_152"],"click":0,"cateId":10,"time":"2021\/02\/15","from":"\u6e38\u620f\u8881\u4eba"},{"id":2,"type":1,"title":"\u7236\u4eb2\u762b\u75ea\u6bcd\u4eb2\u667a\u969c\uff0c16\u5c81\u7a77\u95ef\u5317\u4eac\uff0c23\u5c81\u7206\u7ea2\u6625\u665a\uff0c\u4eca\u6210\u4e0a\u4ebf\u5973\u5bcc\u5a46","pics":["https:\/\/publish-pic-cpu.baidu.com\/19a61864-95c4-4f37-9e9e-3077b6059ac6.png@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/51dd2c85-c6f7-4101-b1ce-5a26cda5928d.png@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/06f00931-f91f-4461-ba0d-195bc64ebbeb.png@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/21","from":"\u8d35\u5708\u5c0f\u5a31\u4eba"},{"id":4,"type":1,"title":"\u539f\u6765\u5979\u5df2\u79bb\u4e16\uff0c\u5979\u539f\u4e3a\u6211\u56fd\u4e00\u7ea7\u64ad\u97f3\u5458\uff0c\u540d\u5634\u767d\u5ca9\u677e\u60cb\u60dc\u60bc\u5ff5","pics":["https:\/\/publish-pic-cpu.baidu.com\/c29a358c-2cdd-499f-97be-5276df08c06e.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/9415acf0-542b-426d-b22c-c26bf427c761.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/8bf3b9be-b847-468f-ac9c-56eec9602ddf.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/19","from":"\u519c\u592b\u751f\u6d3b"},{"id":5,"type":1,"title":"\u641e\u7b11\u804a\u5929\u8bb0\u5f55\uff1a\u4e08\u592b\uff1a\u6211\u8eab\u4f53\u8d8a\u6765\u8d8a\u5dee\u4e86\uff0c\u59bb\u5b50\u7684\u53cd\u5e94\u8ba9\u4eba\u7b11\u7ffb\u5929\uff01","pics":["https:\/\/publish-pic-cpu.baidu.com\/19d4ee78-a49d-4201-ba2f-8bf677534dd2.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/69d1c1d0-cb61-4978-bbdb-8f373aaadc4c.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/4bf95418-a5a1-4925-9ddc-701aca1df358.jpeg@w_228,h_152"],"click":0,"cateId":1,"time":"2021\/02\/16","from":"\u821c\u8da3\u95fb"},{"id":18,"type":1,"title":"\u6211\u6000\u5ff5\u90a3\u4e9b\u5e74\uff0c\u8fc7\u5e74\u7684\u5473\u9053\u4e86\uff01","pics":["https:\/\/publish-pic-cpu.baidu.com\/1b2caf43-7fcc-410c-ad54-a0ca484f5f94.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/6f6258d2-3a14-482f-b049-a3cee56a6a87.jpeg@w_228,h_152","https:\/\/publish-pic-cpu.baidu.com\/11bc76e4-b30c-457f-88bc-1cd1e3cb87f3.jpeg@w_228,h_152"],"click":0,"cateId":7,"time":"2021\/02\/14","from":"\u68a6\u5706\u7684\u91d1\u7a9d"}]},{"name":"adv_list_2","list":"<div class=\"_co6ct51hhki\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6547831\",\r\n        container: \"_co6ct51hhki\",\r\n        async: true\r\n    });\r\n<\/script>"},{"name":"adv_list_4","list":"<div class=\"_co6ct51hhki\"><\/div>\r\n<script type=\"text\/javascript\">\r\n    (window.slotbydup = window.slotbydup || []).push({\r\n        id: \"u6547831\",\r\n        container: \"_co6ct51hhki\",\r\n        async: true\r\n    });\r\n<\/script>"}]}
            return new Promise((resolve,reject)=>{
                resolve(data)
            })
        }
        return this.axios.get("v1/news/mini").then(res=>res.data)
    }
}

export default DataCenter.instance();
