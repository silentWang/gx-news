<template>
    <div class="cls_main">
        <div class="bn_title">
            <div class="bn_title_div">
                <div class="bn_title_logo" @click="reloadHome()">
                    <img src=".././assets/logo.png"/>
                </div>
                <ul class="bn_title_ul">
                    <li v-for="item in titleList" :key="item.cateId">
                        <a  @click="gotoCategry(item.cateId)" class="navLink">{{item.cateName}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div :class="showDialogFlag ? 'bn_main_filter_blur':'bn_main'">
            <div class="bn_left">
                <div v-if="kitchenFlag" class="chuchuang_class">
                    <content-adv-item class="content_adver_kitch_class_style" :actionItem="kitchenAction1" type="kitchen"></content-adv-item>
                </div>
                <div class="a_left_block">
                    <div class="a_title">今日热点</div>
                    <ul class="n_up_list">
                        <li v-for="(item,index) in todayHots" :key="index">
                            <content-news-item v-if="item.type != 2" type="nup" :newsInfo="item" v-on:gotoNews="gotoNews"></content-news-item>
                            <content-adv-item v-else class="content_adver_hot_class_style" :actionItem="hotAction" type="left"></content-adv-item>
                        </li>
                    </ul>
                    <div v-if="kitchenFlag" class="chuchuang_class2">
                        <content-adv-item class="content_adver_kitch_class_style" :actionItem="kitchenAction2" type="kitchen"></content-adv-item>
                    </div>
                </div>
                <div class="a_left_block">
                    <div class="a_title">小编精选</div>
                    <ul class="n_link_list">
                        <li v-for="(item,index) in choseHots" :key="index">
                            <content-news-item type="nlink" :cateName="getCateName(item.cateId)" :newsInfo="item" v-on:gotoNews="gotoNews"></content-news-item>
                        </li>
                    </ul>
                    <div v-if="kitchenFlag" class="chuchuang_class2">
                        <content-adv-item class="content_adver_kitch_class_style" :actionItem="kitchenAction3" type="kitchen"></content-adv-item>
                    </div>
                </div>
                <div class="a_left_block">
                    <div class="a_title">热点排行</div>
                    <div class="n_hot_list">
                        <div class="n_hot_list_item" v-for="(item,index) in rankHots" :key="index">
                            <content-news-item type="hot" :newsInfo="item" v-on:gotoNews="gotoNews"></content-news-item>
                        </div>
                    </div>
                    <div v-if="kitchenFlag" class="chuchuang_class2">
                        <content-adv-item class="content_adver_kitch_class_style" :actionItem="kitchenAction4" type="kitchen"></content-adv-item>
                    </div>
                    <div v-if="kitchenFlag" class="chuchuang_class2">
                        <content-adv-item class="content_adver_kitch_class_style" :actionItem="kitchenAction5" type="kitchen"></content-adv-item>
                    </div>
                </div>
            </div>
            <div class="bn_content">
                <h1>{{detailInfo.title}}</h1>
                <br/>
                <div class="bn_content_second_title">
                    <span v-show="detailInfo.updated_at ? true : false">{{detailInfo.source_time}}&nbsp;&nbsp;&nbsp;{{detailInfo.source_from}}</span>
                    <a target="_blank" >博主</a>
                    <div class="adver_common_class_u9oe3r8d25" :id="headAdvInfo ? headAdvInfo.adv_id : ''" :advtype='headAdvInfo ? headAdvInfo.adv_type:""' v-html="headAdvInfo ? headAdvInfo.adv_script : ''"></div>
                </div>
                <br/>
                <div class="cls_newscontent" v-html="detailHtml"></div>
                <div class="adver_common_class_u9803ide66" :id="footAdvInfo ? footAdvInfo.adv_id : ''" :advtype='footAdvInfo ? footAdvInfo.adv_type:""' v-html="footAdvInfo ? footAdvInfo.adv_script : ''"></div>
                <div class="bn_content_pages">
                    <a class="bn_content_pages_a_normal" v-show="currentPageIndex > 0" @click="gotoPage(currentPageIndex - 1)">上一页</a>
                    <a v-for="(item,index) in allPages" :key="index"
                         :class="[index == currentPageIndex ? 'bn_content_pages_a_selected' : 'bn_content_pages_a_normal']" 
                         @click="gotoPage(index)">{{index + 1}}</a>
                    <a class="bn_content_pages_a_normal" @click="gotoPage(currentPageIndex + 1)">下一页</a>
                </div>
                <div class="bn_bottom_recommond_line">
                    <div>热门推荐</div>
                </div>
                <ul class="n_next_list">
                    <li v-for="(item,index) in bottomList" :key="index">
                        <content-news-item v-if="item.type != 2" type="next" v-on:gotoNews="gotoNews" :newsInfo="item"></content-news-item>
                        <content-adv-item v-else class="content_adver_next_class_style" :actionItem="commonAction" type="dialog"></content-adv-item>
                    </li>
                </ul>
            </div>
            <div class="bn_content_float_advs" v-if="floatFlag">
                <content-adv-item :actionItem="floatAction" type="float"></content-adv-item>
                <div class="float_adv_good_trans">
                    <content-adv-item :actionItem="floatTransAction"></content-adv-item>
                </div>
            </div>
            <div class="bn_sidenav">
                <ul>
                    <li class="home">
                        <a href="/">首页</a>
                    </li>
                    <li class="channel">
                        <a target="_self"  @click="gotoCategry(detailInfo.category_id)">频道</a>
                    </li>
                    <li class="hot">
                        <a target="_self"  @click="gotoCategry(1)">热点</a>
                    </li>
                    <li class="gototop" v-show="showGoTopFlag">
                        <a target="_self" href="javascript:window.scrollTo(0,0)">顶部</a>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="showDialogFlag" class="an_dialog_container">
            <div class="an_dialog_container_alpha"></div>
            <div class="an_dialog_close" @click="checkStayState(false)"></div>
            <div class="tips-left-date">
                <p class="tips-time" id="tips-time">{{nowTime}}</p>
                <p class="tips-date">{{nowDate}}</p>
                <p class="tips-month">{{nongDate}}</p>
                <p class="tips-weather" id="tips-weather" style="display: block;"><span class="weather-icon i1" id="weather-icon"></span><span id="weather-info">30℃  多云</span></p>
            </div>
            <div class="an_dialog_second_cont" @scroll="dialogScroll" @click="checkStayState(false)">
                <div class="an_dialog_view" @click.stop>
                    <div class="atitle">
                        <p><span class="line"></span>本网页已闲置过久，点击关闭或空白处，即可回到网页</p>
                    </div>
                    <ul class="an_dialog_list">
                        <li v-for="(item,index) in dialogList" :key="index">
                            <content-news-item v-if="item.type != 2" type="dialog" v-on:gotoNews="gotoNews" :newsInfo="item"></content-news-item>
                            <content-adv-item v-else class="content_adver_dialog_class_style" :actionItem="dialogAction" type="dialog"></content-adv-item>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="showAdvFlag && showDialogFlag" class="adv_detail_class_show">
            <content-adv-item class="content_adver_dialog_class_style" :actionItem="dialogRateAction" type="dialog"></content-adv-item>
        </div>
    </div>
</template>
<script>
import ContentNewsItem from './comp/ContentNewsItem.vue'
import ContentAdvItem from './comp/ContentAdvItem.vue'
import dataCenter from '@/api/DataCenter'
import Utils from "@/js/Utils"
import CompatibleUtils from '@/js/CompatibleUtils'
import ScreenHandler from "@/js/ScreenHandler"
export default {
    components:{
        ContentNewsItem,
        ContentAdvItem
    },
    data(){
        return {
            showDialogFlag:false,
            showGoTopFlag:false,
            kitchenFlag:false,
            floatFlag:false,
            currentPageIndex:0,
            detailHtml:"",
            allPages:[],
            titleList:[],
            todayHots:[],
            bottomList:[],
            choseHots:[],
            rankHots:[],
            dialogList:[],
            detailInfo:{},
            headAdvInfo:null,
            footAdvInfo:null,
            showAdvFlag:false,
            nowTime:"",
            nowDate:"",
            nongDate:"",
            floatAction:null,
            floatTransAction:null,
            kitchenAction1:null,
            kitchenAction2:null,
            kitchenAction3:null,
            kitchenAction4:null,
            kitchenAction5:null,
            hotAction:null,
            commonAction:null,
            dialogAction:null,
            dialogRateAction:null,
        }
    },
    beforeMount(){
        //101259 内页标题页下方   //101260内页右下方悬浮
        this.kitchenAction1 = dataCenter.createAdvItem();
        this.kitchenAction2 = dataCenter.createAdvItem();
        this.kitchenAction3 = dataCenter.createAdvItem();
        this.kitchenAction4 = dataCenter.createAdvItem();
        this.kitchenAction5 = dataCenter.createAdvItem();
        this.floatAction = dataCenter.createAdvItem();
        this.floatTransAction = dataCenter.createAdvItem();
        this.kitchenAction1.isFirst = false;
        this.kitchenAction2.isFirst = false;
        this.kitchenAction3.isFirst = false;
        this.kitchenAction4.isFirst = false;
        this.kitchenAction5.isFirst = false;
        this.floatAction.isFirst = false;
        this.floatTransAction.isFirst = false;
        this.hotAction = dataCenter.createAdvItem();
        this.commonAction = dataCenter.createAdvItem();
        this.dialogAction = dataCenter.createAdvItem("an_dialog_second_cont");
        this.dialogRateAction = dataCenter.createAdvItem();
        this.hotAction.isFirst = false;
        this.commonAction.isFirst = false;
        this.dialogAction.isFirst = false;
        this.dialogRateAction.isFirst = false;
    },
    created(){
        let query = Utils.getUrlParams();
        if(!query && !query.id) {
            this.reloadHome();
            return;
        }
        let cateid = query.cateid ? query.cateid : 1
        dataCenter.setQid(query.qid);
        dataCenter.getNewsDetailById(query.id).then(res=>{
            if(res.code != 200) {
                this.reloadHome();
                return;
            }
            let info = res.data;
            let contents = info.content.split("@@@www@@@www@@@");
            if(contents.length == 1){
                contents.push("");
            }
            this.allPages = contents;
            // info.content = Utils.escapeHtml(info.content);
            this.detailInfo = info;
            document.title = info.title;
            this.gotoPage(0);
        });
        dataCenter.getDetailInfo(cateid).then(res=>{
            let data = res.data;
            let list = data.category;
            let arr = [];
            for(let i = 0;i < list.length;i++){
                let cate = list[i];
                arr.push({id:cate.cateId,cateId:cate.cateId,cateName:cate.cateName})
            }
            this.titleList = arr;
            let todayHots = [];
            let bottomList = [];
            let dialogList = [];
            let choseHots = [];
            let rankHots = [];
            let details = data.detail_side;
            let rate = ~~(100*Math.random());
            for(let i = 0;i < details.length;i++){
                let detail = details[i];
                if(detail.name == "part_1"){
                    todayHots = detail.data;
                    this.hotAction.setIDS(detail.adv)
                }
                else if(detail.name == "part_2"){
                    bottomList = detail.data;
                    this.commonAction.setIDS(detail.adv)
                }
                else if(detail.name == "part_3"){
                    let infos = detail.adv.ad_script;
                    if(infos){
                        let xobj = {}
                        for(let obj of infos){
                            if(obj.ad_type == "adv360"){
                                xobj.adv_type = "adv360"
                                let msc = obj.ad_script.split("mediav.ad.show('")[1]
                                if(msc){                                
                                    xobj.adv_id = msc.split("',")[0]
                                }
                                xobj.adv_script = obj.ad_script
                                break
                            }
                        }
                        this.headAdvInfo = xobj;
                    }
                }
                else if(detail.name == "part_4"){
                    let infos = detail.adv.ad_script;
                    if(infos){
                        let xobj = {}
                        for(let obj of infos){
                            if(obj.ad_type == "adv360"){
                                xobj.adv_type = "adv360"
                                let msc = obj.ad_script.split("mediav.ad.show('")[1]
                                if(msc){                                
                                    xobj.adv_id = msc.split("',")[0]
                                }
                                xobj.adv_script = obj.ad_script
                                break
                            }
                        }
                        this.footAdvInfo = xobj;
                    }
                }
                else if(detail.name == "part_5"){
                    dialogList = detail.data;
                    this.showAdvFlag = detail.adv && detail.adv.open_rate > rate;
                    this.dialogAction.setIDS(detail.adv);
                    this.dialogRateAction.setIDS(detail.adv,false);
                }
                else if(detail.name == "part_6"){
                    //左侧五个橱窗
                    this.kitchenAction1.setIDS(detail.adv)                    
                }
                else if(detail.name == "part_7"){
                    //左侧五个橱窗
                    this.kitchenAction2.setIDS(detail.adv)                    
                }
                else if(detail.name == "part_8"){
                    //左侧五个橱窗
                    this.kitchenAction3.setIDS(detail.adv)                    
                }
                else if(detail.name == "part_9"){
                    //左侧五个橱窗
                    this.kitchenAction4.setIDS(detail.adv)                    
                }
                else if(detail.name == "part_10"){
                    //左侧五个橱窗
                    this.kitchenAction5.setIDS(detail.adv)                    
                }
                else if(detail.name == "part_11"){
                    choseHots = detail.data;
                }
                else if(detail.name == "part_12"){
                    rankHots = detail.data;
                }
                else if(detail.name == "part_13"){
                    this.floatAction.setIDS(detail.adv)
                    this.floatTransAction.setIDS(detail.adv,false)
                    this.floatFlag = true                    
                }
            }
            this.$nextTick(()=>{
                this.todayHots = todayHots     
                this.bottomList = bottomList     
                this.dialogList = dialogList     
                this.choseHots = choseHots     
                this.rankHots = rankHots
                this.kitchenFlag = true;
                this.$nextTick(()=>{
                    dataCenter.addAdsByClassName("adver_common_class_u9oe3r8d25");
                    dataCenter.addAdsByClassName("adver_common_class_u9803ide66");
                    dataCenter.addAdsByClassName("bn_content_float_advs");
                    this.kitchenAction1.checkLoad();
                    this.kitchenAction2.checkLoad();
                    this.kitchenAction3.checkLoad();
                    this.kitchenAction4.checkLoad();
                    this.kitchenAction5.checkLoad();
                    this.hotAction.checkLoad();
                    this.commonAction.checkLoad();
                    this.floatAction.checkLoad();
                    this.floatTransAction.checkLoad();
                })
                this.checkStayState();     
            });
        });
        Utils.addDelay(()=>{
            this.nowTime = Utils.getTimeStr("hm");
            this.nowDate = Utils.getTimeStr("yMdw",["年","月","日  "]);
            this.nongDate = "辛丑(牛)年";
        },this,1000,0);

        Utils.addWindowClick(()=>{
            if(this.showAdvFlag && this.showDialogFlag){
                this.showAdvFlag = false;
            }
        },this);
        
        window.onscroll = this.listScroll.bind(this);
        // this.$nextTick(()=>{
        //     this.listScroll();
        // });
    },
    methods:{
        reloadHome(evt){
            window.open("https://news.dtxww.cn/");
        },
        listScroll(){
            let rEle = document.getElementsByClassName("bn_left")[0];
            let attrVal = CompatibleUtils.getCompatibleValue();
            let scrollTop = attrVal.scrollTop;
            let clientHgt = attrVal.clientHeight;
            this.showGoTopFlag = scrollTop >= clientHgt;
            if(!rEle) return;
            let rsHgt = rEle.offsetHeight;
            if(rsHgt < clientHgt){
                rEle.style.position = "fixed";
                rEle.style.top = "40px";
            }
            else if(rsHgt < scrollTop){
                if(rEle.style.position != "fixed"){
                    rEle.style.position = "fixed";
                    rEle.style.top = "-280px";
                }
            }
            else {
                rEle.style.top = "10px";
                rEle.style.position = "relative";
            }
            this.kitchenAction1.checkLoad();
            this.kitchenAction2.checkLoad();
            this.kitchenAction3.checkLoad();
            this.kitchenAction4.checkLoad();
            this.kitchenAction5.checkLoad();
            this.hotAction.checkLoad();
            this.commonAction.checkLoad();
        },
        dialogScroll(){
            this.dialogAction.checkLoad();
        },
        getCateName(cateid){
            let list = this.titleList;
            let cname = "";
            for(let cate of list){
                if(cate.cateId == cateid){
                    cname = cate.cateName;
                    break;
                }
            }
            return cname;
        },
        gotoCategry(idx){
            window.open("https://news.dtxww.cn/?cateid=" + idx + "wow", '_blank');
        },
        gotoNews(item){
            let mode = process.env.BUILD_MODE == 3 ? "" : "000/";
            let turl = `https://news.dtxww.cn/content/${mode}?id=${item.id}&cateid=${item.cateId}`;
            window.open(turl, '_blank');
        },
        gotoPage(index){
            let len = this.allPages.length;
            if(index >= len - 1){
                window.open("https://news.dtxww.cn/", '_self');
            }
            else{
                this.currentPageIndex = index;
                this.detailHtml = Utils.escapeHtml(this.allPages[index]);
                window.scrollTo(0,0);
            }
        },
        checkStayState(bool = true){
            let _this = this;
            if(!this.screenHandler){
                this.screenHandler = new ScreenHandler(15000,()=>{
                    if(_this.showDialogFlag) return;
                    _this.showDialogFlag = true;
                    document.body.style.overflow = "hidden";
                    this.dialogAction.reset();
                    this.dialogAction.isFirst = false;
                    this.$nextTick(()=>{
                        this.dialogScroll();
                        if(this.showAdvFlag){
                            this.dialogRateAction.checkLoad();
                        }
                    });
                });
            }
            if(!bool){
                _this.showDialogFlag = false;
                _this.screenHandler.reWatch(30000);
                document.body.style.overflow = "auto";
            }
        }
    }
}
</script>
<style>
    * {
        margin:0px;
        padding:0px;
    }
    body {
        background: #f5f5f5;
    }
    h1,h2,h3,h4,h5,h6 {
        text-align: left;
    }
    a {
        color: #333;
        text-decoration: none;
        cursor: pointer;
    }
    a:hover{ 
        color:#f24e4e;
    }
    .cls_main {
        height: 100%;
        background: #fff;
    }
    img {
        transition: all 0.6s;
    }
    img:hover {
        transform: scale(1.1);
    }
    .an_dialog_container {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 99;
        margin: 0 auto;
        text-align: center;
        vertical-align: middle;
    }
    .an_dialog_container_alpha {
        position: fixed;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 100%;
        background-color: #b6b4b8;
        opacity: .75;
    }
    .an_dialog_close {
        position: fixed;
        right: 0;
        top: 0;
        width: 85px;
        height: 83px;
        background: url("../assets/closebtn.png") left center no-repeat;
        cursor: pointer;
    }
    .tips-left-date {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 2;
        width: 228px;
        height: 260px;
        color: #fff;
        text-align: center;
        margin-left: -660px;
        margin-top: -130px;
        text-shadow: 0 1px 1px #333;
    }
    .tips-left-date .tips-time {
        line-height: 30px;
        font-size: 70px;
        line-height: 108px;
    }
    .tips-left-date .tips-date {
        font-size: 16px;
        line-height: 40px;
    }
    .tips-left-date .tips-month {
        font-size: 16px;
        line-height: 40px;
    }
    .tips-left-date .tips-weather {
        font-size: 16px;
        line-height: 40px;
    }
    .tips-left-date .tips-weather .weather-icon.i1 {
        background-position: 0 -36px;
    }
    .tips-left-date .tips-weather .weather-icon {
        display: inline-block;
        width: 36px;
        height: 36px;
        position: relative;
        top: 10px;
        margin-right: 10px;
        background-image: url("../assets/36x1224_weather.png");
        background-position: 0 0;
        background-repeat: no-repeat;
    }
    .tips-left-date .tips-weather {
        font-size: 16px;
        line-height: 40px;
    }
    .an_dialog_second_cont {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .an_dialog_view {
        width: 760px;
        min-height: 400px;
        margin: 0 auto;
        font-size: 14px;
        margin-top: 0px;
    }
    .an_dialog_view .atitle {
        width: 100%;
        height: 55px;
        background-color: #a7a6a8;
        border-radius: 15px;
        color: #444141;
        margin-bottom: 30px;
        margin-top: 60px;
    }
    .an_dialog_view .atitle p {
        position: relative;
        padding-left: 35px;
        font-size: 20px;
        line-height: 55px;
        text-align: left;
    }
    .an_dialog_view .atitle .line {
        position: absolute;
        top: 14px;
        left: 14px;
        width: 6px;
        height: 27px;
        background-color: #818082;
        border-radius: 4px;
    }
    .an_dialog_list {
        list-style-type: none;
        position: relative;
        margin-top: 10px;
        overflow: hidden;
    }
    .an_dialog_list li {
        overflow: hidden;
        zoom: 1;
        word-break: break-all;
        cursor: pointer;
        margin-bottom: 10px;
        text-align: left;
        padding-bottom: 10px;
        border-bottom: 1px solid #aaa;
    }
    .bn_title {
        width: 100%;
        height: 40px;
        background-color: #222222;
        position: fixed;
        z-index: 90;
    }
    .bn_title_div {
        width: 1300px;
        padding-top: 5px;
        margin: 0 auto;
    }
    .bn_title_ul {
        display: block;
        white-space:nowrap;
        text-align: left;
        margin-left: 480px;
    }
    .bn_title_logo {
        position: relative;
        float: left;
        display: block;
        cursor: pointer;
        top: -5px;
    }
    .bn_title_logo img {
        width: 140px;
        height: 55px;
        transition: all 0.6s;
    }
    .bn_title_logo img:hover {
        transform: scale(1.1);
    }
    .bn_title_ul li {
        margin:4px;
        padding: 0 5px 0 5px;
        display:inline-block;
    }
    .navLink {
        color: aliceblue;
        text-decoration: none;
    }
    .bn_main {
        width: 1300px;
        height: 100%;
        position: relative;
        top: 40px;
        padding-top: 10px;
        margin: 0 auto;
    }
    .bn_main_filter_blur {
        width: 1300px;
        height: 100%;
        position: relative;
        top: 40px;
        padding-top: 10px;
        margin: 0 auto;
        filter: blur(10px);
    }
    .bn_content {
        width: 780px;
        margin: 25px 0 0 10px;
        background: #fff;
        padding: 10px;
        margin-top: 10px;
        margin-left: 480px;
    }
    .bn_content_second_title {
        text-align: left;
        font-size: 12px;
        color: #999;
        padding-bottom: 15px;
        border-bottom:1px solid #f1f1f1;
    }
    .bn_content_second_title a {
        border:1px solid #eee;
        padding:2px 6px;
        border-radius: 3px;
        font-style: normal;
        float: right;
    }
    .bn_content_second_title a:hover {
        border: 1px solid #f24e4e;
        border-radius: 3px;
        padding: 2px 6px;
        color: #f24e4e;
        font-style: normal;
    }
    .bn_content img {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .bn_left {
        position: relative;
        float: left;
        width: 400px;
        margin-left: 50px;
        margin-top:10px;
        margin-bottom: 25px;
        border-top: 2px solid #ee4b4c;
    }
    .a_left_block {
        border-top: 2px solid #ee4b4c;
        margin-top: 20px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 30px;
        overflow: hidden;
        background-color: #f7f7f7;
    }
    .a_left_block .a_title {
        font-size: 16px;
        text-align: left;
        font-weight: 700;
    }
    .n_up_list {
        list-style: none;
        font-size: 14px;
        margin-block-start: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .n_up_list li {
        overflow: hidden;
        zoom: 1;
        padding-bottom: 10px;
    }
    .n_link_list {
        list-style: none;
        font-size: 14px;
        margin-block-start: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .n_link_list li {
        overflow: hidden;
        zoom: 1;
        text-align: left;
        padding-top: 6px;
        padding-bottom: 4px;
        border-bottom: 1px solid #ececec;
    }
    .n_hot_list {
        width: 400px;
        font-size: 14px;
        margin-bottom: 25px;
    }
    .n_hot_list .n_hot_list_item {
        overflow: hidden;
        text-align: left;
        padding:2px 0px 0px 4px;
        margin-bottom: 10px;
        width: 166px;
        float: left;
    }
    .bn_left_list_news_title {
        width:220px;
        height: 68px;
        word-break:break-all;
        size: 14px;
        cursor: pointer;
    }
    .bn_left_list_news_title a {
        cursor: pointer;
    }
    .bn_left_list_news_author{
        display: block;
        position: relative;
        bottom: 0px;
        size: 14px;
        color: #9b9597;
        cursor: pointer;
    }
    .chuchuang_class {
        height: 290px;
        overflow: hidden;
        background-color: #f7f7f7;
        border:1px solid #ececec;
    }
    .chuchuang_class2 {
        width: 360px;
        height: 290px;
        overflow: hidden;
        margin-top: 10px;
        padding-top: 10px;
        background-color: #f7f7f7;
        border:1px solid #ececec;
    }
    .cls_newscontent {
        display: block;
        line-height: 30px;
        letter-spacing: 1px;
        font-size: 18px;
        text-align: left;
    }
    .cls_newscontent img {
        max-width: 780px;
        display: block;
        margin: 0 auto;
        transition:none;
    }
    .cls_newscontent img:hover {
        transform: none;
    }
    .cls_newscontent p {
        text-indent: 36px;
    }
    .bn_content_pages {
        width: 100%;
        margin-top: 25px;
        /* margin-bottom: 25px; */
    }
    .bn_content_pages_a_selected {
        background-color: #b00101;
        font-size: 14px;
        padding: 6px 10px;
        line-height: 1;
        margin: 0 3px;
        color: #fff;
        text-decoration: none;
        display: inline-block;
    }
    .bn_content_pages_a_normal {
        background: #333;
        font-size: 14px;
        padding: 6px 10px;
        line-height: 1;
        margin: 0 3px;
        color: #fff;
        text-decoration: none;
        display: inline-block;
    }
    .bn_content_pages a:hover {
        color: #fff;
        background-color: #b00101;
    }
    .bn_bottom_recommond_line {
        text-align: left;
        margin-top: 10px;
        height: 25px;
        width: 100%;
        border-bottom: 2px solid #ccc;
    }
    .bn_bottom_recommond_line div {
        display: inline-block;
        height: 25px;
        color: #f24e4e;
        border-bottom: 2px solid #f24e4e;
    }
    .adver_common_class_u9803ide66 {
        margin-top: 10px;
    }
    .n_next_list{
        list-style-type: none;
        margin: 0 auto;
        padding:15px 10px 0 10px;
        margin-left: 0;
    }
    .n_next_list li {
        overflow: hidden;
        zoom: 1;
        word-break:break-all;
        cursor: pointer;
        border-bottom:1px solid #eee;
        margin-bottom: 10px;
        padding-bottom: 10px;
        text-align: left;
    }
    .n_next_list_news_title_content {
        text-align: left;
        float: left;
        width: 536px;
        height: 88px;
        position: relative;
    }
    .n_next_list_news_tag {
        position: absolute;
        bottom: 0;
        left: 0;
        zoom: 1;
        width: 100%;
        font-size: 12px;
        color: #bbb;
    }
    .bn_content_float_advs {
        position: fixed;
        right: 10px;
        bottom: 10px;
        z-index: 100;
    }
    .float_adv_good_trans {
        position: absolute;
        left: 100px;
        top: -10px;
        z-index: 101;
        opacity: 0;
    }
    .bn_sidenav {
        position: fixed;
        margin-left: 1300px;
        margin-top: 30px;
        top: 30px;
    }
    .bn_sidenav ul {
        list-style: none;
    }
    .bn_sidenav li {
        width: 40px;
        height: 40px;
        margin-bottom: 2px;
        background-size: 32px 32px;
        background-repeat: no-repeat;
        background-color: #fff;
        background-position: center;
        border-radius: 2px;
    }
    .bn_sidenav .home {
        background-image: url("../assets/home.png");
    }
    .bn_sidenav .channel {
        background-image: url("../assets/menu.png");
    }
    .bn_sidenav .hot {
        background-image: url("../assets/fire.png");
    }
    .bn_sidenav .gototop {
        background-image: url("../assets/down.png");
    }
    .bn_sidenav a {
        color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 2px;
        line-height: 40px;
        display: block;
        font-size: 12px;
        opacity: 0;
    }
    .bn_sidenav a:hover{
        opacity: 1;
        color: #fff;
        background-color: #ff0000;
    }
    .adv_detail_class_show {
        position: fixed;
        top: 0px;
        right: 0px;
        z-index: 100;
        opacity: 0;
    }

</style>