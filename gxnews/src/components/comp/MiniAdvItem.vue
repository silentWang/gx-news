<template>
    <div>
        <div :id="itemId">
            <div class="mini_adv_four" v-if="pictures.length == 4">
                <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo">{{itemTitle}}</a>
                <div class="four_image" v-for="(item,index) in pictures" :key="index">
                    <a :href="itemUrl" @click="clickTo"><img :src="item"></a>
                </div>
                <a :href="itemUrl"><span class="mini_content_image_p">广告</span></a>
            </div>
            <div class="mini_adv_three" v-if="pictures.length == 3">
                <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo">{{itemTitle}}</a>
                <div class="three_image" v-for="(item,index) in pictures" :key="index">
                    <a :href="itemUrl" @click="clickTo"><img :src="item"></a>
                </div>
                <a :href="itemUrl"><span class="mini_content_image_p">广告</span></a>
            </div>
            <div class="mini_adv_two" v-if="pictures.length == 2">
                <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo">{{itemTitle}}</a>
                <div class="two_image" v-for="(item,index) in pictures" :key="index">
                    <a :href="itemUrl" @click="clickTo"><img :src="item"></a>
                </div>
                <a :href="itemUrl"><span class="mini_content_image_p">广告</span></a>
            </div>
            <div v-else>
                <a class="mini_adv_title" target="_blank" :href="itemUrl" @click="clickTo">{{itemTitle}}</a>
                <a target="_blank" :href="itemUrl" @click="clickTo" class="pic_ad_a"><img :src='pictures[0]'/></a>
                <a :href="itemUrl"><span class="mini_content_image_p">广告</span></a>
            </div>
        </div>
    </div>
</template>
<script>
import dataCenter from '@/api/DataCenter'
import DFAdver from '@/api/DFAdver'
export default {
    data(){
        return {
            itemId:"",
            advData:'',
            styleType:108,
            itemTitle:"",
            pictures:[],
            itemUrl:""
        }
    },
    created(){
        this.advData = DFAdver.getNextAd();
        this.itemId = this.advData.elementID;
        DFAdver.addCallBacks(this.advData.elementID,this.updateInfo,this);
    },
    methods:{
        updateInfo(){
            let data = DFAdver.getAdvDataById(this.advData.elementID);
            let info = data;
            this.itemTitle = info.title;
            this.pictures = info.imgUrl;
            this.itemUrl = info.displayUrl;
            this.styleType = info.styleType;
            dataCenter.upToActivity(200001,"show",this.itemId);
        },
        clickTo(){
            if(this.itemId){
                dataCenter.upToActivity(200001,"click",this.itemId);
            }
        }
    }
}
</script>
<style>
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