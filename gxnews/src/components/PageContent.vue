<template>
    <div class="cls_main">
        <div v-show="showDialogFlag" class="an_dialog_container" @click="checkStayState(false)">
            <div class="an_dialog_view">
                <div class="atitle">
                    当前页已闲置过久，点击关闭或空白处，即可回到网页
                    <div class="close" title="关闭" @click="checkStayState(false)">×</div>
                </div>
                <ul class="an_dialog_list" @scroll="checkScrollAd">
                    <li v-for="(item,index) in viewList" :key="index + '_' + item.id + '_' + item.type">
                        <content-news-item v-if="item.type != 2" type="next" v-on:gotoNews="gotoNews" :newsInfo="item"></content-news-item>
                        <div v-else :id="item.adv_id" :advtype="item.adv_type" class="adver_common_class_ue2dialog23" v-html="item.adv_script"></div>
                    </li>
                </ul>
            </div>
        </div>
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
        <div class="bn_main">
            <div class="bn_left" @scroll="scrollCheckLeft()">
                <ul class="n_up_list">
                    <li v-for="(item,index) in todayHots" :key="index">
                        <content-news-item v-if="item.type != 2" type="nup" :newsInfo="item" v-on:gotoNews="gotoNews"></content-news-item>
                        <div v-else :advtype="item.adv_type" :id="item.adv_id" class="adver_common_class_ude4536" v-html="item.adv_script"></div>
                    </li>
                </ul>
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
                    <li v-for="(item,index) in nextHots" :key="index">
                        <content-news-item v-if="item.type != 2" type="next" v-on:gotoNews="gotoNews" :newsInfo="item"></content-news-item>
                        <div v-else :id="item.adv_id" :advtype="item.adv_type" class="adver_common_class_ue25next12" v-html="item.adv_script"></div>
                    </li>
                </ul>
            </div>
            <div class="bn_content_float_advs" :id="floatAdvInfo?floatAdvInfo.adv_id:''" :advtype="floatAdvInfo?floatAdvInfo.adv_type:''" v-html="floatAdvInfo?floatAdvInfo.adv_script:''"></div>
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
    </div>
