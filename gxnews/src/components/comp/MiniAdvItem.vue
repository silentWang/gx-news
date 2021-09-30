<template>
    <div>
        <div :id="itemId" v-if="advType != 'advbd'">
            <div v-if="type == 'kitchen'">
                <a :href="itemUrl" target="_blank" class="mini_adv_kitchen" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                    <img :src="pictures[0]">
                    <div>广告</div>
                </a>
                <a class="mini_adv_kitchen_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
            </div>
            <div v-else>
                <div class="mini_adv_four" v-if="pictures.length == 4">
                    <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="four_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p">广告</span></a>
                </div>
                <div class="mini_adv_three" v-if="pictures.length == 3">
                    <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="three_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
                <div class="mini_adv_two" v-if="pictures.length == 2">
                    <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="two_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p" @mousedown="advDown" @mouseup="advUp">广告</span></a>
                </div>
                <div v-else>
                    <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
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
            default:""
        }
    },
    data(){
        return {
            itemId:"",
            advType:"advDFTT",
            advData:'',
            tszData:"",
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
        },
    }
}
</script>
<style>
    .mini_adv_kitchen {
        display: block;
        width: 200px;
        height: 185px;
    }
    .mini_adv_kitchen div {
        color: #ccc;
        font-size: 10px;
        position: relative;
        width: 192px;
        text-align: right;
        top: -185px;
    }
    .mini_adv_kitchen img {
        width: 200px;
        height: 185px;
        transition: all 1s;
    }
    .mini_adv_kitchen img:hover {
        transform: scale(1.2);
    }
    .mini_adv_kitchen_title {
        display: block;
        width: 200px;
        height: 45px;
        position: relative;
        top: -44px;
        color: #fff;
        font-size: 14px;
        overflow: hidden;
        padding: 4px 2px 0px 4px;
        text-align: left;
        background: rgba(0, 0, 0, 0.7);
    }
    .mini_adv_title {
        font-size: 17px;
        font-weight: bold;
        display: block;
    }
    .four_image a {
        width: 138px;
        display: block;
        padding: 0 10px 0 px;
        float: left;
        overflow: hidden;
    }
    .four_image a img {
        width: 130px;
    }
    .three_image a {
        width: 185px;
        display: block;
        padding: 0 10px 0 px;
        float: left;
        overflow: hidden;
    }
    .three_image a img {
        width: 180px;
    }
    .two_image a {
        width: 278px;
        display: block;
        padding: 0 10px 0 px;
        float: left;
        overflow: hidden;
    }
    .two_image a img {
        width: 275px;
    }
    .pic_ad_a {
        padding: 5px 0 0 0;
    }
    .pic_ad_a img{
        width: 100%;
    }
</style>