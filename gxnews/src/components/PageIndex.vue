<template>
    <div class="an_main">
        <div class="an-title" id="toptitle">
            <div class="an_title_scrollnews_div">
                <div v-show="timeNewList.length > 0">今日热搜:</div>
                <ul class="an_title_scrollnews_ul">
                    <li v-for="(item,index) in timeNewList" :key="index">
                        <a :href="item.url" target="_blank">{{item.title}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="an_middle">
            <div class="n_title_weather">
                <iframe allowtransparency="true" frameborder="0" width="317" height="28" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&amp;z=1&amp;t=1&amp;v=0&amp;d=1&amp;bd=0&amp;k=000000&amp;f=ffffff&amp;ltf=ffffff&amp;htf=ffffff&amp;q=1&amp;e=0&amp;a=1&amp;c=54511&amp;w=317&amp;h=28&amp;align=right"></iframe>
            </div>
            <div class="an_left">
                <div class="an_left_inner">
                    <div class="an_title_logo" @click="reloadHome()">
                        <img src=".././assets/logo.png"/>
                    </div>
                    <ul class="an_left_ul">
                        <li v-for="(item,index) in titleList" 
                            :key="index"
                            @click="gotoCategry(item.cateId)">
                            <a target="_self" :class="[item.id == selectIndex ? 'a_active' : 'a_inactive']">{{item.cateName}}</a>
                            <img v-show="item.id == selectIndex" src=".././assets/refresh.png">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="an_content">
                <div class="an_content_item" v-for="(item,index) in newsList" :key="item.id + '_' + index">
                    <HomeNewsItem v-if="item.type != 2" :cateName="getCateName()" :index='index' :newsInfoData="item" v-on:gotoNews="gotoNews"></HomeNewsItem>
                    <home-adv-item v-else :actionItem="mainAction"></home-adv-item>
                </div>
            </div>
            <div class="an_right">
                <div class="an_right_container">
                    <div class="adv_class_for_jsonup" v-if="kitchenFlag">
                        <home-adv-item :actionItem="kitchenAction1" type="kitchen"></home-adv-item>
                    </div>
                    <div class="an_right_today"><img src=".././assets/yuandian.png"/>今日热点</div>
                    <ul class="an_right_list">
                        <li v-for="(item,index) in twelveList" :key="index">
                            <HomeNewsItem v-if="item.type != 2" type="small" :newsInfoData='item' v-on:gotoNews="gotoNews"></HomeNewsItem>
                            <home-adv-item v-else :actionItem="rightAction" type="right"></home-adv-item>
                        </li>
                    </ul>
                    <div class="adv_class_for_jsonup" v-if="kitchenFlag">
                        <home-adv-item :actionItem="kitchenAction2" type="kitchen"></home-adv-item>
                    </div>
                </div>
            </div>
            <div class="an_sidenav">
                <ul>
                    <li class="home">
                        <a href="/">首页</a>
                    </li>
                    <li class="channel">
                        <a target="_self"  @click="gotoCategry(selectIndex + 1)">频道</a>
                    </li>
                    <li class="hot">
                        <a target="_self"  @click="gotoCategry(1)">热点</a>
                    </li>
                    <li class="gototop" v-show="showTopFlag">
                        <a target="_self" href="javascript:window.scrollTo(0,0)">顶部</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import HomeNewsItem from './comp/HomeNewsItem'
import HomeAdvItem from './comp/HomeAdvItem'
import dataCenter from '@/api/DataCenter'
import Utils from "@/js/Utils"
import CompatibleUtils from '@/js/CompatibleUtils'
let _this;
export default {
    components:{
        HomeNewsItem,
        HomeAdvItem
    },
    data(){
        return {
            currenNewIndex:0,
            todayWeather:"",
            showTopFlag:false,
            selectIndex:0,
            curPageIndex:1,
            isChange:false,
            titleList:[],
            newsList:[],
            twelveList:[],
            timeNewList:[],
            kitchenFlag:false,
            mainAction:null,
            rightAction:null,
            kitchenAction1:null,
            kitchenAction2:null,
        }
    },
    beforeMount(){
        this.mainAction = dataCenter.createAdvItem();
        this.rightAction = dataCenter.createAdvItem();
        this.kitchenAction1 = dataCenter.createAdvItem();
        this.kitchenAction2 = dataCenter.createAdvItem();
        this.mainAction.isFirst = false;
        this.rightAction.isFirst = false;
        this.kitchenAction1.isFirst = false;
        this.kitchenAction2.isFirst = false;
    },
    mounted(){
        _this = this;
        let url = window.location.href;
        let str1 = url.search("wow") >= 0 ? url.split("wow")[0] : "";
        if(str1 && str1.search("cateid=") >= 0){
            str1 = str1.split("cateid=")[1];
        } 
        dataCenter.getHomeInfo().then(res=>{
            if(res.code != 200) return;
            let data = res.data;
            let list = data.category;
            let arr = [];
            for(let i = 0;i < list.length;i++){
                let cate = list[i];
                arr.push({id:cate.cateId - 1,cateId:cate.cateId,cateName:cate.cateName})
            }
            _this.titleList = arr;
            let cateId = str1 ? str1 : arr[0].cateId;
            _this.gotoCategry(cateId);

            let news = [];
            let rnews = [];
            let sides = data.main_side;
            for(let i = 0;i < sides.length;i++){
                let side = sides[i];
                if(side.name == "part_1"){
                    news = side.data;
                    this.mainAction.setIDS(side.adv);
                }
                else if(side.name == "part_2"){
                    rnews = side.data;
                    this.rightAction.setIDS(side.adv);
                }
                else if(side.name == "part_3"){
                    this.kitchenAction1.setIDS(side.adv);
                }
                else if(side.name == "part_4"){
                    this.kitchenAction2.setIDS(side.adv);
                }
            }
            this.newsList = news;
            this.twelveList = rnews;
            this.kitchenFlag = true;
            this.$nextTick(()=>{
                this.mainAction.checkLoad();
                this.rightAction.checkLoad();
                this.kitchenAction1.checkLoad();
                this.kitchenAction2.checkLoad();
            }); 
        });
        dataCenter.getTimeNewsList().then(res=>{
            if(res.code != 200) return;
            let arr = res.data;
            if(arr && arr.length > 0){
                _this.timeNewList = arr.concat(arr[0]);
                _this.currenNewIndex = 1;
                _this.playTimeNews();
            }
        });
        document.title = "热点新闻";
        window.onscroll = this.listScroll.bind(this);
        window.onresize = this.listScroll.bind(this);
        this.listScroll();
    },
    methods:{
        listScroll(evt){
            this.mainAction.checkLoad();
            this.rightAction.checkLoad();
            this.kitchenAction2.checkLoad();
            let mEle = document.getElementsByClassName("an_middle")[0];
            let rEle = document.getElementsByClassName("an_right")[0];
            if(!mEle || !rEle) return;
            let xpos = mEle.offsetLeft || 0;
            let xwid = mEle.offsetWidth || 1200;
            let attrs = CompatibleUtils.getCompatibleValue();
            let scrollTop = attrs.scrollTop;
            let scrollHgt = attrs.scrollHeight;
            let clientHgt = attrs.clientHeight;
            let rsHgt = rEle.offsetHeight;
            this.showTopFlag = scrollTop >= clientHgt;
            if(scrollTop <= 60){
                rEle.style.position = "absolute";
                rEle.style.left = "";
                rEle.style.bottom = "";
                rEle.style.top = "";
            }
            else if(rsHgt <= clientHgt){
                rEle.style.position = "fixed";
                rEle.style.top = "0px";
                rEle.style.bottom = "";
                rEle.style.left = (xpos + xwid - 336 - 4) + "px";
            }
            else if(rsHgt - clientHgt < scrollTop - 10){
                rEle.style.position = "fixed";
                rEle.style.top = "";
                rEle.style.bottom = "10px";
                rEle.style.left = (xpos + xwid - 336 - 4) + "px";
            }
            else{
                rEle.style.position = "absolute";
                rEle.style.left = "";
                rEle.style.bottom = "";
                rEle.style.top = "";
            }
            if(scrollHgt - clientHgt <= scrollTop + 5 && scrollTop > 0 && !this.isChange){
                //到底了
                this.isChange = true;
                this.curPageIndex++;
                this.gotoCategry(this.selectIndex + 1);
            }
        },
        getCateName(){
            let list = this.titleList;
            let cname = "";
            for(let cate of list){
                if(cate.cateId == this.selectIndex + 1){
                    cname = cate.cateName;
                    break;
                }
            }
            return cname;
        },
        reloadHome(){
            window.location.reload();
        },
        gotoCategry(idx){
            if(idx - 1 != this.selectIndex){
                this.curPageIndex = 1;
            }
            this.selectIndex = idx - 1;
            let _this = this
            dataCenter.getNewsListById(idx,this.curPageIndex).then(res=>{
                _this.isChange = false;
                if(res.code != 200) return
                let news = res.data;
                this.mainAction.reset();
                this.mainAction.isFirst = false;
                _this.newsList = _this.curPageIndex <= 1 ? news : _this.newsList.concat(news)
                _this.$nextTick(()=>{
                    if(_this.curPageIndex <= 1){
                        window.scrollTo(0,0);
                    }
                    this.mainAction.checkLoad();
                });
            })
        },
        gotoNews(item){
            let turl = "https://news.dtxww.cn/content/?id="+item.id + "&cateid=" + item.cateId;
            window.open(turl, '_blank');
            return false;
        },
        playTimeNews(ele = null,isplay = false){
            if(!ele){
                ele = document.getElementsByClassName("an_title_scrollnews_ul")[0];
            }
            let ncontext = _this;
            if(isplay){
                ncontext.currenNewIndex = 0;
                ele.style.transition = "all 0s";
                ele.style.marginTop = "-25px";
                ncontext.currenNewIndex++;
                Utils.addDelay(()=>{
                    ncontext.playTimeNews(ele);
                },ncontext,100);
            }
            else{
                ele.style.transition = "all 1s";
                Utils.addDelay(()=>{
                    let len = ncontext.timeNewList.length;
                    let mtop = -ncontext.currenNewIndex * 25;
                    ele.style.marginTop = mtop + "px"
                    if(ncontext.currenNewIndex <= len){
                        ncontext.playTimeNews(ele);
                        ncontext.currenNewIndex++;
                    }
                    else{
                        ncontext.playTimeNews(ele,true);
                    }
                },this,3000);
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
    html {
        top:0;
        left: 0;
        height: 100%;
    }
    body {
        background: #f5f5f5;
        color:#222222;
        /* font: 14px/26px PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,Helvetica Neue,Arial,sans-serif; */
    }
    a {
        color: #333;
        text-decoration: none;
        cursor: pointer;
    }
    a:hover{ 
        color:#f24e4e;
    }
    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        -webkit-margin-before:0px;
    }
    .an_main {
        display: block;
        margin: 0 auto;
        height: 100%;
    }
    .an-title {
        width: 100%;
        height: 40px;
        background-color: #222222;
    }
    .an-title-div {
        width: 1100px;
    }
    .an-title-ul {
        white-space:nowrap;
        display: none;
        padding-top: 12px;
    }
    .an-title-ul li {
        margin:4px;
        padding: 0 5px 0 5px;
        display:inline-block;
    }
    .an_title_scrollnews_div {
        position: relative;
        top: 10px;
        height: 20px;
        overflow: hidden;
        margin: 0 auto;
        width: 440px;
    }
    .an_title_scrollnews_div div {
        float: left;
        color: #fff;
        margin-right: 5px;
    }
    .an_title_scrollnews_ul {
        float: left;
        text-align: left;
        position: relative;
        padding: 0px;
        margin-top: -25px;
        top: 4px;
        left: 72px;
    }
    .an_title_scrollnews_ul li {
        padding-bottom: 5px;
        height: 20px;
        overflow: hidden;
    }
    .an_title_scrollnews_ul li a {
        color: #fff;
        text-decoration: underline;
    }
    .an_title_scrollnews_ul li a:hover{
        color:#f24e4e;
    }
    .navLink {
        color: aliceblue;
        text-decoration: none;
    }
    .an_right_link {
        color: #222222;
        text-decoration: none;
    }
    .n_title_weather {
        position: absolute;
        top: -30px;
        right: 0px;
        overflow: hidden;
        height: 40px;
    }
    .an_middle {
        width: 1200px;
        position: relative;
        margin: 0 auto;
    }
    .an_left {
        width: 130px;
        top: 0;
        z-index: 999999;
    }
    .an_left_inner {
        position: fixed;
        top: 0 !important;
        width: 130px;
    }
    .an_title_logo {
        display: block;
        margin-left: -8px;
        cursor: pointer;
    }
    .an_title_logo img {
        width: 140px;
        height: 55px;
        transition: all 0.6s;
    }
    .an_title_logo img:hover {
        transform: scale(1.1);
    }
    .an_left_ul {
        list-style-type: none;
        font-weight: 500;
        text-align: center;
        background: #fff;
        padding-bottom: 10px;
        padding-top: 10px;
        border-radius: 8px;
    }
    .an_left_ul li {
        width:130px;
        height:38px;
    }
    .an_left_ul li a {
        display: block;
        height: 38px;
        line-height: 38px;
        border-radius: 4px;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        font-size: 16px;
        text-decoration: none;
        background: #fff;
        border-radius: 0;
        position: relative;
        cursor: pointer;
    }
    .an_left_ul li img {
        display: block;
        position: relative;
        top: -29px;
        left: 90px;
    }
    .an_content {
        width: 690px;
        position: relative;
        left: 140px;
        padding: 10px;
        top: 10px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        float: left;
    }
    .an_content p {
        font-size: 8px;
    }
    .an_content_item {
        width: 100%;
        overflow: hidden;
        zoom: 1;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        text-align: left;
    }
    .an_right {
        width: 336px;
        position: absolute;
        right: 0px;
        margin-right: 4px;
        margin-top:10px;
    }
    .an_right_container {
        background-color: #fff;
        padding:10px;
    }
    .an_right_today {
        font-size: 16px;
        font-weight: bold;
        display: block;
        line-height: 40px;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    .an_right_today img {
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 4px;
        margin-right: 5px;
    }
    .an_right_list {
        list-style: none;
        font-size: 14px;
        margin-block-start: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .an_right_list li {
        overflow: hidden;
        zoom: 1;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        margin-top: 10px;
    }
    .a_inactive:hover {
        background-color: #fff;
        color: #ff0000;
    }
    .a_active , .a_active:hover{
        background-color: #fff;
        color: #ff0000;
    }
    .a_active:after,.a_inactive:hover:after {
        content: " ";
        position: absolute;
        border-bottom: 2px solid #ff0000;
        bottom: 6px;
        left: 50%;
        width: 36px;
        margin-left: -18px;
    }
    .an_sidenav {
        position: fixed;
        margin-left: 1200px;
        margin-top: 30px;
        bottom: 30px;
    }
    .an_sidenav ul {
        list-style: none;
    }
    .an_sidenav li {
        width: 40px;
        height: 40px;
        margin-bottom: 2px;
        background-size: 32px 32px;
        background-repeat: no-repeat;
        /* background-color: #f97a7a; */
        background-color: #fff;
        background-position: center;
        border-radius: 2px;
    }
    .an_sidenav .home {
        background-image: url("../assets/home.png");
    }
    .an_sidenav .channel {
        background-image: url("../assets/menu.png");
    }
    .an_sidenav .hot {
        background-image: url("../assets/fire.png");
    }
    .an_sidenav .gototop {
        background-image: url("../assets/down.png");
    }
    .an_sidenav a {
        color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 2px;
        line-height: 40px;
        display: block;
        font-size: 12px;
        opacity: 0;
    }
    .an_sidenav a:hover{
        opacity: 1;
        color: #fff;
        background-color: #ff0000;
    }
    .adv_class_for_jsonup {
        width: 316px;
        height: 316px;
        display: block;
        overflow: hidden;
    }
    .adv_class_for_jsonup img {
        width: 316px;
        height: 316px;
        transition: all 0.6s;
    }
    .adv_class_for_jsonup img:hover {
        transform: scale(1.2);
    }
    .custom_tsz_ad_title {
        width: 100%;
        height: 45px;
        position: relative;
        top: -44px;
        color: #fff;
        text-align: left;
        overflow: hidden;
        padding: 4px 0px;
        background-color: rgba(0, 0, 0, 0.7);
    }
    .custom_tsz_ad_title a {
        color: #fff;
        text-align: left;
        font-size: 14px;
        line-height: 19px;
        overflow: hidden;
    }
    
</style>