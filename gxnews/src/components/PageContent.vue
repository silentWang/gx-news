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
                        <div v-else @click="clkUxArt(item.id)" :id="item.id" :advtype="item.advType" class="adver_common_class_ue2dialog23" v-html="item.title"></div>
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
            <div class="bn_left">
                <div class="adver_common_class_u9oe3r8d73"></div>
                <ul class="n_up_list">
                    <h3>今日热点</h3>
                    <li v-for="(item,index) in todayHots" :key="index">
                        <content-news-item v-if="item.type != 2" type="nup" :newsInfo="item" v-on:gotoNews="gotoNews"></content-news-item>
                        <div v-else :advtype="item.advType" :id="item.id" class="adver_common_class_ude4536" v-html="item.title"></div>
                    </li>
                </ul>
                <div class="adver_common_class_u9oe3r8d73"></div>
                <ul class="n_up_list">
                    <h3>小编精选</h3>
                    <li v-for="(item,index) in choseHots" :key="index">
                        <content-news-item v-if="item.type != 2" type="nup" :newsInfo="item" v-on:gotoNews="gotoNews"></content-news-item>
                        <div v-else :advtype="item.advType" :id="item.id" class="adver_common_class_ude4536" v-html="item.title"></div>
                    </li>
                </ul>
                <div class="adver_common_class_u9oe3r8d73"></div>
                <ul class="n_up_list">
                    <h3>视角</h3>
                    <li v-for="(item,index) in viewHots" :key="index">
                        <content-news-item v-if="item.type != 2" type="nup" :newsInfo="item" v-on:gotoNews="gotoNews"></content-news-item>
                        <div v-else :advtype="item.advType" :id="item.id" class="adver_common_class_ude4536" v-html="item.title"></div>
                    </li>
                </ul>
            </div>
            <div class="bn_content">
                <h1>{{detailInfo.title}}</h1>
                <br/>
                <div class="bn_content_second_title">
                    <span v-show="detailInfo.updated_at ? true : false">{{detailInfo.source_time}}&nbsp;&nbsp;&nbsp;{{detailInfo.source_from}}</span>
                    <a target="_blank" >博主</a>
                    <div class="adver_common_class_u9oe3r8d25"></div>
                </div>
                <br/>
                <div class="cls_newscontent" v-html="detailHtml"></div>
                <div class="adver_common_class_u9803ide66"></div>
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
                        <div v-else @click="clkUxArt(item.id)" :id="item.id" :advtype="item.advType" class="adver_common_class_ue25next12" v-html="item.title"></div>
                    </li>
                </ul>
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
            otherInfo:{}
        }
    },
    created(){
        let query = this.$route.query;
        dataCenter.setQid(query.qid);
        if(!query && !query.id) {
            this.$router.push({path:'/'});
            return;
        }
        let _this = this;
        dataCenter.getNewsList().then(res=>{
            if(res.code != 200) return;
            let list = res.data;
            let arr = [];
            for(let i = 0;i < list.length;i++){
                let cate = list[i];
                arr.push({id:cate.cateId,cateId:cate.cateId,cateName:cate.cateName})
            }
            _this.titleList = arr;
        })
        dataCenter.getNewsDetailById(query.id).then(res=>{
            if(res.code != 200) {
                this.$router.push({path:'/'});
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
            _this.detailInfo = info;
            document.title = info.title;
            this.gotoPage(0);
        })
        dataCenter.getDetailLeftNews().then(res=>{
            if(res.code != 200) return
            let data = res.data
            for(let info of data){
                if(info.name == "今日热点"){
                    this.todayHots = info.list
                }
                if(info.name == "小编精选"){
                    this.choseHots = info.list
                }
                if(info.name == "视角"){
                    this.viewHots = info.list
                }
            }
            dataCenter.getAdverInfo(4).then(()=>{
                this.reRenderNow();
            });
        })
        dataCenter.getDetailDownNews().then(res=>{
            if(res.code != 200) return
            this.nextHots = res.data
            _this.$nextTick(()=>{
                dataCenter.checkAdverLoad("adver_common_class_ue25next12");
            });
        })
        dataCenter.getNewsListById(1).then(res=>{
            if(res.code != 200) return
            let data = res.data;
            if(!data || data.length == 0) return;
            _this.viewList = data.slice(2,22);
            _this.checkStayState();
        });
        this.addInfoAdver();
        window.onscroll = this.listScroll.bind(this);
        this.listScroll();
    },
    methods:{
        reloadHome(evt){
            let routeUrl = this.$router.resolve({
                path: "/"
            });
            window.open(routeUrl.href);
        },
        listScroll(){
            dataCenter.checkAdverLoad("adver_common_class_ue25next12");
            dataCenter.checkAdverLoad("adver_common_class_ude4536");
            let rEle = document.getElementsByClassName("bn_left")[0];
            let cEle = document.getElementsByClassName("bn_main")[0];
            if(!rEle || !cEle) return;
            let attrVal = CompatibleUtils.getCompatibleValue();
            let scrollTop = attrVal.scrollTop;
            let clientHgt = attrVal.clientHeight;
            let scrollHgt = attrVal.scrollHeight;
            let rsHgt = rEle.offsetHeight;
            let xpos = cEle.offsetLeft || 0;
            this.showGoTopFlag = scrollTop >= clientHgt;
            if(scrollTop <= 60){
                rEle.style.position = "absolute";
                rEle.style.top = "";
                rEle.style.left = "";
                rEle.style.bottom = "";
            }
            else if(rsHgt < clientHgt){
                rEle.style.position = "fixed";
                rEle.style.top = "0px";
                rEle.style.bottom = "";
                rEle.style.left = (xpos) + "px";
            }
            else if(rsHgt + 95 >= scrollHgt){
                rEle.style.position = "absolute";
                rEle.style.top = "";
                rEle.style.left = "";
                rEle.style.bottom = "";
            }
            else if(rsHgt - clientHgt < scrollTop){
                rEle.style.position = "fixed";
                rEle.style.top = "";
                rEle.style.bottom = "10px";
                rEle.style.left = (xpos) + "px";
            }
            else{
                rEle.style.position = "absolute";
                rEle.style.top = "";
                rEle.style.left = "";
                rEle.style.bottom = "";
            }
        },
        checkScrollAd(){
            if(this.showDialogFlag){
                dataCenter.checkAdverLoad("adver_common_class_ue2dialog23");
            }
        },
        addInfoAdver(){
            dataCenter.getAdverInfo(9).then((res)=>{
                if(!res || !res.data) return;
                let ele = document.getElementsByClassName("adver_common_class_u9803ide66")[0];
                ele.innerHTML = res.data.ad_script;
                dataCenter.addAdsByClassName("adver_common_class_u9803ide66");
            });
        },
        reRenderNow(){
            this.$nextTick(()=>{
                dataCenter.checkAdverLoad("adver_common_class_ude4536");
                this.addKitchAdver();
            });
        },
        addKitchAdver(){
            let had = dataCenter.getRandomAdverInfo(Utils.PositionType.POSITION_HEADER);
            let mid = dataCenter.getRandomAdverInfo(Utils.PositionType.POSITION_MIDDLE);
            let fad = dataCenter.getRandomAdverInfo(Utils.PositionType.POSITION_FOOTER);
            let ele1 = document.getElementsByClassName("adver_common_class_u9oe3r8d73")[0];
            let ele2 = document.getElementsByClassName("adver_common_class_u9oe3r8d73")[1];
            let ele3 = document.getElementsByClassName("adver_common_class_u9oe3r8d73")[2];
            let ele4 = document.getElementsByClassName("adver_common_class_u9oe3r8d25")[0];
            if(!had && !fad && !mid) return;
            had = had || mid || fad;
            mid = mid || had || fad;
            fad = fad || had || mid;
            ele1.id = had.id;
            ele2.id = mid.id;
            ele3.id = fad.id;
            ele1.innerHTML = had.ad_script;
            ele2.innerHTML = mid.ad_script;
            ele3.innerHTML = fad.ad_script;
            console.log(this.otherInfo)
            if(this.otherInfo && this.otherInfo.adv && this.otherInfo.adv.adv_string){
                ele4.id = this.otherInfo.adv.adv_title;
                ele4.innerHTML = this.otherInfo.adv.adv_string;
                dataCenter.addAdsByClassName("adver_common_class_u9oe3r8d25");
            }
            dataCenter.addAdsByClassName("adver_common_class_u9oe3r8d73");
        },
        gotoCategry(idx){
            let routeUrl = this.$router.resolve({
                path: "/",
                query: {id:idx}
            });
            window.open(routeUrl.href, '_blank');
        },
        gotoNews(idx){
            let routeUrl = this.$router.resolve({
                path: "/content",
                query: {id:idx}
            });
            window.open(routeUrl.href, '_blank');
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
        width: 1190px;
        padding-top: 5px;
        margin: 0 auto;
    }
    .bn_title_ul {
        display: block;
        margin-left: 180px;
        white-space:nowrap;
        text-align: left;
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
        width: 1190px;
        position: relative;
        top: 40px;
        padding-top: 10px;
        margin: 0 auto;
    }
    .bn_left {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        width: 336px;
        margin-top:10px;
        margin-bottom: 25px; 
        padding: 10px;
        position: absolute;
    }
    .bn_content {
        width: 780px;
        margin: 25px 0 0 10px;
        background: #fff;
        padding: 10px;
        margin-top: 10px;
        float: left;
        margin-left: 370px;
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
        padding-bottom: 10px;
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
    .bn_sidenav {
        position: fixed;
        margin-left: 1190px;
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
        background-color: #ff0000;
    }

</style>