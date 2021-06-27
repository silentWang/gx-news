<template>
    <div class="mini_main">
        <div class="mini_main_title">
            <ul class="mini_main_title_ul">
                <li v-for="(item) in titleList" :key="item.cateId">
                    <a @click="gotoCategry(item.cateId)" @mouseover="delayGoto(item.cateId,true)" @mouseout="delayGoto(item.cateId,false)" :class="[selectIndex == item.id ? 'mini_navLink_selected':'mini_navLink']">{{item.cateName}}</a>
                </li>
            </ul>
        </div>
        <div class="mini_right">
            <ul class="mini_right_list">
                <li v-for="(item,index) in rightList" :key="index + '_' +item.id + '_' + item.type">
                    <div v-if="item.type != 2">
                        <NewsSlider v-on:gotoNews="gotoNews" :nsId="index" nWidth="200" nHeight="185" v-bind:newsList="getSlideNewsList(item.list)"></NewsSlider>
                        <!-- <a class="mini_right_list_image"  :title="item.list.title">
                            <img :src="item.list.pics[0]" @click="gotoNews(item.list.id)">
                        </a>
                        <a class="mini_right_list_title" :title="item.list.title" @click="gotoNews(item.list.id)">{{item.list.title}}</a> -->
                    </div>
                    <div v-else @click="clkUxArt(item.id)" :id="item.id ? item.id : ''" class="adver_common_class_u8x2583456" v-html="item.list">
                    </div>
                </li>
            </ul>
        </div>
        <div class="mini_middle" @scroll="scrollHandler">
            <!-- <div class="n_title_weather">
                <iframe allowtransparency="true" frameborder="0" width="317" height="28" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&amp;z=1&amp;t=1&amp;v=0&amp;d=1&amp;bd=0&amp;k=000000&amp;f=ffffff&amp;ltf=ffffff&amp;htf=ffffff&amp;q=1&amp;e=0&amp;a=1&amp;c=54511&amp;w=317&amp;h=28&amp;align=right"></iframe>
            </div> -->
            <div class="mini_content">
                <div class="mini_content_item" v-for="(item,index) in newsList" :key="index + '_' + item.id + '_' + item.type">
                    <div v-if='item.type == 2' :id="item.id" class="adver_common_class_u8xef3e23d" v-html="item.title">
                    </div>
                    <MiniNewsItem v-else v-on:gotoNews="gotoNews" :index=index :newsInfo="item" :needShow="needShow" :cateName="getCateName()" />
                </div>
            </div>
        </div>
        <div v-show="moreFlag" class="mini_bottom_more" @click="gotoNextPage()">更多未读资讯<span>››</span></div>
    </div>
</template>
<script>
import NewsSlider from './comp/NewsSlider'
import MiniNewsItem from './comp/MiniNewsItem'
import dataCenter from '@/api/DataCenter'
import Utils from "@/js/Utils"
let _this;
export default {
    components:{
        NewsSlider,
        MiniNewsItem
    },
    data(){
        return {
            todayWeather:"",
            selectIndex:0,
            currentPage:1,
            moreFlag:false,
            titleList:[],
            newsList:[],
            rightList:[],
            needShow:false
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
            arr.push({id:-1,cateId:-1,cateName:'更多'})
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
                Utils.addDelay(this.checkIsMore,this,10000);
            }
        },
        getCateName(item){
            if(item && item.cateId == -100) return "";
            let list = this.titleList;
            let cname = "";
            for(let cate of list){
                if(cate.cateId == this.selectIndex + 1){
                    cname = cate.cateName;
                    break;
                }
            }
            return cname + "    ";
        },
        gotoCategry(idx){
            if(idx < 0){
                window.open("/","blank")
                return;
            }
            this.selectIndex = idx - 1;
            let _this = this
            dataCenter.getMiniList(idx).then(res=>{
                if(res.code != 200) return
                let news = res.data;
                let other = res.other;
                _this.newsList = news;
                let func = ()=>{
                    this.currentPage = 1;
                    let cele = document.getElementsByClassName("mini_middle")[0]
                    if(cele){
                        cele.scrollTop = 0;
                    }
                    this.$nextTick(()=>{
                        dataCenter.addAdsByClassName2("adver_common_class_u8xef3e23d");
                        Utils.addDelay(()=>{
                            dataCenter.addAdsByClassName2("adver_common_class_u8xef3e23d",true,4);
                            // this.needShow = true;
                            this.needShow = other && other.dupe == 1;
                        },this,3000);
                    });
                    Utils.addDelay(_this.checkIsMore,this,10000,1);
                }
                func();
                // dataCenter.getCSSPAdever().then(data=>{
                //     _this.newsList.unshift(data);
                //     dataCenter.uploadAct(data.displayurl);
                //     func();
                // }).catch(()=>{
                //     func();
                // });
            })
        },
        delayGoto(cid,isdelay){
            if(isdelay){
                this.delayGotoId = setTimeout(()=>{
                    this.gotoCategry(cid);
                },600);
            }
            else{
                clearTimeout(this.delayGotoId);
            }
        },
        gotoNews(item){
            if(item.cateId == -100){
                if(item.url){
                    dataCenter.uploadAct();
                    // window.open(item.url, '_blank');
                }
                else{
                    window.open("/", '_blank');
                }
                return;
            }
            let idx = item.id;
            let routeUrl = this.$router.resolve({
                path: "/content",
                query: {id:idx,qid:1}            
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
        width: 72px;
        position: absolute;
        margin-left: 10px;
        top: 10px;
        z-index: 99;
        background: #fff;
    }
    .mini_main_title_ul {
        white-space:nowrap;
        display: block;
        padding-top: 6px;
        text-align: center;
    }
    .mini_main_title_ul li {
        width: 72px;
        height: 32px;
        margin:0px 0px 10px 0px;
        display: block;
        list-style-type: none;
    }
    .mini_navLink {
        height: 24px;
        display: block;
        padding-top: 4px;
        color: #000;
        font-size: 14px;
        text-decoration: none;
        border-radius: 2px;
    }
    .mini_navLink:hover {
        color:#fff;
        background: #ed4040;
    }
    .mini_navLink_selected {
        height: 24px;
        display: block;
        padding-top: 4px;
        font-size: 14px;
        text-decoration: none;
        color:#fff;
        background: #ed4040;
        border-radius: 2px;
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
        width: 802px;
        height: 595px;
        position: absolute;
        left: 95px;
        top: 5px;
        overflow-y: auto;
    }
    .mini_content {
        width: 560px;
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
        width: 200px;
        position: absolute;
        top:10px;
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
        height: 185px;
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

    .mini_middle::-webkit-scrollbar {
        width : 8px;
    }
    .mini_middle::-webkit-scrollbar-thumb {
        border-radius: 6px;
        box-shadow: inset 0 0 5px #ed4040;
        background: #ed4040;
    }
    .mini_middle::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #fff;
        border-radius: 6px;
        background: #fff;
    }
    
</style>