<template>
    <div class="mini_main">
        <div class="mini_main_title">
            <ul class="mini_main_title_ul">
                <li v-for="(item) in titleList" :key="item.cateId">
                    <a @click="gotoCategry(item.cateId)" :class="[selectIndex == item.id ? 'mini_navLink_selected':'mini_navLink']">{{item.cateName}}</a>
                </li>
            </ul>
        </div>
        <div class="mini_right">
            <ul class="mini_right_list">
                <li v-for="(item,index) in rightList" :key="index + '_' +item.id + '_' + item.type">
                    <div v-if="item.type != 2">
                        <NewsSlider v-on:gotoNews="gotoNews" :nsId="index" nWidth="244" nHeight="128" v-bind:newsList="getSlideNewsList(item.list)"></NewsSlider>
                        <!-- <a class="mini_right_list_image"  :title="item.list.title">
                            <img :src="item.list.pics[0]" @click="gotoNews(item.list.id)">
                        </a>
                        <a class="mini_right_list_title" :title="item.list.title" @click="gotoNews(item.list.id)">{{item.list.title}}</a> -->
                    </div>
                    <div v-else @click="clkUxArt(item.id)" class="adver_common_class_u8x2583456" v-html="item.list">
                    </div>
                </li>
            </ul>
        </div>
        <div class="mini_middle" @scroll="scrollHandler">
            <!-- <div class="n_title_weather">
                <iframe allowtransparency="true" frameborder="0" width="317" height="28" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&amp;z=1&amp;t=1&amp;v=0&amp;d=1&amp;bd=0&amp;k=000000&amp;f=ffffff&amp;ltf=ffffff&amp;htf=ffffff&amp;q=1&amp;e=0&amp;a=1&amp;c=54511&amp;w=317&amp;h=28&amp;align=right"></iframe>
            </div> -->
            <div class="mini_content">
                <div class="mini_content_item" v-for="(item,index) in pageNewsList" :key="index + '_' + item.id + '_' + item.type">
                    <div v-if='item.type == 2' class="adver_common_class_u8xef3e23d" v-html="item.title">
                    </div>
                    <div v-else-if="item.pics.length >= 3">
                        <a target="_blank" @click="gotoNews(item.id)">{{item.title}}</a>
                        <div class="mini_content_image" @click="gotoNews(item.id)">
                            <a target="_blank"><img :src='item.pics[0]'/></a>
                            <a target="_blank"><img :src='item.pics[1]'/></a>
                            <a target="_blank"><img :src='item.pics[2]'/></a>
                            <div class="mini_content_more" target="_blank"><span>查看更多>></span></div>
                        </div>
                        <span class="mini_content_image_p">{{getCateName()}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.from ? item.from : ''}}</span>
                    </div>
                    <div v-else>
                        <div class="mini_content_one_image" @click="gotoNews(item.id)">
                            <a target="_blank"><img :src='item.pics[0]'/></a>
                        </div>
                        <div class="mini_content_one_image_title">
                            <a target="_blank" @click="gotoNews(item.id)">{{item.title}}</a>
                            <span>{{getCateName()}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.from ? item.from : ''}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="moreFlag" class="mini_bottom_more" @click="gotoNextPage()">更多未读资讯<span>››</span></div>
    </div>
