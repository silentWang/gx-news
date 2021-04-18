<template>
    <div class="n-main">
        <div class="n-title">
            <div class="n-title-div">
                <ul class="n-title-ul">
                    <li v-for="item in titleList" :key="item.cateId">
                        <a href="javascript:" @click="gotoCategry(item.cateId)" class="navLink">{{item.cateName}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="n-title-logo" @click="reloadHome()">
            <img src=".././assets/logo.png"/>
        </div>
        <div class="n-left">
            <ul class="n-left-ul">
                <li v-for="item in titleList" 
                    :key="item.id"
                    @click="gotoCategry(item.cateId)">
                    <a target="_self" href='javascript:' :class="[item.id == selectIndex ? 'active' : 'inactive']">{{item.cateName}}</a></li>
            </ul>
        </div>
        <div class="n-middle">
            <div class="n-content">
                <div v-show="showHomeFlag" class="n-content-item" v-for="item in newsList" :key="item.id">
                    <a class="n_right_link" href="javascript:"><h3 @click="gotoNews(item.id)">{{item.title}}</h3></a>
                    <div class="n-content-item-list" @click="gotoNews(item.id)">
                        <img v-for="index in item.pics" :key="index" :src='index'/>
                        <div class="n-conten-show-more">查看详情></div>
                    </div>
                    <p @click="gotoNews(item.id)">{{item.from}}&nbsp;&nbsp;{{item.time}}</p>
                </div>
                <!-- <PageTemp ref="pageTemp" v-show="!showHomeFlag"></PageTemp> -->
            </div>
            <div class="n-right">
                <ImageSlider></ImageSlider>
                <ul class="n-right-list">
                    <h3>24小时排行榜</h3>
                    <li v-for="item in twelveList" :key="item.id">
                        <div id="pic">
                            <img :src="item.pics[0]" @click="gotoNews(item.id)"/>
                        </div>
                        <div style="n-right-list-news-title" @click="gotoNews(item.id)">
                            <a class="n_right_link" href="javascript:">{{item.title}}</a>
                            <div class="n-right-list-news-author" @click="gotoNews(item.id)">{{item.from}}&nbsp;&nbsp;&nbsp;{{item.time}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {getNewsList,getNewsListById,getNewsDetailById,get24HoursNews} from '@/api/Api'
import PageTemp from './PageTemp'
import ImageSlider from './news/ImageSlider'
export default {
    components:{PageTemp,ImageSlider},
    data(){
        return {
            msg:"这是首页新闻列表",
            showHomeFlag:true,
            selectIndex:0,
            titleList:[],
            newsList:[],
            twelveList:[]
        }
    },
    mounted(){
        let _this = this;
        getNewsList().then(res=>{
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
            if(!query && !query.id) {
                cateId = query.id;
            }
            console.log("queryid:",query.id)
            _this.gotoCategry(cateId);
        })
        get24HoursNews().then(res=>{
            if(res.code != 200) return;
            _this.twelveList = res.data;
        })
        window.onscroll = this.listScroll;
        this.listScroll();
    },
    methods:{
        listScroll(evt){
            let div = document.getElementsByClassName("n-left")[0];
            let titlediv = document.getElementsByClassName("n-main")[0];
            let logo = document.getElementsByClassName("n-title-logo")[0];
            let left = titlediv.offsetLeft;
            let num = parseInt(left) + 50;
            div.style.left = num + "px";
            if(document.scrollingElement.scrollTop <= 80){
                div.style.top = '70px';
                logo.style.top = "0px"
            }
            else{
                div.style.top = '70px';
                logo.style.top = "0px"
            }
        },
        reloadHome(){
            window.location.reload();
        },
        gotoCategry(idx){
            this.selectIndex = idx - 1;
            this.showHomeFlag = true;
            let _this = this
            getNewsListById(idx).then(res=>{
                if(res.code != 200) return
                _this.newsList = res.data
            })
        },
        gotoNews(idx){
            let routeUrl = this.$router.resolve({
                path: "/content",
                query: {id:idx}            });
            window.open(routeUrl.href, '_blank');
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
    a:hover{ 
        color:#f24e4e;
    }
    .n-main {
        width: 1400px;
        display: block;
        margin: 0 auto;
    }
    .n-title {
        width: 100%;
        height: 40px;
        background-color: #222222;
    }
    .n-title-div {
        width: 1100px;
    }
    .n-title-ul {
        white-space:nowrap;
        display: none;
        padding-top: 12px;
    }
    .n-title-logo {
        position: fixed;
        display: block;
        float: left;
        left: 45px;
        cursor: pointer;
    }
    .n-title-logo img {
        width: 140px;
        height: 55px;
    }
    .n-title-ul li {
        margin:4px;
        padding: 0 5px 0 5px;
        display:inline-block;
    }
    .navLink {
        color: aliceblue;
        text-decoration: none;
    }
    .n_right_link {
        color: #222222;
        text-decoration: none;
    }
    .n-middle {
        margin-left: 200px;
        display: flex;
        flex-direction: row;
    }
    .n-left {
        position: fixed;
        left: 50px;
        top:20px;
        z-index: 100;
        background: #eee;
    }
    .n-left-ul {
         list-style-type: none;
         font-weight: 500;
         text-align: center;
         background: #fff;
         padding-top: 10px;
    }
    .n-left-ul li {
        width:130px;
    }
    .n-left-ul li a {
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
        color:#333;
    }
    .n-content {
        width: 750px;
        margin: 10px;
        padding: 0px 10px 0px 10px;
        display: flex;
        flex-direction: column;
    }
    .n-content p {
        font-size: 8px;
    }
    .n-content-item {
        width: 100%;
        display: block;
        position: relative;
        margin-top: 2px;
        text-align: left;
        padding-bottom: 10px;
        padding-top: 10px;
        border-bottom: 1px solid #eee;
    }
    .n-content-item h3 {
        cursor: pointer;
    }
    .n-content-item-list {
        display: flex;
        flex-direction: row;
        margin: 10px 0 10px 0;
    }
    .n-content-item-list img {
        width: 156px;
        height: 88px;
        margin: 0px 4px 0px 4px;
        cursor: pointer;
    }
    .n-conten-show-more {
        width: 156px;
        height: 52px;
        padding-top: 36px;
        margin: 0px 2px 0px 2px;
        background-color: #f5f5f5;
        color: #95bade;
        cursor: pointer;
        text-align: center;
    }
    .n-content-item p {
        size: 12px;
        color: #999;
        cursor: pointer;
    }
    .n-right {
        display: flex;
        flex-direction: column;
        margin-top:10px;
    }
    .n-right-list {
        width: 350px;
        text-align: left;
        list-style-type: none;
        border-top: 5px solid #ff0000;
        margin: 0 auto;
        padding-left: 0;
        margin-left: 0;
        font-size: 15px;
    }
    .n-right-list li {
        margin: 10px 0 10px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }
    #pic img{
        width: 118px;
        height: 66px;
        margin-right: 5px;
        cursor: pointer;
    }
    .n-right-list-news-title {
        width:220px;
        height: 68px;
        word-break:break-all;
        font-size: 14px;
        cursor: pointer;
    }
    .n-right-list-news-title a {
        cursor: pointer;
    }
    .n-right-list-news-author{
        display: block;
        position: relative;
        bottom: 0px;
        font-size: 12px;
        color: #9b9597;
        cursor: pointer;
    }
    .inactive:hover {
        background-color: #fff;
        color: #ff0000;
    }
    .active , .active:hover{
        background-color: #fff;
        color: #ff0000;
    }
    .active:after,.inactive:hover:after {
        content: " ";
        position: absolute;
        border-bottom: 2px solid #ff0000;
        bottom: 6px;
        left: 50%;
        width: 36px;
        margin-left: -18px;
    }
    
</style>