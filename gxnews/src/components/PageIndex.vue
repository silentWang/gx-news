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
            <div class="n-title-logo" @click="reloadHome()">
                <img src=".././assets/logo.png"/>
            </div>
        </div>
        <div class="n-left">
            <ul class="n-left-ul">
                <li v-for="item in titleList" 
                    :key="item.id" 
                    :class="[item.id == selectIndex ? 'n-left-selected':'n-left-notselected']"
                    @click="gotoCategry(item.cateId)">{{item.cateName}}</li>
            </ul>
        </div>
        <div class="n-middle">
            <div class="n-content">
                <div v-show="showHomeFlag" class="n-content-item" v-for="item in newsList" :key="item.id">
                    <h3 @click="gotoNews(item.id)">{{item.title}}</h3>
                    <div class="n-content-item-list" @click="gotoNews(item.id)">
                        <img v-for="index in item.pics" :key="index" :src='index'/>
                    </div>
                    <!-- <p @click="gotoNews(item.id)">来源：{{item.author+"     "+item.time}}</p> -->
                </div>
                <PageTemp ref="pageTemp" v-show="!showHomeFlag"></PageTemp>
            </div>
            <div class="n-right">
                <ImageSlider></ImageSlider>
                <ul class="n-right-list">
                    <h3>24小时排行榜</h3>
                    <li v-for="item in twelveList" :key="item.id">
                        <div id="pic">
                            <img :src="item.pics[0]" @click="gotoNews(item.cateId)"/>
                        </div>
                        <div style="n-right-list-news-title" @click="gotoNews(item.cateId)">
                            <a href="javascript:">{{item.title}}</a>
                            <div class="n-right-list-news-author" v-show="item.from ? true : false" @click="gotoNews(item.cateId)">来源:{{item.from}}</div>
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
            _this.gotoCategry(arr[0].cateId - 1);
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
            if(document.scrollingElement.scrollTop <= 80){
                div.style.position = 'fixed';
                div.style.top = '100px';
            }
            else{
                div.style.position = 'fixed';
                div.style.top = '0px';
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
            let _this = this
            getNewsDetailById(idx).then(res=>{
                if(res.code != 200) return
                console.log(res)
                _this.showHomeFlag = false;
                _this.$refs.pageTemp.setData(res.data);
            })
        }
    }
}
</script>
<style>
    .n-main {
        width: 1400px;
        display: block;
        margin: 0 auto;
    }
    .n-title {
        width: 100%;
        height: 30px;
        background-color: #222222;
    }
    .n-title-div {
        width: 880px;
    }
    .n-title-ul {
        white-space:nowrap;
        display: block;
    }
    .n-title-logo {
        position: relative;
        display: block;
        float: left;
        left: 40px;
        top: -60px;
        cursor: pointer;
    }
    .n-title-logo img {
        width: 120px;
        height: 66px;
    }
    .n-title-ul li {
        margin:4px;
        display:inline-block;
    }
    .navLink {
        color: aliceblue;
    }
    .n-middle {
        margin-left: 160px;
        display: flex;
        flex-direction: row;
    }
    .n-left {
        position: fixed;
        top: 0;
        z-index: 100;
    }
    .n-left-ul {
         list-style-type: none;
         font-weight: 500;
    }
    .n-left-ul li {
        display: block;
        width: 110px;
        height: 30px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        margin:3px 0 3px 0;
        padding-top: 5px;
        cursor: pointer;
    }
    .n-left-selected {
        color: #fff;
        background-color: #ff0000;
    }
    .n-left-notselected {
        color: #000;
        background-color: #fff;
    }
    .n-content {
        width: 660px;
        margin: 10px;
        padding: 0px 10px 0px 10px;
        display: flex;
        flex-direction: column;
    }
    .n-content-item {
        width: 100%;
        display: block;
        position: relative;
        margin-top: 2px;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    .n-content-item h3 {
        cursor: pointer;
    }
    .n-content-item-list img {
        width: 156px;
        height: 88px;
        margin: 0px 2px 0px 2px;
        cursor: pointer;
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
    .n-right-adver {
        display: block;
        margin: 0 auto;
        cursor: pointer;
    }
    .n-right-adver img {
        width: 236px;
        height: 240px;
        cursor: pointer;
    }
    .n-right-list {
        width: 350px;
        text-align: left;
        list-style-type: none;
        border-top: 5px solid #ff0000;
        margin: 0 auto;
        padding-left: 0;
        margin-left: 0;
    }
    .n-right-list li {
        margin:3px 0 3px 0;
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
        size: 14px;
        cursor: pointer;
    }
    .n-right-list-news-title a {
        cursor: pointer;
    }
    .n-right-list-news-author{
        display: block;
        position: relative;
        bottom: 0px;
        size: 14px;
        color: #9b9597;
        cursor: pointer;
    }
    
</style>