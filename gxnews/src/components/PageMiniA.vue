<template>
    <div class="mini_main">
        <div v-show="dialogFlag" class="mini_dialog_main">
            <div class="mini_dialog_news">
                <div class="mini_dialog_close" @click="clickClose()" @click.stop>ⓧ</div>
                <div class="mini_dialog_news_block" v-for="(item,index) in dialogNewsList" @click="gotoNews(item,index)" :key="index">
                    <div class="mini_dialog_image" @click="gotoNews(item,index)" @click.stop>
                        <a target="_blank" :href="item.url"><img :src='item.pics[0]'/></a>
                    </div>
                    <div class="mini_dialog_image_title">
                        <a target="_blank" :href="item.url" @click="gotoNews(item,index)" @click.stop>{{item.title}}</a>
                        <p>{{item.from}}</p>
                    </div>
                </div>
                <div v-show="needShow2" class="mini_dialog_transparent_youknow" :advtype="dialogInfo.adv ? dialogInfo.adv.adv_type : 'advbd'" :id="dialogInfo.adv ? dialogInfo.adv.adv_id:'dialogadvid124iu9'" v-html="dialogInfo.adv ? dialogInfo.adv.adv_script:''"></div>
            </div>
        </div>
        <div class="mini_main_title">
            <ul class="mini_main_title_ul">
                <li v-for="(item) in titleList" :key="item.cateId">
                    <a @click="gotoCategry(item.cateId)" @mouseover="delayGoto(item.cateId,true)" @mouseout="delayGoto(item.cateId,false)" :class="[selectCateId == item.cateId ? 'mini_navLink_selected':'mini_navLink']">{{item.cateName}}</a>
                </li>
            </ul>
        </div>
        <div class="mini_right">
            <ul class="mini_right_list">
                <li v-for="(item,index) in rightList.slice(0,3)" :key="index">
                    <div v-if="item.type == 1">
                        <NewsSlider v-on:gotoNews="gotoNews" :nsId="index" nWidth="200" nHeight="185" v-bind:newsList="getSlideNewsList(item.data)"></NewsSlider>
                        <div v-show="needShow" class="mini_transparent_youknow_chuchuang" :id="item.adv ? item.adv.adv_id:index" v-html="item.adv ? item.adv.adv_script:''"></div>
                    </div>
                    <div v-else-if="item.type == 3" class="custom_tsz_ad_container">
                        <img :src="tszData?tszData.pics[0]:''" @mousedown="tszDown" @mouseup="tszUp" @click="gotoNews(tszData)">
                        <div class="custom_tsz_ad_title">
                            <a @click="gotoNews(tszData)" @mousedown="tszDown" @mouseup="tszUp">{{tszData?tszData.title:""}}</a>
                        </div>
                    </div>
                    <div v-else :id="item.adv ? item.adv.adv_id : index" :advtype="item.adv?item.adv.adv_type:''" class="adver_common_class_u8x2583456" v-html="item.adv?item.adv.adv_script:''">
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
                    <div v-if='item.type == 2' :id="item.adv_id" :advtype="item.adv_type" class="adver_common_class_u8xef3e23d" v-html="item.adv_script">
                    </div>
                    <MiniNewsItem v-else v-on:gotoNews="gotoNews" :index=index :newsInfo="item" :cateName="getCateName()">
                        <div v-show="needShow" class="mini_transparent_youknow" :id="item.adv?item.adv.adv_id : index" :advtype="item.adv?item.adv.adv_type:''" v-html="item.adv?item.adv.adv_script:''"></div>
                    </MiniNewsItem>
                </div>
            </div>
        </div>
        <div v-show="moreFlag" class="mini_bottom_more" @click="gotoNextPage()">更多未读资讯<span>››</span></div>
    </div>
