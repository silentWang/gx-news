<template>
    <div>
        <div :id="itemId">
            <div v-if="isLoadingSelf()">
                <div v-if="type == 'float'" class="adv_float_closebtn" @click="closeFlag = false" >X</div>
                <div class="adv_class_bd_default" v-show="closeFlag">
                </div>
            </div>
            <div v-else-if="type == 'left'">
                <div class="left_one_div">
                    <a :href="itemUrl" target="_blank" class="left_one_img_a" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src="pictures[0]">
                    </a>
                    <div class="left_up_pp">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    </div>
                    <a class="left_up_pp_source" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemSource}}</a>
                    <p><a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="left_up_pp_span">广告</span></a></p>
                </div>
            </div>
            <div v-else-if="type == 'kitchen'">
                <div class="kitchen_adv_class" >
                    <a class="kitchen_img_a" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src="pictures[0]">
                        <span class="content_guanggao">广告</span>
                    </a>
                    <a class="kitchen_title" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                </div>
            </div>
            <div v-else-if="type == 'float'">
                <div class="float_adv_class" v-show="closeFlag">
                    <div class="adv_float_closebtn" @click="closeFlag = false" >X</div>                        
                    <a class="float_img_a" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src="pictures[0]">
                        <span class="content_guanggao">广告</span>
                    </a>
                    <a class="float_title" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                </div>
            </div>
            <div v-else>
                <div class="cmini_adv_four" v-if="pictures.length == 4">
                    <a class="cmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="cfour_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="getSpUrl(index)" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="content_guanggao">广告</span></a>
                </div>
                <div class="mini_adv_three" v-else-if="pictures.length == 3">
                    <a class="cmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="cthree_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="getSpUrl(index)" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="content_guanggao" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
                <div class="mini_adv_two" v-else-if="pictures.length == 2">
                    <a class="cmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="ctwo_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="getSpUrl(index)" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="content_guanggao" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
                <div v-else-if="singleSmallBool">
                    <a class="content_adv_next_pic" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src="pictures[0]"/>
                        <span class="content_guanggao">广告</span>
                    </a>
                    <a class="content_adv_small_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        {{itemTitle}}
                        <div>
                            <span>{{itemSource}}</span>
                        </div>
                    </a>
                </div>
                <div v-else>
                    <a class="cmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <a target="_blank" :href="itemUrl" @click="clickTo" class="pic_ad_a" @mousedown="advDown" @mouseup="advUp"><img :src='pictures[0]'/></a>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="content_guanggao" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Utils from "@/js/Utils"
