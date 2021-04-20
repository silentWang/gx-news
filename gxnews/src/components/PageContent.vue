<template>
    <div class="cls_main">
        <div class="bn_title">
            <div class="bn_title_div">
                <ul class="bn_title_ul">
                    <div class="bn_title_logo" @click="reloadHome()">
                        <img src=".././assets/logo.png"/>
                    </div>
                    <li v-for="item in titleList" :key="item.cateId">
                        <a href="javascript:" @click="gotoCategry(item.cateId)" class="navLink">{{item.cateName}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bn_main">
            <div class="bn_left">
                <ul class="n_up_list">
                    <h3>今日热点</h3>
                    <li v-for="item in todayHots" :key="item.id">
                        <a class="image" href="javascript:" :title="item.title">
                            <img :src="item.pics[0]" @click="gotoNews(item.cateId)">
                        </a>
                        <p>
                            <a href="javascript:" :title="item.title" @click="gotoNews(item.id)">{{item.title}}</a>
                        </p>
                    </li>
                </ul>
                <ul class="n_up_list">
                    <h3>小编精选</h3>
                    <li v-for="item in choseHots" :key="item.id">
                        <a class="image" href="javascript:" :title="item.title">
                            <img :src="item.pics[0]" @click="gotoNews(item.cateId)">
                        </a>
                        <p>
                            <a href="javascript:" :title="item.title" @click="gotoNews(item.id)">{{item.title}}</a>
                        </p>
                    </li>
                </ul>
                <ul class="n_up_list">
                    <h3>视角</h3>
                    <li v-for="item in viewHots" :key="item.id">
                        <a class="image" href="javascript:" :title="item.title">
                            <img :src="item.pics[0]" @click="gotoNews(item.cateId)">
                        </a>
                        <p>
                            <a href="javascript:" :title="item.title" @click="gotoNews(item.id)">{{item.title}}</a>
                        </p>
                    </li>
                </ul>
                <!-- <ImageSlider></ImageSlider> -->
            </div>
            <div class="bn_content">
                <h1>{{detailInfo.title}}</h1>
                <br/>
                <div class="bn_content_second_title">
                    <span v-show="detailInfo.updated_at ? true : false">{{detailInfo.source_time}}&nbsp;&nbsp;&nbsp;{{detailInfo.source_from}}</span>
                    <a target="_blank" href="javascript:">博主</a>
                </div>
                <br />
                <div class="cls_newscontent" v-html="detailInfo.content"></div>
                <ul class="n_next_list">
                    <li v-for="item in nextHots" :key="item.id">
                        <div id="next_pic">
                            <a href="javascript:" target="_blank">
                                <img :src="item.pics[0]" @click="gotoNews(item.id)"/>
                            </a>
                        </div>
                        <div class="n_next_list_news_title_content">
                            <div>
                                <a class="bn_left_link" href="javascript:" @click="gotoNews(item.id)">{{item.title}}</a>
                            </div>
                            <div class="n_next_list_news_tag" @click="gotoNews(item.id)">
                                <span class="tags_wrapper">
                                    <a href="#">娱乐</a>&nbsp;
                                    <a href="#">新闻</a>&nbsp;
                                </span>
                                <span>{{item.time}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {getNewsList,getNewsDetailById,getDetailLeftNews,getDetailDownNews} from '@/api/Api'
import Utils from "@/api/Utils"
import ImageSlider from './news/ImageSlider'
export default {
    components:{ImageSlider},
    data(){
        return {
            titleList:[],
            todayHots:[],
            choseHots:[],
            viewHots:[],
            nextHots:[],
            detailInfo:{}
        }
    },
    created(){
        let query = this.$route.query;
        if(!query && !query.id) {
            this.$router.push({path:'/'});
            return;
        }
        let _this = this;
        //only test
        // setTimeout(() => {
        //     let title = document.getElementsByClassName("bn_title_logo")[0];
        //     let evt = document.createEvent("UIEvent");
        //     evt.initEvent("click",false,false);
        //     evt.clientX = title.clientLeft;
        //     evt.clientY = title.clientLeft;
        //     title.dispatchEvent(evt);
        // }, 1000);


        getNewsList().then(res=>{
            if(res.code != 200) return;
            let list = res.data;
            let arr = [];
            for(let i = 0;i < list.length;i++){
                let cate = list[i];
                arr.push({id:cate.cateId,cateId:cate.cateId,cateName:cate.cateName})
            }
            _this.titleList = arr;
        })
        getNewsDetailById(query.id).then(res=>{
            if(res.code != 200) {
                this.$router.push({path:'/'});
                return;
            }
            let info = res.data;
            info.content = Utils.escapeHtml(info.content);
            _this.detailInfo = info;
        })

        getDetailLeftNews().then(res=>{
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
        })
        getDetailDownNews().then(res=>{
            if(res.code != 200) return
            this.nextHots = res.data
            // this.todayHots = res.data
            // this.choseHots = res.data
            // this.viewHots = res.data
        })
    },
    methods:{
        reloadHome(evt){
            let routeUrl = this.$router.resolve({
                path: "/"
            });
            // this.$router.push({path:"/"});
            window.open(routeUrl.href);
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
    .bn_left_link {
        color: #222222;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
    }
    .cls_main {
        margin: 0 auto;
        background: #f5f5f5;
    }
    .bn_title {
        width: 100%;
        height: 40px;
        background-color: #222222;
    }
    .bn_title_ul {
        padding-top: 5px;
        white-space:nowrap;
        display: block;
    }
    .bn_title_logo {
        position: absolute;
        display: inline-block;
        cursor: pointer;
        margin-left: -160px;
        top: -5px;
    }
    .bn_title_logo img {
        width: 140px;
        height: 55px;
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
        padding-top: 10px;
        padding-left: 118px;
        margin: 0 auto;
    }
    .bn_left {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        width: 336px;
        margin-top:10px; 
        padding: 10px;
        float: left;
    }
    .bn_content {
        width: 780px;
        margin: 25px 0 0 10px;
        background: #fff;
        padding: 10px;
        margin-top: 10px;
        display: block;
        float: left;
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
    }
    .n_up_list li a.image {
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
    .n_up_list li .image img {
        vertical-align: middle;
        transition: transform .5s ease-in;
    }
    .n_up_list li p {
        width: 206px;
        height: 54px;
        text-align: left;
        float: left;
        overflow: hidden;
        line-height: 25px;
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
    #pic img{
        width: 118px;
        height: 66px;
        margin-right: 5px;
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
        display: block;
        margin: 0 auto;
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
    #next_pic {
        width: 177px;
        height: 100px;
        float: left;
        margin-right: 15px;
        background-color: #f1f1f1;
    }
    #next_pic a {
        width: 177px;
        height: 100px;
        display: block;
        overflow: hidden;
    }
    #next_pic img {
        width: 177px;
        overflow: hidden;
        padding: 0px;
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
    .tags_wrapper a {
        border: 1px solid #eee;
        border-radius: 3px;
        padding: 2px 6px;
        color: #a0a0a0;
        font-style: normal;
    }
    .tags_wrapper a:hover {
        border: 1px solid #f24e4e;
        border-radius: 3px;
        padding: 2px 6px;
        color: #f24e4e;
        font-style: normal;
    }
    .tags_from { 
        padding-left: 20px;
        color: #999;
        font-size: 12px;
    }

</style>