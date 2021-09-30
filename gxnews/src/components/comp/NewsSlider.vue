<template>
    <div>
        <div :id="getNsId(1)" class="ns_main" v-show="newsList && newsList.length > 0">
            <ul :id="getNsId(2)" class="ns_main_ul">
                <li @mouseover="slideStop" @mouseout="slideContinue" class="ns_main_li" v-for="(item,index) in newsList" :key="index">
                    <img @click="gotoNews(item)" class="ns_slide_image" :src="item.pic">
                    <div class="ns_slide_title">
                        <a @click="gotoNews(item)">{{item.title}}</a>
                    </div>
                </li>
            </ul>
            <div v-show="newsList && newsList.length > 1" @click="lookAt(-1)" class="ns_slide_arrow_left"><span>〈</span></div>
            <div v-show="newsList && newsList.length > 1" @click="lookAt(1)" class="ns_slide_arrow_right"><span>〉</span></div>
        </div>
    </div>
</template>
<script>
import Utils from '@/js/Utils'
export default {
    props:{
        newsList:{
            type:Array,
            required:true
        },
        nWidth:{
            default:"200"
        },
        nHeight:{
            default:"200"
        },
        nsId:{
            required:true
        }
    },
    data(){
        return {
            currentIndex:0,
            isPlay:true
        }
    },
    mounted(){
        this.initAll();
        if(this.newsList && this.newsList.length > 1){
            Utils.addDelay(this.playNext,this,5000,0)
        }
    },
    methods:{
        initAll(){
            let emain = document.getElementById(this.getNsId(1));
            let swidth = this.nWidth + "px";
            let sheight = this.nHeight + "px";
            emain.style.width = swidth;
            emain.style.height = sheight;
            let emul = document.getElementById(this.getNsId(2));
            emul.style.width = (this.newsList.length * this.nWidth) + "px";
            let list = emul.children;
            for(let i = 0;i < list.length;i++){
                let eml = list[i];
                eml.style.width = swidth;
                eml.style.height = sheight;
                let img = eml.children[0];
                img.style.width = swidth;
                img.style.height = sheight;
            }
        },
        gotoNews(item){
            this.$emit("gotoNews",item)
        },
        getNsId(type){
            let str = "";
            if(type == 1){
                str = "ns_main_slider";
            }
            else if(type == 2){
                str = "ns_slider_ul";
            }
            return str +"_"+ this.nsId;
        },
        lookAt(direction){
            let index = -1;
            if(direction < 0){
                index = this.currentIndex + (this.currentIndex <= 0 ? 0 : -1);
            }
            else if(direction > 0){
                let len = this.newsList.length;
                index = this.currentIndex + (this.currentIndex >= len - 1 ? 0 : 1);
            }
            if(this.currentIndex == index || index < 0) return;
            this.currentIndex = index;
            let eul = document.getElementById(this.getNsId(2));
            if(!eul) return;
            eul.style.transition = "all 1s";
            eul.style.marginLeft = `-${index*this.nWidth}px`;
        },
        slideStop(){
            this.isPlay = false;
        },
        slideContinue(){
            this.isPlay = true;
        },
        playNext(){
            if(!this.isPlay) return;
            let len = this.newsList.length;
            let eul = document.getElementById(this.getNsId(2));
            if(!eul) return;
            this.currentIndex++;
            if(this.currentIndex >= len){
                eul.style.transition = "width 1s";
                eul.style.marginLeft = `0px`;
                // eul.style.left = `0px`;
                this.currentIndex = 0;
            }
            else{
                eul.style.transition = "all 1s";
                eul.style.marginLeft = `-${this.currentIndex*this.nWidth}px`;
                // eul.style.left = `-${this.currentIndex*this.nWidth}px`;
            }
        }
    }
}
</script>
<style>
    .ns_main {
        position: absolute;
        overflow: hidden;
    }
    .ns_main_ul {
        list-style: none;
        position: absolute;
        left: 0;
        transition: all 1s;
        display: flex;
        display: -webkit-flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: left;
    }
    .ns_main_li {
        float: left;
    }
    .ns_slide_image {
        cursor: pointer;
        transition: all 1s;
    }
    .ns_slide_image:hover {
        transform: scale(1.2);
    }
    .ns_slide_title {
        height: 45px;
        position: relative;
        top: -44px;
        color: #fff;
        overflow: hidden;
        padding: 4px 2px 0px 4px;
        text-align: left;
        background: rgba(0, 0, 0, 0.7);
    }
    .ns_slide_title a {
        color: #fff;
        font-size: 14px;
        padding: 4px 0px;
        line-height: 19px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .ns_slide_title a:hover {
        color: #fff;
    }
    .ns_slide_arrow_left {
        width: 20px;
        height: 24px;
        position: relative;
        left: 0px;
        top: 38%;
        padding:8px 0px 10px 0px;
        color: #fff;
        border-radius: 0px 5px 5px 0px;
        font-size: 18px;
        cursor:pointer;
        background: rgba(0, 0, 0, 0.7);
        overflow: hidden;
    }
    .ns_slide_arrow_right {
        width: 20px;
        height: 24px;
        position: absolute;
        float: right;
        top: 38%;
        right: 0px;
        padding:8px 0px 10px 0px;
        color: #fff;
        border-radius: 5px 0px 0px 5px;
        font-size: 18px;
        cursor:pointer;
        background: rgba(0, 0, 0, 0.7);
        overflow: hidden;
    }
    .ns_slide_arrow_left span {
        margin-left: -8px;
    }
    .ns_slide_arrow_right span {
        margin-left: 5px;
    }
</style>