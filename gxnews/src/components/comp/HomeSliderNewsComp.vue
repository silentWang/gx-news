<template>
    <div>
        <div class="home_newscon">
            <div class="home_slider_con" @mouseenter="arrowFlag=true" @mouseleave="arrowFlag=false">
                <transition name="fade" v-for="(item,index) in newsList" :key="index">
                    <div class="home_slider_list_div" v-show="index == currentIndex">
                        <a class="hs_slider_image" @click="gotoNews(item)">
                            <img :src="item.pics[0]">
                        </a>
                        <a class="hs_slider_title" @click="gotoNews(item)">
                            <span>{{item.title}}</span>
                        </a>
                    </div>
                </transition>
            </div>
            <div v-show="arrowFlag" @click="showNext(-1)" @mouseenter="checkFlag(true)" @mouseleave="checkFlag(false)" class="home_slide_arrow_left"><span>〈</span></div>
            <div v-show="arrowFlag" @click="showNext(1)" @mouseenter="checkFlag(true)" @mouseleave="checkFlag(false)" class="home_slide_arrow_right"><span>〉</span></div>
        </div>
        <div class="home_first_news" @click="gotoFirstNews" v-show="firstNews && firstNews.title">
            <a>
                <img class="home_first_img_tiao" src="../.././assets/hot25x25.gif"/>
                <h3>{{firstNews ? firstNews.title : ""}}</h3>
            </a>
        </div>
    </div>
</template>
<script>
import Utils from "@/js/Utils"
export default {
    props:{
        newsList:{
            default(){
                return []
            }
        },
        firstNews:null
    },
    data(){
        return {
            currentIndex:0,
            arrowFlag:false,
            enableFlag:false
        }
    },
    mounted(){
        Utils.addDelay(()=>{
            this.showNext(1);
        },this,3000,0);
    },
    methods:{
        checkFlag(bool){
            this.arrowFlag = bool;
            this.enableFlag = bool;
        },
        showNext(dir = 1){
            if(this.arrowFlag && !this.enableFlag) return;
            if(dir < 0){
                this.currentIndex--;
            }
            else if(dir > 0){
                this.currentIndex++;
            }
            if(this.currentIndex < 0 || this.currentIndex >= this.newsList.length){
                this.currentIndex = 0;
            }
        },
        gotoNews(item){
            this.$emit("gotoNews",item);
        },
        gotoFirstNews(){
            this.$emit("gotoNews",this.firstNews);
        }
    }
}
</script>

<style>
    .home_newscon {
        height: 260px;
        width: 100%;
        overflow:hidden;
        position: relative;
    }
    .home_slider_con {
        width: 100%;
        height: 100%;
        overflow:hidden;
    }
    .home_slider_list_div {
        position: absolute;
        width: 100%;
        left: 0px;
        top: 0px;
    }
    .hs_slider_image {
        display: block;
        width: 100%;
        height: 260px;
        overflow:hidden;
        cursor: pointer;
    }
    .hs_slider_image img {
        width: 100%;
        cursor: pointer;
    }
    .hs_slider_title {
        display: inline-block;
        width: 100%;
        height: 30px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        font-size: 18px;
        text-align: left;
        padding:5px 0 0 10px;
        position: relative;
        top: -35px;
        cursor: pointer;
    }
    .hs_slider_title span {
        display: inline-block;
        width: 600px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .home_slide_arrow_left {
        width: 30px;
        height: 40px;
        position: relative;
        top: -160px;
        padding: 8px 5px 12px 0px;
        color: #fff;
        border-radius: 0px 5px 5px 0px;
        font-size: 32px;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.7);
        overflow: hidden;
    }
    .home_slide_arrow_right {
        width: 30px;
        height: 40px;
        position: relative;
        float: right;
        top: -220px;
        padding: 8px 0px 12px 0px;
        color: #fff;
        border-radius: 5px 0px 0px 5px;
        font-size: 32px;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.7);
        overflow: hidden;
    }
    .home_slide_arrow_left span {
        margin-left: -8px;
    }
    .home_slide_arrow_right span {
        margin-left: 5px;
    }
    .home_first_news {
        width: 100%;
        position: relative;
        overflow: hidden;
        height: 45px;
        box-shadow: 5px 5px 5px #ddd;
        margin-bottom: 15px;
    }
    .home_first_news a {
        cursor: pointer;
    }
    .home_first_img_tiao {
        display: block;
        float: left;
        margin: 10px 5px 0px 0px;
    }
    .home_first_news a h3 {
        padding-top: 5px;
        padding-left: 10px;
        text-align: left;
        line-height: 40px;
        font-size: 26px;
        font-weight: 700;
        color: #ee4b4c;
        text-overflow: ellipsis;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>