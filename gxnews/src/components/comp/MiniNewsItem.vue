<template>
    <div>
        <div v-if='type == 2' :id="itemId" class="adver_common_class_u8xef3e23d" v-html="itemTitle">
        </div>
        <div v-else-if="pictures.length >= 3">
            <a target="_blank" :href="itemUrl" @click="gotoNews">{{itemTitle}}</a>
            <div class="mini_content_image" @click="gotoNews">
                <a target="_blank" :href="itemUrl"><img :src='pictures[0]'/></a>
                <a target="_blank" :href="itemUrl"><img :src='pictures[1]'/></a>
                <a target="_blank" :href="itemUrl"><img :src='pictures[2]'/></a>
                <div class="mini_content_more" target="_blank"><span>查看更多>></span></div>
            </div>
            <span class="mini_content_image_p">{{this.cateName}}{{itemFrom}}</span>
        </div>
        <div v-else>
            <div class="mini_content_one_image" @click="gotoNews">
                <a target="_blank" :href="itemUrl"><img :src='pictures[0]'/></a>
            </div>
            <div class="mini_content_one_image_title">
                <a target="_blank" :href="itemUrl" @click="gotoNews">{{itemTitle}}</a>
                <span>{{this.cateName}}{{itemFrom}}</span>
            </div>
        </div>
        <div v-show="showMADFlag" class="mini_transparent_youknow" v-html="dupeAdInfo"></div>
    </div>
</template>
<script>
import dataCenter from '@/api/DataCenter'
export default {
    props:{
        newsInfo:{
            required:true
        },
        cateName:{
            required:true
        }
    },
    data(){
        return {
            type:2,
            itemId:"",
            itemTitle:"",
            pictures:[],
            itemUrl:"",
            itemFrom:"",
            isShowAd:false,
            showMADFlag:false,
            dupeAdInfo:""
        }
    },
    beforeMount(){
        this.type = this.newsInfo.type;
        this.itemId = this.newsInfo.id ? this.newsInfo.id : "";
        this.itemTitle = this.newsInfo.title;
        this.pictures = this.newsInfo.pics ? this.newsInfo.pics : [];
        this.itemUrl = this.newsInfo.url ? this.newsInfo.url : "";
        this.itemFrom = this.newsInfo.from ? this.newsInfo.from : "";
    },
    mounted(){
        if(this.newsInfo.dupe){
            this.showMADFlag = true;
            this.dupeAdInfo = this.newsInfo.dupe;
            setTimeout(() => {
                this.showMADFlag = false;
            }, 3000);
        }
        else{
            this.showMADFlag = false;
        }
        if(this.type == 2 && !this.isShowAd){
            this.showAd();
        }
    },
    methods:{
        gotoNews(){
            this.$emit("gotoNews",this.newsInfo)
        },
        showAd(){
            this.isShowAd = true;
            this.$nextTick(()=>{
                dataCenter.addAdsByClassName("adver_common_class_u8xef3e23d");
                dataCenter.addAdsByClassName("mini_transparent_youknow");
            });
        }
    }
    
}
</script>
<style>
    .adver_common_class_u8xef3e23d {
        min-height: 105px;    
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
        margin: 5px 10px 5px 0px;
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
        font-weight: normal;
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
        margin: 5px 5px 5px 0px;
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
        width: 400px;
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
    .mini_transparent_youknow {
        width: 560px;
        height: 110px;
        position: absolute;
        background: #fff;
        opacity: 0.5;
    }
</style>