</template>
<script>
import NewsSlider from './comp/NewsSlider'
import dataCenter from '@/api/DataCenter'
import Utils from "@/js/Utils"
let _this;
export default {
    components:{
        NewsSlider
    },
    data(){
        return {
            todayWeather:"",
            selectIndex:0,
            currentPage:1,
            moreFlag:true,
            titleList:[],
            newsList:[],
            rightList:[]
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
            arr.push({id:-1,cateId:-1,cateName:'更多 >>'})
            _this.titleList = arr;
            _this.gotoCategry(arr[0].cateId);
        })
        dataCenter.getMiniRightList().then(res=>{
            if(res.code != 200) return;
            _this.rightList = res.data;
            _this.$nextTick(()=>{
                dataCenter.addAdsByClassName("adver_common_class_u8x2583456");
            });
        })
        document.title = "MiniPage";
    },
    computed:{
        pageNewsList(){
            this.$nextTick(()=>{
                dataCenter.addAdsByClassName("adver_common_class_u8xef3e23d");
            });
            return this.newsList.slice(0,this.currentPage*10);
        }
    },
    methods:{
        scrollHandler(e){
            let ele = e.srcElement ? e.srcElement : e.target;
            if(!ele) return;
            if(ele.scrollTop + ele.offsetHeight > ele.scrollHeight - 100){
                let page = this.currentPage + 1;
                let len = this.newsList.length;
                let um = Math.ceil(len/10);
                if(page < um){
                    this.currentPage++;
                }
            }
            if(this.moreFlag){
                this.moreFlag = false;
                Utils.addDelay(this.checkIsMore,this,10000)
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
        gotoCategry(idx){
            if(idx < 0){
                window.open("/","blank")
                return;
            }
            if(idx - 1 != this.selectIndex){
                this.newsList = [];
            }
            this.selectIndex = idx - 1;
            let _this = this
            dataCenter.getMiniList(idx).then(res=>{
                if(res.code != 200) return
                let news = res.data;
                _this.newsList = news;
                this.currentPage = 1;
                let cele = document.getElementsByClassName("mini_middle")[0]
                cele.scrollTop = 0;
                _this.$nextTick(()=>{
                    dataCenter.addAdsByClassName("adver_common_class_u8xef3e23d");
                    _this.checkIsMore();
                });
            })
        },
        gotoNews(idx){
            let routeUrl = this.$router.resolve({
                path: "/content",
                query: {id:idx,qid:"ludashi"}            
            });
            window.open(routeUrl.href, '_blank');
            return false;
        },
        gotoNextPage(){
            let page = this.currentPage + 1;
            let len = this.newsList.length;
            let um = Math.ceil(len/10);
            if(page > um) return;
            this.currentPage++;
            this.moreFlag = false;
            Utils.addDelay((bool)=>{
                let mele = document.getElementsByClassName("mini_middle")[0]
                let scrollTop = mele.scrollTop;
                mele.scrollTop = scrollTop + 55;
                if(bool){
                    Utils.addDelay(this.checkIsMore,this,100)
                }
            },this,1,10)
        },
        checkIsMore(){
            let len = this.newsList.length;
            let um = Math.ceil(len/10);
            this.moreFlag = this.currentPage < um;
        },
        getSlideNewsList(list){
            let arr = [];
            if(list && list.length > 0){
                for(let i = 0;i < list.length;i++){
                    let obj = list[i];
                    arr.push({id:obj.id,title:obj.title,pic:obj.pics[0]})
                }
                arr.push(arr[0])
            }
            return arr;
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
        font-family: "Microsoft YaHei", Arial, sans-serif;
    }
    a {
        color: #333;
        text-decoration: none;
        cursor: pointer;
    }
    a:hover{ 
        color:#f24e4e;
    }
    .mini_main {
        display: block;
        position: relative;
        margin: 0 auto;
        width: 898px;
        height: 599px;
        background: #ffffff;
        overflow: hidden;
    }
    .mini_main_title {
        width: 848px;
        height: 40px;
        position: fixed;
        padding-bottom: 5px;
        margin-left: 20px;
        top: 0px;
        z-index: 99;
        background: #fff;
        border-bottom: 2px solid #eee;
    }
    .mini_main_title_ul {
        width: 878px;
        white-space:nowrap;
        display: block;
        padding-top: 6px;
        text-align: left;
    }
    .mini_main_title_ul li {
        margin:4px 10px 4px 0px;
        padding: 0 5px 0 0px;
        display:inline-block;
    }
    .mini_navLink {
        color: #000;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        padding: 10px;
    }
    .mini_navLink:hover {
        color:#fff;
        background: #f24e4e;
        border-radius: 5px;
    }
    .mini_navLink_selected {
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        color:#fff;
        background: #f24e4e;
        border-radius: 5px;
        padding: 10px;
    }
    .mini_navLink_selected:hover {
        color: #fff;
    }
    .n_title_weather {
        position: absolute;
        top: -30px;
        right: 0px;
        overflow: hidden;
        height: 40px;
    }
    .mini_middle {
        width: 878px;
        height: 550px;
        position: relative;
        left: 20px;
        top: 54px;
        overflow-y: auto;
    }
    .mini_content {
        width: 580px;
        height: 550px;
        padding: 10px 10px 10px 0px;
    }
    .mini_content_item {
        overflow: hidden;
        zoom: 1;
        margin-bottom: 5px;
        padding-bottom: 4px;
        border-bottom: 1px solid #eee;
        text-align: left;
        font-size: 15px;
        font-weight: bold;
    }
    .mini_content_image {
        display: block;
        overflow: hidden;
    }
    .mini_content_image_p {
        font-size: 12px;
        color: #bbb;
        margin-top: 4px;
        text-align: left;
    }
    .mini_content_image a {
        display: block;
        width: 130px;
        height: 95px;
        background-color: #f1f1f1;
        overflow: hidden;
        margin: 5px 15px 5px 0px;
        float: left;
    }
    .mini_content_image img {
        width: 130px;
        height: 95px;
        transition: all 0.6s;
    }
    .mini_content_image img:hover {
        transform: scale(1.2);
    }
    .mini_content_more {
        width: 130px;
        height: 60px;
        background: #eeeeee;
        cursor: pointer;
        color: #333;
        float: left;
        text-align: center;
        margin: 5px 10px 5px 0px;
        padding-top: 35px;
    }
    .mini_content_more span {
        padding-top: 30px;
    }
    .mini_content_one_image {
        width: 150px;
        float: left;
    }
    .mini_content_one_image a {
        display: block;
        width: 150px;
        height: 95px;
        background-color: #f1f1f1;
        overflow: hidden;
        margin: 5px 10px 5px 0px;
        float: left;
    }
    .mini_content_one_image img {
        width: 150px;
        height: 95px;
        transition: all 0.6s;
    }
    .mini_content_one_image img:hover {
        transform: scale(1.2);
    }
    .mini_content_one_image_title {
        width: 420px;
        padding: 8px 0px 4px 0px;
        float: right;
    }
    .mini_content_one_image_title a {
        height: 74px;
        display: inline-block;
    }
    .mini_content_one_image_title span {
        display: block;
        font-size: 12px;
        color: #bbb;
        text-align: left;
    }
    .mini_bottom_more {
        width: 100%;
        height: 30px;
        position: absolute;
        line-height: 30px;
        bottom: 0px;
        text-align: center;
        background-color: rgba(237,64,64,0.7);
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        z-index: 20;
    }
    .mini_bottom_more span {
        width: 16px;
        height: 16px;
        display: inline-block;
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        transform: rotate(90deg);
    }
    .mini_right {
        width: 244px;
        position: absolute;
        top:45px;
        right: 30px;
        z-index: 10;
    }
    .mini_right_list {
        list-style: none;
        font-size: 12px;
        margin-block-start: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .mini_right_list li {
        height: 128px;
        overflow: hidden;
        zoom: 1;
        margin-bottom:6px;
    }
    .mini_right_list_image {
        display: block;
        overflow: hidden;
        background: #f1f1f1;
        position: relative;
        cursor: pointer;
    }
    .mini_right_list_title {
        display: block;
        width: 242px;
        height: 36px;
        float: left;
        position: relative;
        padding-left: 3px;
        padding-top: 3px;
        bottom: 36px;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: left;
        color: seashell;
        font-size: 13px;
        line-height: 100%;
    }
    .mini_right_list_image img {
        width: 244px;
        height: 128px;
        transition: all 0.6s;
    }
    .mini_right_list_image img:hover {
        transform: scale(1.2);
    }
    
</style>