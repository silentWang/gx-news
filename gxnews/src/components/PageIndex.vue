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
        <div class="n_left">
            <div class="n_left_inner">
                <div class="n_title_logo" @click="reloadHome()">
                    <img src=".././assets/logo.png"/>
                </div>
                <ul class="n-left-ul">
                    <li v-for="item in titleList" 
                        :key="item.id"
                        @click="gotoCategry(item.cateId)">
                        <a target="_self" href='javascript:' :class="[item.id == selectIndex ? 'active' : 'inactive']">{{item.cateName}}</a></li>
                </ul>
            </div>
        </div>
        <div class="n-middle">
            <div class="n-content">
                <div v-show="showHomeFlag" class="n-content-item" v-for="item in newsList" :key="item.id">
                    <div class="n_content_image" @click="gotoNews(item.id)">
                        <a target="_blank" href="javascript:"><img :src='item.pics[0]'/></a>
                    </div>
                    <div class="n_content_desc">
                        <div class="n_content_desc_inner" @click="gotoNews(item.id)">
                            <h2><a target="_blank" href="javascript:">{{item.title}}</a></h2>
                            <p class="n_content_info">
                                <a target="_self" href="javascript:">{{titleList[selectIndex].cateName}}</a>&nbsp;
                                <a target="_self" href="javascript:">{{item.from}}</a>&nbsp;
                                <span>{{item.time}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <!-- <PageTemp ref="pageTemp" v-show="!showHomeFlag"></PageTemp> -->
            </div>
            <div class="n_right">
                <ImageSlider></ImageSlider>
                <div class="n_right_container">
                    <div class="n_right_today">今日热点</div>
                    <ul class="n_right_list">
                        <li v-for="item in twelveList" :key="item.id">
                            <a class="image" href="javascript:" :title="item.title">
                                <img :src="item.pics[0]" @click="gotoNews(item.id)">
                            </a>
                            <p>
                                <a href="javascript:" :title="item.title">{{item.title}}</a>
                            </p>
                        </li>
                    </ul>
                </div>
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
        // window.onscroll = this.listScroll;
        // this.listScroll();
    },
    methods:{
        listScroll(evt){
            let div = document.getElementsByClassName("n_left")[0];
            let titlediv = document.getElementsByClassName("n-main")[0];
            let logo = document.getElementsByClassName("n_title_logo")[0];
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
        color:#222222;
        font: 14px/26px PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,Helvetica Neue,Arial,sans-serif;
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
    .n-main {
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
        width: 1280px;
        margin-left: 188px;
        float:left;
    }
    .n_left {
        width: 130px;
        height: auto;
        position: absolute;
        top: 0;
        left: 222px;
        z-index: 999999;
    }
    .n_left_inner {
        position: fixed;
        top: 0 !important;
        width: 130px;
    }
    .n_title_logo {
        display: block;
        margin-left: -8px;
        cursor: pointer;
    }
    .n_title_logo img {
        width: 140px;
        height: 55px;
    }
    .n-left-ul {
        list-style-type: none;
        font-weight: 500;
        text-align: center;
        background: #fff;
        padding-top: 10px;
        border-radius: 8px;
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
        width: 690px;
        margin: 10px 15px 10px 180px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        float: left;
    }
    .n-content p {
        font-size: 8px;
    }
    .n-content-item {
        width: 100%;
        overflow: hidden;
        zoom: 1;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }
    .n_content_image {
        display: block;
        background-color: #f1f1f1;
        overflow: hidden;
        width: 154px;
        height: 88px;
        float: left;
        margin-right: 15px;
    }
    .n_content_image a,.n_content_image img {
        display: block;
        background-color: #f1f1f1;
        overflow: hidden;
        width: 154px;
        height: 88px;
    }
    .n_content_image img {
        vertical-align: middle;
        width: 154px;
        height: auto;
    }
    .n_content_desc {
        width: 495px;
        height: 88px;
        float: left;
        position: relative;
    }
    .n_content_desc_inner {
        display: block;
        position: absolute;
        top: 50%;
        width: 100%;
        transform: (0,-50%);
        -webkit-transform: translate(0,-50%);
        -ms-transform: translate(0,-50%);
    }
    .n_content_desc_inner h2 {
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
    .n_content_info {
        font-size: 12px;
        color: #bbb;
        margin-top: 4px;
        text-align: left;
    }
    .n_content_info a {
        font-style: normal;
        border: 1px solid #eee;
        border-radius: 3px;
        padding: 2px 6px;
        color: #a0a0a0;
    }
    .n_right {
        width: 336px;
        float: right;
        margin-right: 35px;
        margin-top:10px;
    }
    .n_right_container {
        background-color: #fff;
        padding: 0 10px 10px 10px;
    }
    .n_right_today {
        font-size: 16px;
        font-weight: bold;
        padding-left: 20px;
        display: block;
        line-height: 40px;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    .n_right_list {
        list-style: none;
        font-size: 14px;
        margin-block-start: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .n_right_list li {
        overflow: hidden;
        zoom: 1;
    }
    .n_right_list li a.image {
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
    .n_right_list li .image img {
        vertical-align: middle;
        transition: transform .5s ease-in;
    }
    .n_right_list li p {
        width: 206px;
        height: 54px;
        text-align: left;
        float: left;
        overflow: hidden;
        line-height: 25px;
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