</template>
<script>
import ContentNewsItem from './comp/ContentNewsItem.vue'
import dataCenter from '@/api/DataCenter'
import Utils from "@/js/Utils"
import CompatibleUtils from '@/js/CompatibleUtils'
import ScreenHandler from "@/js/ScreenHandler"
export default {
    components:{
        ContentNewsItem
    },
    data(){
        return {
            showDialogFlag:false,
            showGoTopFlag:false,
            currentPageIndex:0,
            detailHtml:"",
            allPages:[],
            titleList:[],
            todayHots:[],
            choseHots:[],
            viewHots:[],
            nextHots:[],
            viewList:[],
            detailInfo:{},
            otherInfo:{},
            headAdvInfo:null,
            footAdvInfo:null,
            floatAdvInfo:null
        }
    },
    created(){
        let query = Utils.getUrlParams();
        if(!query && !query.id) {
            this.reloadHome();
            return;
        }
        dataCenter.setQid(query.qid);
        dataCenter.getNewsDetailById(query.id).then(res=>{
            if(res.code != 200) {
                this.reloadHome();
                return;
            }
            let info = res.data;
            this.otherInfo = res.other;
            let contents = info.content.split("@@@www@@@www@@@");
            if(contents.length == 1){
                contents.push("");
            }
            this.allPages = contents;
            // info.content = Utils.escapeHtml(info.content);
            this.detailInfo = info;
            document.title = info.title;
            this.gotoPage(0);
        })

        dataCenter.getDetailInfo().then(res=>{
            let data = res.data;
            // console.log(data);
            let list = data.category;
            let arr = [];
            for(let i = 0;i < list.length;i++){
                let cate = list[i];
                arr.push({id:cate.cateId,cateId:cate.cateId,cateName:cate.cateName})
            }
            this.titleList = arr;
            let details = data.detail_side;
            for(let i = 0;i < details.length;i++){
                let detail = details[i];
                if(detail.name == "part_1"){
                    this.todayHots = detail.data;
                }
                else if(detail.name == "part_2"){
                    this.nextHots = detail.data;
                }
                else if(detail.name == "part_3"){
                    this.footAdvInfo = detail.adv;
                }
                else if(detail.name == "part_4"){
                    this.headAdvInfo = detail.adv;
                }
                else if(detail.name == "part_5"){
                    this.viewList = detail.data.slice(2,22);
                    this.checkStayState();
                }
                else if(detail.name == "part_6"){
                    this.floatAdvInfo = detail.adv;
                }
            }
            this.$nextTick(()=>{
                dataCenter.checkAdverLoad("adver_common_class_ude4536");
                dataCenter.checkAdverLoad("adver_common_class_ue25next12");
                dataCenter.addAdsByClassName("adver_common_class_u9oe3r8d25");
                dataCenter.addAdsByClassName("adver_common_class_u9803ide66");
                dataCenter.addAdsByClassName("bn_content_float_advs");
            });
        });

        window.onresize = this.resizeHandle.bind(this);
        window.onscroll = this.listScroll.bind(this);
        this.$nextTick(()=>{
            this.listScroll();
            this.resizeHandle();
        });
    },
    methods:{
        reloadHome(evt){
            window.open("https://news.dtxww.cn/");
        },
        resizeHandle(){
            let eles = document.getElementsByClassName("bn_left");
            if(!eles || eles.length == 0) return;
            let ele = eles[0];
            let comps = CompatibleUtils.getViewPort();
            ele.style.height = comps.clientHeight + "px";
        },
        scrollCheckLeft(){
            dataCenter.checkAdverLoad("adver_common_class_ude4536");
        },
        listScroll(){
            dataCenter.checkAdverLoad("adver_common_class_ue25next12");
            let attrVal = CompatibleUtils.getCompatibleValue();
            let scrollTop = attrVal.scrollTop;
            let clientHgt = attrVal.clientHeight;
            this.showGoTopFlag = scrollTop >= clientHgt;
        },
        checkScrollAd(){
            if(this.showDialogFlag){
                dataCenter.checkAdverLoad("adver_common_class_ue2dialog23");
            }
        },
        gotoCategry(idx){
            let routeUrl = this.$router.resolve({
                path: "/",
                query: {id:idx}
            });
            window.open(routeUrl.href, '_blank');
        },
        gotoNews(idx){
            // let routeUrl = this.$router.resolve({
            //     path: "/content",
            //     query: {id:idx}
            // });
            // window.open(routeUrl.href, '_blank');
            let turl = "https://news.dtxww.cn/content/?id="+idx;
            window.open(turl, '_blank');
        },
        gotoPage(index){
            let len = this.allPages.length;
            if(index >= len - 1){
                let routeUrl = this.$router.resolve({
                    path: "/",
                    query: {id:1}
                });
                window.open(routeUrl.href, '_self');
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
                    _this.showDialogFlag = true;
                    _this.$nextTick(()=>{
                        dataCenter.checkAdverLoad("adver_common_class_ue2dialog23");
                    });
                });
            }
            if(!bool){
                _this.showDialogFlag = false;
                _this.screenHandler.reWatch();
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
        background: #f5f5f5;
    }
    .an_dialog_container {
        position: fixed;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0, 0.7);
        z-index: 99;
        margin: 0 auto;
        text-align: center;
        vertical-align: middle;
    }
    .an_dialog_view {
        width: 750px;
        height: 500px;
        min-height: 500px;
        margin: 0 auto;
        background: #fff;
        border-radius: 10px;
        font-size: 14px;
        top: 50%;
        left: 50%;
        position: fixed;
        margin-left: -375px;
        margin-top: -250px;
        overflow: hidden;
        box-shadow: 0 0 20px 2px #e9e9e9;
    }
    .an_dialog_view .atitle {
        text-align: center;
        height: 36px;
        line-height: 36px;
        background: #af080f;
        color: #fff;
        position: relative;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        font-size: 16px;
    }
    .an_dialog_view div .close {
        position: absolute;
        top: 8px;
        right: 9px;
        height: 20px;
        width: 20px;
        line-height: 20px;
        background: #ce6666;
        border-radius: 100%;
        font-size: 16px;
        cursor: pointer;
        font-family: serif;
    }
    .an_dialog_list {
        height: 450px;
        list-style-type: none;
        position: relative;
        margin-top: 10px;
        padding: 10px;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .an_dialog_list li {
        overflow: hidden;
        zoom: 1;
        word-break: break-all;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        padding-bottom: 10px;
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
    .bn_left {
        position: fixed;
        background-color: #fff;
        width: 450px;
        margin-top:10px;
        margin-bottom: 25px; 
        padding: 10px;
        overflow-y: scroll;
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
    .n_up_list {
        list-style: none;
        font-size: 14px;
        margin-block-start: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .n_up_list h3 {
        display: block;
        border-top: 3px solid #b00101;
        height: 30px;
        position: relative;
        padding-left: 5px;
        padding-top: 10px;
    }
    .n_up_list li {
        overflow: hidden;
        zoom: 1;
        margin-bottom: 8px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
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

</style>