<template>
    <div>
        <div :id="itemId" v-if="advType != 'advbd'">
            <div v-if="type == 'left'">
                <div class="left_one_div">
                    <a :href="itemUrl" target="_blank" class="left_one_img_a" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src="pictures[0]">
                    </a>
                    <div class="left_up_pp">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    </div>
                    <p><a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="left_up_pp_span">广告</span></a></p>
                </div>
            </div>
            <div v-else-if="type == 'kitchen'">
                <div class="kitchen_adv_class">
                    <a class="kitchen_img_a" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src="pictures[0]">
                    </a>
                    <a class="kitchen_title" :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                </div>
            </div>
            <div v-else>
                <div class="cmini_adv_four" v-if="pictures.length == 4">
                    <a class="cmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="cfour_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p">广告</span></a>
                </div>
                <div class="mini_adv_three" v-else-if="pictures.length == 3">
                    <a class="cmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="cthree_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
                <div class="mini_adv_two" v-else-if="pictures.length == 2">
                    <a class="cmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="ctwo_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
                <div v-else>
                    <a class="cmini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <a target="_blank" :href="itemUrl" @click="clickTo" class="pic_ad_a" @mousedown="advDown" @mouseup="advUp"><img :src='pictures[0]'/></a>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
            </div>
        </div>
        <div v-else v-html="bdcode" class="adv_class_bd_default">
        </div>
    </div>
</template>
<script>
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
            advType:"advDFTT",
            advData:'',
            tszData:'',
            styleType:108,
            itemTitle:"",
            pictures:[],
            itemUrl:"",
            bdcode:""
        }
    },
    created(){
        this.advData = this.actionItem.getNextAd(this.updateInfo,this);
        this.itemId = this.advData.elementID;
    },
    methods:{
        updateInfo(){
            let info = this.advData.data;
            if(!info) {
                this.advType = "advbd"
                // this.bdcode = dataCenter.getDefaultBDAdv();
                // this.$nextTick(()=>{
                //     dataCenter.addAdsByClassName("adv_class_bd_default");
                // });
                return;
            }
            this.advType = info.advType;
            if(this.advType == "advDFTT"){
                this.itemTitle = info.title;
                this.pictures = info.imgUrl;
                this.itemUrl = info.displayUrl;
                this.styleType = info.styleType;
            }
            else if(this.advType == "adv360"){
                this.itemTitle = info.title;
                this.pictures = [info.img];
                this.itemUrl = info.curl;
                this.styleType = info.type;
                this.tszData = info;
                dataCenter.upTo360ShowLog(this.tszData);
            }
        },
        clickTo(evt){
            if(this.advType == "advDFTT"){
                dataCenter.upToActivity(200001,"click200001",this.itemId);
            }
            else if(this.advType == "adv360"){
                dataCenter.upToActivity(200002,"click200002",this.itemId);
                dataCenter.upTo360ClkLog(this.tszData,evt.offsetX,evt.offsetY,560,244,3);
            }
        },
        advDown(evt){
            if(this.advType == "adv360"){
                dataCenter.upTo360ClkLog(this.tszData,evt.offsetX,evt.offsetY,560,244,1);
            }
        },
        advUp(evt){
            if(this.advType == "adv360"){
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
        padding: 5px 0 0 0;
    }
    .pic_ad_a img{
        width: 100%;
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
        left: 150px;
        bottom: 10px;
    }
    .left_up_pp {
        width: 340px;
        position: relative;
        text-align: left;
    }
    .left_up_pp a {
        display: block;
        width: 190px;
        height: 200px;
        font-size: 14px;
        overflow: hidden;
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
        display: block;
        position: relative;
        width: 100%;
    }
</style>