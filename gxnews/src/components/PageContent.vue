<template>
    <div class="cls_main">
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
        <div class="n_main">
            <div class="n_left">
                <ul class="n_up_list">
                    <h3>今日热点</h3>
                    <li v-for="item in todayHots" :key="item.id">
                        <div id="pic">
                            <img :src="item.pics[0]" @click="gotoNews(item.cateId)"/>
                        </div>
                        <div style="n_left_list_news_title" @click="gotoNews(item.cateId)">
                            <a class="n_left_link" href="javascript:">{{item.title}}</a>
                            <div class="n_left_list_news_author" @click="gotoNews(item.cateId)">来源:{{item.from}}</div>
                        </div>
                    </li>
                </ul>
                <ImageSlider></ImageSlider>
                <ul class="n_up_list">
                    <h3>小编精选</h3>
                    <li v-for="item in choseHots" :key="item.id">
                        <div id="pic">
                            <img :src="item.pics[0]" @click="gotoNews(item.cateId)"/>
                        </div>
                        <div style="n_left_list_news_title" @click="gotoNews(item.cateId)">
                            <a class="n_left_link" href="javascript:">{{item.title}}</a>
                            <div class="n_left_list_news_author" @click="gotoNews(item.cateId)">来源:{{item.from}}</div>
                        </div>
                    </li>
                </ul>
                <ul class="n_up_list">
                    <h3>视角</h3>
                    <li v-for="item in viewHots" :key="item.id">
                        <div id="pic">
                            <img :src="item.pics[0]" @click="gotoNews(item.cateId)"/>
                        </div>
                        <div style="n_left_list_news_title" @click="gotoNews(item.cateId)">
                            <a class="n_left_link" href="javascript:">{{item.title}}</a>
                            <div class="n_left_list_news_author" @click="gotoNews(item.cateId)">来源:{{item.from}}</div>
                        </div>
                    </li>
                </ul>
                <ImageSlider></ImageSlider>
            </div>
            <div class="n_content">
                <h2>{{detailInfo.title}}</h2>
                <br />
                <p class="n_content_from" v-show="detailInfo.updated_at ? true : false">发布时间: {{detailInfo.updated_at}}</p>
                <br />
                <div class="cls_newscontent" v-html="detailInfo.content">
                </div>
                <ul class="n_next_list">
                    <li v-for="item in nextHots" :key="item.id">
                        <div id="next_pic">
                            <img :src="item.pics[0]" @click="gotoNews(item.cateId)"/>
                        </div>
                        <div class="n_next_list_news_title_content" @click="gotoNews(item.cateId)">
                            <a class="n_left_link" href="javascript:"><h3>{{item.title}}</h3></a>
                            <div class="n_next_list_news_author" @click="gotoNews(item.cateId)">
                                <span class="tags_wrapper">
                                    <a href="javascript:">娱乐</a>
                                </span>
                                <span class="tags_from">来源:{{item.from ? item.from:"未知"}}</span>
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
            info.content = this.escapeHtml(info.content);
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
                    this.todayHots = info.list
                }
                if(info.name == "视角"){
                    this.todayHots = info.list
                }
            }

        })
        getDetailDownNews().then(res=>{
            if(res.code != 200) return
            this.nextHots = res.data
        })
    },
    methods:{
        gotoCategry(idx){
            let routeUrl = this.$router.resolve({
                path: "/",
                query: {id:idx}
            });
            window.open(routeUrl.href, '_blank');
        },
        escapeHtml(str) {
            var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
            str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
            str = str.replace(/gif@/g,'gif?@');
            return str.replace(/padding-bottom:( ?)[0-9]+(.?)\d+%/g,"");
        }
    }
}
</script>
<style>
    * {
        margin:0px;
        padding:0px;
    }
    a:hover{ 
        color:#f24e4e;
    }
    hr {
        width: 100%;
        color:#f24e4e;
        height: 2px;
    }
    .n_left_link {
        color: #222222;
        text-decoration: none;
    }
    .cls_main {
        margin: 0 auto;
    }
    .n-title {
        width: 100%;
        height: 55px;
        background-color: #222222;
    }
    .n-title-div {
        width: 1200px;
    }
    .n-title-ul {
        padding-top: 12px;
        white-space:nowrap;
        display: block;
    }
    .n-title-logo {
        position: relative;
        display: block;
        float: left;
        left: 80px;
        top: -57px;
        cursor: pointer;
    }
    .n-title-logo img {
        width: 140px;
        height: 55px;
        margin-top: 16px;
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
    .n_main {
        margin: 0 auto;
        display: flex;
        flex-direction: row;
    }
    .n_left {
        display: flex;
        flex-direction: column;
        margin-top:10px;
    }
    .n_content {
        width: 660px;
        text-align: left;
        margin: 25px 0 0 25px;
    }
    .n_content_from {
        color: #999;
    }
    .n_content img {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    h3 {
        padding-left: 20px;
    }
    .n_up_list {
        width: 350px;
        text-align: left;
        list-style-type: none;
        margin: 0 auto;
        padding:0 10px 0 10px;
        margin-left: 0;
        border-top: 2px solid #ff0000;
        background-color: #f7f7f7;
        font-size: 15px;
    }
    .n_up_list li {
        margin: 10px 0 10px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }
    .n_left_list_news_title {
        width:220px;
        height: 68px;
        word-break:break-all;
        size: 14px;
        cursor: pointer;
    }
    .n_left_list_news_title a {
        cursor: pointer;
    }
    .n_left_list_news_author{
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
    .cls_newsdetail {
        /* width: 100%; */
        /* margin: 0 auto; */
        text-align: left;
    }
    .cls_newscontent {
        display: block;
    }
    .cls_newscontent img {
        display: block;
        margin: 0 auto;
    }
    .n_next_list{
        text-align: left;
        list-style-type: none;
        margin: 0 auto;
        padding:0 10px 0 10px;
        margin-left: 0;
    }
    .n_next_list li {
        display: flex;
        flex-direction: row;
        word-break:break-all;
        cursor: pointer;
        border-bottom:1px solid #ddd;
        margin: 10px 0 10px 0;
        padding: 5px 0 10px 0;
    }
    .n_next_list_news_title_content {
        padding-top: 10px;
    }
    #next_pic img {
        width: 168px;
        height: 92px;
        margin-right: 5px;
        cursor: pointer;
    }
    .n_next_list_news_author {
        padding-left: 20px;
        padding-top: 18px;
    }
    .tags_wrapper a {
        width: 28px;
        height: 18px;
        font-size: 12px;
        border: 1px #f24e4e solid;
        border-radius: 5px;
        padding-left: 2px;
        padding-top: 1px;
        color: #f24e4e;
        text-decoration: none;
    }
    .tags_from { 
        padding-left: 20px;
        color: #999;
        font-size: 12px;
    }

</style>