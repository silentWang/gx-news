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
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p">{{itemSource}}</span></a>
                </div>
                <div class="mini_adv_three" v-else-if="pictures.length == 3">
                    <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="three_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p" @mousedown="advDown" @mouseup="advUp">{{itemSource}}</span></a>
                </div>
                <div class="mini_adv_two" v-else-if="pictures.length == 2">
                    <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <div class="two_image" v-for="(item,index) in pictures" :key="index">
                        <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><img :src="item"></a>
                    </div>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p" @mousedown="advDown" @mouseup="advUp">{{itemSource}}</span></a>
                </div>
                <div v-else-if="singleSmallBool">
                    <a class="pic_ad_small_a" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <img :src='pictures[0]'/>
                        <span class="adv_mini_guanggao">广告</span>
                    </a>
                    <a class="mini_adv_small_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">
                        <span>{{itemTitle}}</span>
                        <div>{{itemSource}}</div>
                    </a>
                </div>
                <div v-else>
                    <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo" @mousedown="advDown" @mouseup="advUp">{{itemTitle}}</a>
                    <a target="_blank" :href="itemUrl" @click="clickTo" class="pic_ad_a" @mousedown="advDown" @mouseup="advUp"><img :src='pictures[0]'/></a>
                    <span class="adv_mini_guanggao">广告</span>
                    <a :href="itemUrl" target="_blank" @click="clickTo" @mousedown="advDown" @mouseup="advUp"><span class="mini_content_image_p" @mousedown="advDown" @mouseup="advUp">{{itemSource}}</span></a>
                </div>
            </div>
        </div>
        <div v-else v-html="bdcode" class="adv_class_bd_default">
        </div>
    </div>
</template>
<script>
import dataCenter from '@/api/DataCenter'
import Utils from "@/js/Utils"
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
            advType:"",
            advData:'',
            tszData:"",
            styleType:108,
            itemTitle:"",
            pictures:[],
            itemUrl:"",
            itemSource:"",
            bdcode:"",
            minix:0,
            miniy:0,
            singleSmallBool:false,
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
            if(this.advType == Utils.ADV_TYPE.DFTT){
                this.itemTitle = info.title;
                this.pictures = info.imgUrl;
                this.itemUrl = info.displayUrl;
                this.styleType = info.styleType;
                this.itemSource = info.adSource ? info.adSource:"热门";
                this.singleSmallBool = info.styleType == "1001" || info.styleType == "1003";
            }
            else if(this.advType == Utils.ADV_TYPE.TSZ){
                this.itemTitle = info.title;
                this.pictures = [info.img];
                this.itemUrl = info.curl;
                this.styleType = info.type;
                this.itemSource = info.adSource ? info.adSource:"热门";
                this.tszData = info;
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
                dataCenter.upTo360ShowLog(this.tszData);
            }
        },
        clickTo(evt){
            if(this.advType == Utils.ADV_TYPE.DFTT){
                dataCenter.upToActivity("df_click");
            }
            else if(this.advType == Utils.ADV_TYPE.TSZ){
                dataCenter.upToActivity("360_click");
                if(this.actionItem.name == "actionItemMiniDialog"){
                    dataCenter.upTo360ClkLog(this.tszData,this.minix,this.miniy,560,244,3);
                }
                else{
                    dataCenter.upTo360ClkLog(this.tszData,evt.offsetX,evt.offsetY,560,244,3);
                }
            }
        },
        advDown(evt){
            if(this.advType == Utils.ADV_TYPE.TSZ){
                if(this.actionItem.name == "actionItemMiniDialog"){
                    this.minix = 20 + 520*Math.random();
                    this.miniy = 10 + 210*Math.random();
                    dataCenter.upTo360ClkLog(this.tszData,this.minix,this.miniy,560,244,1);
                }
                else{
                    dataCenter.upTo360ClkLog(this.tszData,evt.offsetX,evt.offsetY,560,244,1);
                }
            }
        },
        advUp(evt){
            if(this.advType == Utils.ADV_TYPE.TSZ){
                if(this.actionItem.name == "actionItemMiniDialog"){
                    dataCenter.upTo360ClkLog(this.tszData,this.minix,this.miniy,560,244,2);
                }
                else{
                    dataCenter.upTo360ClkLog(this.tszData,evt.offsetX,evt.offsetY,560,244,2);
                }
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
    .pic_ad_small_a {
        width: 150px;
        height: 108px;
        display: block;
        float: left;
    }
    .pic_ad_small_a img {
        width: 100%;
        height: 100%;
    }
    .mini_adv_small_title {
        width: 400px;
        height: 108px;
        padding: 3px 0px 4px 0px;
        float: right;
    }
    .mini_adv_small_title span {
        width: 100%;
        height: 60px;
        display: block;
        font-size: 17px;
        font-weight: bold;
        float: left;
        overflow:hidden;
    }
    .mini_adv_small_title div {
        font-size: 12px;
        color: #bbb;
        text-align: left;
        float: left;
        display: block;
        position: relative;
        top: 25px;
    }
    .adv_mini_guanggao {
        display: block;
        float: right;
        color: #eee;
        font-size: x-small;
        position: relative;
        top: -20px;
        opacity: .2;
    }
</style>