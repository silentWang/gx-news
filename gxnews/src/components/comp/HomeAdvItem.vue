<template>
    <div>
        <div :id="itemId" v-if="advType != 'advbd'">
            <div v-if="type == 'right'">
                <div class="right_one_div">
                    <a :href="itemUrl" target="_blank" class="right_one_img_a" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src="pictures[0]">
                    </a>
                    <div class="right_up_pp">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    </div>
                    <a class="right_up_pp_source" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemSource}}</a>
                    <p><a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="right_up_pp_span">广告</span></a></p>
                </div>
            </div>
            <div v-else-if="type == 'kitchen'">
                <div class="home_kitchen_adv_class" >
                    <a class="home_kitchen_img_a" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src="pictures[0]">
                        <span class="home_guanggao">广告</span>
                    </a>
                    <a class="home_kitchen_title" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                </div>
            </div>
            <div v-else>
                <div class="hmini_adv_four" v-if="pictures.length == 4">
                    <a class="hmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="hcfour_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="getSpUrl(index)" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @mousedown="advDown" @mouseup="advUp"><span class="home_guanggao">广告</span></a>
                </div>
                <div class="hmini_adv_three" v-else-if="pictures.length == 3">
                    <a class="hmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="hthree_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="getSpUrl(index)" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="home_guanggao" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
                <div class="hmini_adv_two" v-else-if="pictures.length == 2">
                    <a class="hmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="htwo_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="getSpUrl(index)" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="home_guanggao" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
                <div v-else-if="singleSmallBool">
                    <a class="home_adv_next_pic" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src="pictures[0]"/>
                        <span class="home_guanggao">广告</span>
                    </a>
                    <a class="home_adv_small_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        {{itemTitle}}
                        <div>
                            <span>{{itemSource}}</span>
                        </div>
                    </a>
                </div>
                <div v-else>
                    <a class="hmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <a target="_blank" :href="itemUrl" @click="clickTo" class="hpic_ad_a" @mousedown="advDown" @mouseup="advUp"><img :src='pictures[0]'/></a>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="home_guanggao" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
            </div>
        </div>
        <div v-else v-html="bdcode" class="adv_class_bd_default">
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
                return "";
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
            bdcode:"",
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
        getSpUrl(index){
            if(this.advType != Utils.ADV_TYPE.TSZ) return this.itemUrl;
            return this.itemUrl;
        },
        clickTo(evt){
            if(this.advType == Utils.ADV_TYPE.DFTT){
                dataCenter.upToActivity(200001,"click200001",this.itemId);
            }
            else if(this.advType == Utils.ADV_TYPE.TSZ){
                dataCenter.upToActivity(200002,"click200002",this.itemId);
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
    .hmini_adv_title {
        font-size: 20px;
        font-weight: bold;
        display: block;
        padding-bottom: 10px;
    }
    .hcfour_image {
        padding: 0 5px 0 0px;
        overflow: hidden;
        float: left;
    }
    .hcfour_image a {
        width: 167px;
        display: block;
        overflow: hidden;
    }
    .hcfour_image a img {
        width: 167px;
        padding: 0;
    }
    .hthree_image {
        padding: 0 5px 0 0px;
        overflow: hidden;
        float: left;
    }
    .hthree_image a {
        width: 245px;
        display: block;
        float: left;
        overflow: hidden;
    }
    .hthree_image a img {
        width: 240px;
    }
    .htwo_image a {
        width: 345px;
        display: block;
        padding: 0 10px 0 px;
        float: left;
        overflow: hidden;
    }
    .htwo_image a img {
        width: 338px;
    }
    .hpic_ad_a {
        height: 100%;
        overflow:hidden;
        display: block;
    }
    .hpic_ad_a img{
        width: 100%;
    }
    .home_adv_next_pic {
        width: 177px;
        height: 100px;
        display: block;
        float: left;
        margin-right: 15px;
        background-color: #f1f1f1;
        overflow:hidden;
    }
    .home_adv_next_pic img {
        width: 177px;
        height: 100px;
        overflow: hidden;
        padding: 0px;
        transition: all 0.6s;
    }
    .home_adv_next_pic img:hover {
        transform: scale(1.2);
    }
    .home_adv_small_title {
        display: block;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
    }
    .home_adv_small_title div {
        display: block;
        font-size: 12px;
        color: #666;
        position: relative;
        top: 55px;
    }
    .right_one_div {
        width: 100%;
        height: 90px;
        text-align: left;
        position: relative;
    }
    .right_one_img_a {
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
    .right_one_img_a img {
        width: 140px;
        min-height: 90px;
        vertical-align: middle;
        transition: all 0.6s;
    }
    .right_one_img_a img:hover {
        transform: scale(1.2);
    }
    .right_up_pp_span {
        display: block;
        position: absolute;
        color: #A6A6A6;
        font-size: 12px;
        left: 110px;
        bottom: 2px;
        opacity: 0.5;
    }
    .right_up_pp {
        width: 340px;
        height: 40px;
        position: relative;
        text-align: left;
    }
    .right_up_pp a {
        display: block;
        width: 190px;
        height: 200px;
        font-size: 14px;
        overflow: hidden;
    }
    .right_up_pp_source {
        display: block;
        float: left;
        position: relative;
        top: 30px;
    }
    .home_kitchen_adv_class {
        border:1px solid #ececec;
        width: 340px;
        height: 280px;
        margin: 0px auto;
    }
    .home_kitchen_img_a {
        width: 100%;
        height: 100%;
        display: block;
    }
    .home_kitchen_img_a img {
        width: 100%;
        height: 100%;
    }
    .home_kitchen_title {
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
    .home_guanggao {
        display: block;
        float: right;
        color: #eee;
        font-size: x-small;
        position: relative;
        right: 25px;
        top: -20px;
        opacity: .2;
    }
</style>