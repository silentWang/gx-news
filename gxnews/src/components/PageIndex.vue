<template>
    <div class="an_main">
        <div class="an-title" id="toptitle">
            <!-- <div class="an-title-div">
                <ul class="an-title-ul">
                    <li v-for="item in titleList" :key="item.cateId">
                        <a  @click="gotoCategry(item.cateId)" class="navLink">{{item.cateName}}</a>
                    </li>
                </ul>
            </div> -->
            <div class="an_title_scrollnews_div">
                <div v-show="timeNewList.length > 0">今日热搜:</div>
                <ul class="an_title_scrollnews_ul">
                    <li v-for="item in timeNewList" :key="item.id">
                        <a :href="item.url" target="_blank">{{item.title}}</a>
                    </li>
                </ul>
            </div>
            <div class="n_title_weather">
                <iframe allowtransparency="true" frameborder="0" width="317" height="28" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&amp;z=1&amp;t=1&amp;v=0&amp;d=1&amp;bd=0&amp;k=000000&amp;f=ffffff&amp;ltf=ffffff&amp;htf=ffffff&amp;q=1&amp;e=0&amp;a=1&amp;c=54511&amp;w=317&amp;h=28&amp;align=right"></iframe>
            </div>
        </div>
        <div class="an_middle">
            <div class="an_left">
                <div class="an_left_inner">
                    <div class="an_title_logo" @click="reloadHome()">
                        <img src=".././assets/logo.png"/>
                    </div>
                    <ul class="an_left_ul">
                        <li v-for="item in titleList" 
                            :key="item.id"
                            @click="gotoCategry(item.cateId)">
                            <a target="_self" href='javascript:' :class="[item.id == selectIndex ? 'a_active' : 'a_inactive']">{{item.cateName}}</a>
                            <img v-show="item.id == selectIndex" src=".././assets/refresh.png">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="an_content">
                <div class="an_content-item" v-for="item in newsList" :key="curPageIndex + '_' + item.id">
                    <div v-if="item.type != 2">
                        <div class="an_content_image" @click="gotoNews(item.id)">
                            <a target="_blank"><img :src='item.pics[0]'/></a>
                        </div>
                        <div class="an_content_desc">
                            <div class="an_content_desc_inner" @click="gotoNews(item.id)">
                                <h2><a target="_blank" >{{item.title}}</a></h2>
                                <p class="an_content_info">
                                    <a target="_self" >{{titleList[selectIndex].cateName}}</a>&nbsp;
                                    <a target="_self"  v-show="item.from.length > 0">{{item.from}}</a>&nbsp;
                                    <span>{{item.time}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else @click="clkUxArt(item.id)" class="adver_common_class_u8x3032d3" v-html="item.title">
                    </div>
                </div>
            </div>
            <div class="an_right">
                <div class="an_right_container">
                    <div class="an_right_today"><img src=".././assets/yuandian.png"/>今日热点</div>
                    <ul class="an_right_list">
                        <li v-for="item in twelveList" :key="item.id">
                            <div v-if="item.type != 2">
                                <a class="image"  :title="item.title">
                                    <img :src="item.pics[0]" @click="gotoNews(item.id)">
                                </a>
                                <p>
                                    <a  :title="item.title" @click="gotoNews(item.id)">{{item.title}}</a>
                                </p>
                            </div>
                            <div v-else @click="clkUxArt(item.id)" class="adver_common_class_u8x2583456" v-html="item.title">
                            </div>
                        </li>
                    </ul>
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
import dataCenter from '@/api/DataCenter'
import Utils from "@/api/Utils"
import PageTemp from './PageTemp'
import ImageSlider from './news/ImageSlider'
let _this;
export default {
    components:{PageTemp,ImageSlider},
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
            timeNewList:[]
        }
    },
    mounted(){
        _this = this;
        dataCenter.getNewsList().then(res=>{
            if(res.code != 200) return;
            let list = res.data;
            let arr = [];
            for(let i = 0;i < list.length;i++){
                let cate = list[i];
                arr.push({id:cate.cateId - 1,cateId:cate.cateId,cateName:cate.cateName})
            }
            _this.titleList = arr;
            let query = this.$route.query;
            let cateId = arr[0].cateId;
            if(query && query.id >= 0){
                cateId = query.id;
            }
            _this.gotoCategry(cateId);
        })
        dataCenter.get24HoursNews().then(res=>{
            if(res.code != 200) return;
            _this.twelveList = res.data;
            _this.$nextTick(()=>{
                let eles = document.getElementsByClassName("adver_common_class_u8x2583456");
                for(let i = 0;i < eles.length;i++){
                    let ele = document.getElementsByClassName("adver_common_class_u8x2583456")[0];
                    Utils.changeAndExecuteJS(ele);
                }
            });
        })
        dataCenter.getTimeNewsList().then(res=>{
            if(res.code != 200) return;
            _this.timeNewList = res.data;
            if(res.data && res.data.length > 1){
                _this.currenNewIndex = 0;
                _this.playTimeNews();
            }
        });
        document.title = "热点新闻";
        window.onscroll = this.listScroll.bind(this);
        this.listScroll();
    },
    methods:{
        listScroll(evt){
            let mEle = document.getElementsByClassName("an_middle")[0];
            let rEle = document.getElementsByClassName("an_right")[0];
            let scrollTop = document.scrollingElement.scrollTop;
            let rsHgt = rEle.offsetHeight;
            let dcHgt = document.documentElement.scrollHeight;
            let chgt = document.documentElement.clientHeight;
            let fVal = 0;
            this.showTopFlag = scrollTop >= chgt;
            if(chgt >= rsHgt){
                fVal = scrollTop - 50 < 0 ? 0 : scrollTop - 50;
            }
            else if(rsHgt - chgt > scrollTop){
                fVal = 0;
            }
            else {
                fVal = scrollTop - rsHgt + chgt - 50;
            }
            rEle.style.top = fVal + "px";
            if(dcHgt - scrollTop <= chgt && scrollTop > 0 && !this.isChange){
                //到底了
                console.log("到底了")
                this.isChange = true;
                this.curPageIndex++;
                this.gotoCategry(this.selectIndex + 1);
            }
        },
        reloadHome(){
            window.location.reload();
        },
        clkUxArt(id){
            console.log("点击了gx   " + id);
        },
        gotoCategry(idx){
            this.selectIndex = idx - 1;
            let _this = this
            dataCenter.getNewsListById(idx,this.curPageIndex).then(res=>{
                _this.isChange = false;
                if(res.code != 200) return
                let news = res.data;
                _this.newsList = _this.newsList.concat(news);
                _this.$nextTick(()=>{
                    let eles = document.getElementsByClassName("adver_common_class_u8x3032d3");
                    for(let i = 0;i < eles.length;i++){
                        let ele = document.getElementsByClassName("adver_common_class_u8x3032d3")[0];
                        Utils.changeAndExecuteJS(ele);
                    }
                });
            })
        },
        gotoNews(idx){
            let routeUrl = this.$router.resolve({
                path: "/content",
                query: {id:idx}            
            });
            window.open(routeUrl.href, '_blank');
            return false;
        },
        playTimeNews(ele = null,isplay = false){
            if(!ele){
                ele = document.getElementsByClassName("an_title_scrollnews_ul")[0];
            }
            let ncontext = _this;
            if(isplay){
                ele.style.transition = "all 1s"
                ele.style.marginTop = "0px";
                ncontext.currenNewIndex++;
                ncontext.playTimeNews(ele)
            }
            else{
                ele.style.transition = "all 1s"
                setTimeout(() => {
                    let len = ncontext.timeNewList.length;
                    let mtop = -ncontext.currenNewIndex * 25;
                    ele.style.marginTop = mtop + "px"
                    if(ncontext.currenNewIndex < len){
                        ncontext.playTimeNews(ele);
                        ncontext.currenNewIndex++;
                    }
                    else{
                        ncontext.currenNewIndex = 0;
                        ele.style.transition = "width 1s"
                        ele.style.marginTop = "25px";
                        setTimeout(() => {
                            ncontext.playTimeNews(ele,true);
                        }, 100);
                    }
                }, 3000);
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
        width: 366px;
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
        margin: 0px;
        top: 0px;
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
        top: 10px;
        right: 280px;
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
    .an_content-item {
        width: 100%;
        overflow: hidden;
        zoom: 1;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }
    .an_content_image {
        display: block;
        background-color: #f1f1f1;
        overflow: hidden;
        width: 154px;
        height: 88px;
        float: left;
        margin-right: 15px;
    }
    .an_content_image a,.an_content_image img {
        display: block;
        background-color: #f1f1f1;
        overflow: hidden;
        width: 154px;
        height: 88px;
    }
    .an_content_image img {
        vertical-align: middle;
        width: 154px;
        height: auto;
    }
    .an_content_desc {
        width: 495px;
        height: 88px;
        float: left;
        position: relative;
    }
    .an_content_desc_inner {
        display: block;
        position: absolute;
        top: 50%;
        width: 100%;
        transform: (0,-50%);
        -webkit-transform: translate(0,-50%);
        -ms-transform: translate(0,-50%);
    }
    .an_content_desc_inner h2 {
        font-size: 20px;
        line-height: 1.3;
        margin-bottom: 4px;
        font-weight: 700;
        max-height: 52px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        cursor: pointer;
        text-align: left;
    }
    .an_content_info {
        font-size: 12px;
        color: #bbb;
        margin-top: 4px;
        text-align: left;
    }
    .an_content_info a {
        font-style: normal;
        border: 1px solid #eee;
        border-radius: 3px;
        padding: 2px 6px;
        color: #a0a0a0;
    }
    .an_content_info a:hover {
        border: 1px solid #f24e4e;
        border-radius: 3px;
        padding: 2px 6px;
        color: #f24e4e;
        font-style: normal;
    }
    .an_right {
        width: 336px;
        position: relative;
        float: right;
        right: 4px;
        margin-top:10px;
    }
    .an_right_container {
        background-color: #fff;
        padding: 0 10px 10px 10px;
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
        border-bottom: 1px solid #eee;
        margin-top: 10px;
    }
    .an_right_list li a.image {
        float: left;
        width: 100px;
        height: 57px;
        display: block;
        overflow: hidden;
        margin-right: 10px;
        background: #f1f1f1;
        position: relative;
        cursor: pointer;
    }
    .an_right_list li .image img {
        vertical-align: middle;
        transition: transform .5s ease-in;
    }
    .an_right_list li p {
        width: 206px;
        height: 54px;
        text-align: left;
        float: left;
        overflow: hidden;
        line-height: 25px;
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
        background-color: #ff0000;
    }
    
</style>