import dataCenter from '@/api/DataCenter'
export default {
    props:{
        actionItem:{
            required:true
        },
        type:{
            default:function(){
                return "dialog";
            }
        }
    },
    data(){
        return {
            itemId:"",
            advType:"",
            advData:'',
            tszData:'',
            styleType:108,
            itemTitle:"",
            pictures:[],
            itemUrl:"",
            itemSource:"",
            singleSmallBool:false,
            closeFlag:true
        }
    },
    created(){
        this.advData = this.actionItem.getNextAd(this.updateInfo,this);
        this.itemId = this.advData.elementID;
    },
    methods:{
        updateInfo(){
            let info = this.advData.data;
            if(!info){
                this.advType = "advbd"
                return;
            }
            this.advType = info.advType;
            if(this.advType == Utils.ADV_TYPE.DFTT){
                this.itemTitle = info.title;
                this.pictures = info.imgUrl;
                this.itemUrl = info.displayUrl;
                this.itemSource = info.adSource ? info.adSource:"热门";
                this.styleType = info.styleType;
                this.singleSmallBool = info.styleType == "1001" || info.styleType == "1003";
            }
            else if(this.advType == Utils.ADV_TYPE.TSZ){
                this.itemTitle = info.title;
                this.pictures = [info.img];
                this.itemUrl = info.curl;
                this.styleType = info.type;
                this.itemSource = info.adSource ? info.adSource:"热门";
                if(info.type == 1){
                    this.singleSmallBool = true;
                }
                else if(info.type == 2){
                    let assets = info.assets;
                    if(assets && assets.length > 0){
                        let arr = [];
                        for(let i = 0;i < assets.length;i++){
                            let asset = assets[i];
                            arr.push(asset.img);
                        }
                        this.pictures = arr;
                    }
                }
                this.tszData = info;
                dataCenter.upTo360ShowLog(this.tszData);
            }
        },
        isLoadingSelf(){
            return !this.advType || this.advType == Utils.ADV_TYPE.BAIDU;
        },
        getSpUrl(index){
            if(this.advType != Utils.ADV_TYPE.TSZ) return this.itemUrl;
            return this.itemUrl;
        },
        clickTo(evt){
            if(this.advType == Utils.ADV_TYPE.DFTT){
                dataCenter.upToActivity("df_click");
            }
            else if(this.advType == Utils.ADV_TYPE.TSZ){
                dataCenter.upToActivity("360_click");
                dataCenter.upTo360ClkLog(this.tszData,evt.offsetX,evt.offsetY,560,244,3);
            }
        },
        advDown(evt){
            if(this.advType == Utils.ADV_TYPE.TSZ){
                dataCenter.upTo360ClkLog(this.tszData,evt.offsetX,evt.offsetY,560,244,1);
            }
        },
        advUp(evt){
            if(this.advType == Utils.ADV_TYPE.TSZ){
                dataCenter.upTo360ClkLog(this.tszData,evt.offsetX,evt.offsetY,560,244,2);
            }
        }
    }
}
</script>
<style>
    .cmini_adv_title {
        font-size: 20px;
        font-weight: bold;
        display: block;
        padding-bottom: 10px;
    }
    .cfour_image {
        padding: 0 5px 0 0px;
        overflow: hidden;
        float: left;
    }
    .cfour_image a {
        width: 185px;
        display: block;
        overflow: hidden;
    }
    .cfour_image a img {
        width: 185px;
        padding: 0;
    }
    .cthree_image {
        padding: 0 5px 0 0px;
        overflow: hidden;
        float: left;
    }
    .cthree_image a {
        width: 245px;
        display: block;
        float: left;
        overflow: hidden;
    }
    .cthree_image a img {
        width: 240px;
    }
    .ctwo_image a {
        width: 380px;
        display: block;
        padding: 0 10px 0 px;
        float: left;
        overflow: hidden;
    }
    .ctwo_image a img {
        width: 373px;
    }
    .pic_ad_a {
        height: 100%;
        overflow:hidden;
        display: block;
    }
    .pic_ad_a img{
        width: 100%;
    }
    .content_adv_next_pic {
        width: 177px;
        height: 100px;
        display: block;
        float: left;
        margin-right: 15px;
        background-color: #f1f1f1;
        overflow:hidden;
    }
    .content_adv_next_pic img {
        width: 177px;
        height: 100px;
        overflow: hidden;
        padding: 0px;
        transition: all 0.6s;
    }
    .content_adv_next_pic img:hover {
        transform: scale(1.2);
    }
    .content_adv_small_title {
        display: block;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
    }
    .content_adv_small_title div {
        display: block;
        font-size: 12px;
        color: #666;
        position: relative;
        top: 55px;
    }
    .left_one_div {
        width: 100%;
        height: 90px;
        text-align: left;
        position: relative;
    }
    .left_one_img_a {
        float: left;
        width: 140px;
        height: 90px;
        display: block;
        overflow: hidden;
        margin-right: 10px;
        background: #f1f1f1;
        position: relative;
        cursor: pointer;
    }
    .left_one_img_a img {
        width: 140px;
        min-height: 90px;
        vertical-align: middle;
        transition: all 0.6s;
    }
    .left_one_img_a img:hover {
        transform: scale(1.2);
    }
    .left_up_pp_span {
        display: block;
        position: absolute;
        color: #A6A6A6;
        font-size: 12px;
        left: 110px;
        bottom: 2px;
        opacity: 0.5;
    }
    .left_up_pp {
        width: 340px;
        height: 40px;
        position: relative;
        text-align: left;
    }
    .left_up_pp a {
        display: block;
        width: 190px;
        height: 40px;
        font-size: 16px;
        overflow: hidden;
    }
    .left_up_pp_source {
        display: block;
        float: left;
        position: relative;
        top: 30px;
    }
    .kitchen_adv_class {
        border:1px solid #ececec;
        width: 340px;
        height: 280px;
        margin: 0px auto;
    }
    .kitchen_img_a {
        width: 100%;
        height: 100%;
        display: block;
    }
    .kitchen_img_a img {
        width: 100%;
        height: 100%;
    }
    .kitchen_title {
        position: relative;
        width: 100%;
        height: 34px;
        color: #fff;
        font-size: 15px;
        display: block;
        background: rgba(0,0,0,0.7);
        top: -34px;
        overflow: hidden;
    }
    .float_adv_class {
        border:1px solid #ececec;
        width: 300px;
        height: 250px;
        margin: 0px auto;
    }
    .float_img_a {
        width: 100%;
        height: 100%;
        display: block;
    }
    .float_img_a img {
        width: 100%;
        height: 100%;
    }
    .float_title {
        display: block;
        position: relative;
        width: 100%;
        color: white;
        font-size: small;
        top: -40px;
        text-align: left;
        height: 40px;
        overflow: hidden;
    }
    .adv_float_closebtn {
        width: 30px;
        height: 22px;
        position: relative;
        float: right;
        color: seashell;
        top: 32px;
        right: 5px;
        padding: 7px 0 0 0;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 16px;
        z-index: 90;
        cursor: pointer;
    }
    .content_guanggao {
        display: block;
        float: right;
        color: #eee;
        font-size: x-small;
        position: relative;
        right: 5px;
        top: -20px;
        opacity: .2;
    }
</style>