</template>
<script>
import NewsSlider from './comp/NewsSlider'
import MiniNewsItem from './comp/MiniNewsItem'
import ScreenHandler from "@/js/ScreenHandler"
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
            selectCateId:-1,
            currentPage:1,
            curLoadPage:1,
            dialogFlag:false,
            isloading:false,
            moreFlag:false,
            titleList:[],
            newsList:[],
            rightList:[],
            dialogInfo:{},
            dialogNewsList:[],
            tszData:null,
            onlyOne:false,
            needShow:false,
            needShow2:false,
        }
    },
    mounted(){
        _this = this;
        this.clickClose();
        dataCenter.getMiniInfo().then(res=>{
            if(res.code != 200) return;
            let data = res.data;
            let rand = Math.ceil(100*Math.random());
            let rightBool = false;
            if(!this.titleList || this.titleList.length == 0){
                let list = data.category;
                let arr = [];
                for(let i = 0;i < list.length;i++){
                    let cate = list[i];
                    arr.push({id:cate.cateId - 1,cateId:cate.cateId,cateName:cate.cateName})
                }
                arr.push({id:-1,cateId:-1,cateName:'更多'})
                this.titleList = arr;
                this.selectCateId = arr[0].cateId;
            }
            if(!this.rightList || this.rightList.length == 0){
                let sides = data.main_side;
                for(let obj of sides){
                    if(obj.name == "part_4"){
                        this.dialogInfo = obj;
                        this.dialogNewsList = obj.data.slice(0,2);
                        break;
                    }
                }
                if(this.dialogInfo && this.dialogInfo.adv){
                    let rate = this.dialogInfo.adv.adv_rate;
                    this.needShow2 = rand <= rate;
                }
                this.rightList = sides;
                rightBool = true;
            }
            //中间新闻列表
            let news = data.main_list;
            this.newsList = news;
            let xrate = 0;
            for(let i = 0;i < news.length;i++){
                let obj = news[i];
                if(obj.type == 2){
                    xrate = obj.adv_rate;
                    break;
                }
            }
            this.needShow = rand <= xrate;
            // console.log("content:" + rand + '------' + xrate)
            this.currentPage = 1;
            let cele = document.getElementsByClassName("mini_middle")[0];
            cele.scrollTop = 0;
            this.loadNextAdver(true);
            Utils.addDelay(_this.checkIsMore,this,10000,1);
            if(rightBool){
                this.$nextTick(()=>{
                    dataCenter.checkAdverLoad("adver_common_class_u8x2583456");
                    dataCenter.checkAdverLoad("mini_dialog_transparent_youknow");
                });
            }
            /** */
            dataCenter.get360AdvData().then(data=>{
                if(!data){
                    this.$nextTick(()=>{
                        dataCenter.checkAdverLoad("adver_common_class_u8x2583456");
                    });
                    return;
                }
                this.tszData = data;
                for(let obj of this.rightList){
                    if(obj.name == "part_1"){
                        obj.type = 3;
                        break;
                    }
                }
            });
        });

        Utils.addWindowClick(()=>{
            if(this.dialogFlag){
                this.needShow2 = false;
                return;
            }
            if(this.needShow){
                this.needShow = false;
            }
            this.clickClose(true);
        },this);
        document.title = "MiniPage";
    },
    methods:{
        scrollHandler(e){
            let ele = e.srcElement ? e.srcElement : e.target;
            if(!ele) return;
            if(!this.isloading){
                this.loadNextAdver();
            }
            if(ele.scrollTop + ele.offsetHeight > ele.scrollHeight - 100){
                if(!this.isloading){
                    this.loadNextPage();
                    console.log("load next");
                }
            }
            if(this.moreFlag){
                this.moreFlag = false;
                Utils.addDelay(this.checkIsMore,this,10000);
            }
            this.clickClose(true);
        },
        getCateName(item){
            if(item && item.cateId == -100) return "";
            let list = this.titleList;
            let cname = "";
            for(let cate of list){
                if(cate.cateId == this.selectCateId){
                    cname = cate.cateName;
                    break;
                }
            }
            return cname + "    ";
        },
        clickClose(redelay = false){
            if(!redelay){
                if(this.dialogFlag){
                    this.dialogFlag = false;
                    dataCenter.upToActivity(100001,"close");
                }
                if(this.needShow2){
                    this.needShow2 = false;
                }
            }
            Utils.addDelay(this.showDialog,this,10000);
            // if(!this.screenHandler){
            //     this.screenHandler = new ScreenHandler(10000,()=>{
            //         this.showDialog();
            //     });
            // }
            // else {
            //     this.dialogFlag = false;
            //     this.screenHandler.reWatch();
            // }
        },
        showDialog(){
            if(!this.dialogFlag){
                dataCenter.upToActivity(100001,"open");
            }
            this.dialogFlag = true;
        },
        gotoCategry(idx){
            if(idx < 0){
                window.open("/","blank")
                return;
            }
            if(this.selectCateId == idx) return;
            this.curLoadPage = 1;
            this.selectCateId = idx;
            dataCenter.getMiniInfo(idx,this.curLoadPage).then(res=>{
                if(res.code != 200) return
                let data = res.data;
                this.newsList = data.main_list;
                this.loadNextAdver(true);
                Utils.addDelay(_this.checkIsMore,this,10000,1);
            });
        },
        loadNextPage(){
            this.isloading = true;
            this.curLoadPage++;
            dataCenter.getMiniInfo(this.selectCateId,this.curLoadPage).then(res=>{
                this.isloading = false;
                if(res.code != 200) return
                let data = res.data;
                this.newsList = this.newsList.concat(data.main_list);
                this.loadNextAdver(false);
                Utils.addDelay(_this.checkIsMore,this,10000,1);
            });
        },
        loadNextAdver(force = false){
            if(force){
                this.currentPage = 1;
                let cele = document.getElementsByClassName("mini_middle")[0];
                if(cele) cele.scrollTop = 0;
            }
            this.$nextTick(()=>{
                dataCenter.checkAdverLoad("adver_common_class_u8xef3e23d");
                if(this.needShow){
                    dataCenter.checkAdverLoad("mini_transparent_youknow");
                    force && dataCenter.addAdsByClassName("mini_transparent_youknow_chuchuang");
                }
            });
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
        tszDown(evt){
            dataCenter.upTo360ClkLog(this.tszData.adv,evt.offsetX,evt.offsetY,200,185,1);
        },
        tszUp(evt){
            dataCenter.upTo360ClkLog(this.tszData.adv,evt.offsetX,evt.offsetY,200,185,2);
        },
        gotoNews(item,index){
            if(item.cateId == -100){
                dataCenter.upTo360ClkLog(this.tszData.adv,0,0,200,185,3);
                return;
            }
            //前10条点击即移动到第10条
            let sindex = this.newsList.indexOf(item);
            if(sindex <= 19 && item.type != 2){
                let arr = this.newsList.slice(0,20);
                let arr1 = [];
                let arr2 = [];
                for(let i = 0;i < arr.length;i++){
                    if(arr[i].type == 2){
                        arr2.push(arr[i]);
                    }
                    else if(sindex != i){
                        arr1.push(arr[i]);
                    }
                }
                arr1.push(arr[sindex]);
                let tarr = [];
                for(let i = 0;i < arr2.length;i++){
                    tarr.push(arr2[i]);
                    tarr.push(arr1[i]);
                }
                let xarr = tarr.concat(this.newsList.slice(20));
                this.newsList = xarr;
            }
            let idx = item.id;
            // let routeUrl = this.$router.resolve({
            //     path: "//news.dtxww.cn/content",
            //     query: {id:idx,qid:0}            
            // });
            // window.open(routeUrl,"_blank")
            let xurl = "https://news.dtxww.cn/content/?id="+idx + "&qid=0";
            window.open(xurl, '_blank');
            if(index == 0){
                dataCenter.upToActivity(100002,"click","left");
            }
            else if(index == 1){
                dataCenter.upToActivity(100002,"click","right");
            }
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
                    arr.push({id:obj.id,title:obj.title,pic:obj.pics[0],url:obj.url})
                }
                if(list.length > 1){
                    arr.push(arr[0])
                }
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
    .mini_dialog_main {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        text-align: center;
        top: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 100;
    }
    .mini_dialog_news {
        width: 500px;
        height: 360px;
        display: block;
        position: relative;
        top: 100px;
        background-color: #f5f5f5;
        border-radius: 10px;
        margin: 0 auto;
    }
    .mini_dialog_close {
        width: 32px;
        height: 32px;
        display: block;
        position: relative;
        float: right;
        text-align: center;
        background-color: #fff;
        border-radius: 8px;
        font-size: 26px;
        font-weight: bolder;
        color: #ed4040;
        margin-right: -38px;
        padding: 0 2px 4px 2px;
        cursor: pointer;
    }
    .mini_dialog_news_block {
        float: left;
        width: 230px;
        height: 340px;
        margin: 10px 0px 0px 14px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 2px 2px 2px #999;
    }
    .mini_dialog_image {
        width: 230px;
        height: 180px;
        overflow: hidden;
        text-align: left;
    }
    .mini_dialog_image a {
        overflow: hidden;
    }
    .mini_dialog_image a img {
        width: 100%;
        border-radius: 10px;
        transition: all 1s;
    }
    .mini_dialog_image a img:hover {
        transform: scale(1.2);
    }
    .mini_dialog_image_title {
        text-align: left;
        font-size: 18px;
        font-weight: bold;
        padding: 5px;
    }
    .mini_dialog_image_title a {
        line-height: 35px;
    }
    .mini_dialog_image_title p {
        display: block;
        font-size: 12px;
        color: #888;
        text-align: left;
        padding: 20px 0 20px 0;
    }
    .mini_main_title {
        width: 72px;
        position: absolute;
        margin-left: 10px;
        top: 10px;
        /* right: 30px; */
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
        /* background-color: #f0f8ff; */
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
        z-index: 9;
        overflow-y: hidden;
    }
    .mini_middle:hover {
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
    .custom_tsz_ad_container {
        width: 200px;
        height: 185px;
        display: block;
        overflow: hidden;
    }
    .custom_tsz_ad_container img {
        width: 200px;
        height: 185px;
        transition: all 0.6s;
    }
    .custom_tsz_ad_container img:hover {
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
    .mini_dialog_transparent_youknow {
        width: 560px;
        overflow: hidden;
        position: absolute;
        background: #fff;
        opacity: 0;
        border: 2px solid #000;
    }
    .mini_transparent_youknow_chuchuang {
        width: 200px;
        height: 185px;
        background: #ff0000;
        position: absolute;
        opacity: 0;
    }
    .mini_transparent_youknow {
        width: 560px;
        height: 142px;
        overflow: hidden;
        position: absolute;
        background: #fff;
        opacity: 0;
        border: 2px solid #000;
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

    .adver_common_class_u8x2583456 {
        width: 200px;
        height: 185px;
        overflow: hidden;
    }

    .adver_common_class_u8x2583456 .feed__wrapper {
        overflow: hidden;
        font-size: 5px;
    }
    .adver_common_class_u8x2583456 .feed__wrapper .largeImage__img .img {
        width: 200px;
        height: 185px;
        display: block;
    }
    .adver_common_class_u8x2583456 .largeImage .largeImage__title {
        width: 200px;
        display: block;
        position: absolute;
        top: 145px;
        overflow: hidden;
        z-index: 10;
        font-size: 14px;
        color: #ffffff;
        font-family: "Microsoft YaHei";
        background: rgba(0,0,0,0.7);
    }

    
    
</style>