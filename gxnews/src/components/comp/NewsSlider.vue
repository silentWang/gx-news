<template>
    <div>
        <div :id="getNsId(1)" class="ns_main" v-show="newsList && newsList.length > 0">
            <ul :id="getNsId(2)" class="ns_main_ul">
                <li @mouseover="slideStop" @mouseout="slideContinue" class="ns_main_li" v-for="(item,index) in newsList" :key="index">
                    <img @click="gotoNews(item.id)" class="ns_slide_image" :src="item.pic">
                    <div class="ns_slide_title">
                        <a @click="gotoNews(item.id)">{{item.title}}</a>
                    </div>
                </li>
            </ul>
            <!-- <div class="ns_slide_arrow">
                <div class="ns_slide_arrow_left">《</div>
                <div class="ns_slide_arrow_left">》</div>
            </div> -->
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
            type:String,
            default:"200"
        },
        nHeight:{
            type:String,
            default:"200"
        },
        nsId:{
            type:Number,
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
            Utils.addDelay(5000,this.playNext,this)
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
        gotoNews(id){
            this.$emit("gotoNews",id)
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
            this.currentIndex++;
            if(this.currentIndex >= len){
                eul.style.transition = "width 1s";
                eul.style.marginLeft = `0px`;
                this.currentIndex = 0;
            }
            else{
                eul.style.transition = "all 1s";
                eul.style.marginLeft = `-${this.currentIndex*this.nWidth}px`;
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
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items:center;
        z-index: 100;
        transition: all 1s;
    }
    .ns_slide_image {
        cursor: pointer;
        transition: all 1s;
    }
    .ns_slide_image:hover {
        transform: scale(1.2);
    }
    .ns_slide_title {
        height: 36px;
        position: relative;
        top: -36px;
        color: #fff;
        overflow: hidden;
        padding: 1px 1px 0px 2px;
        text-align: left;
        background: rgba(0, 0, 0, 0.7);
    }
    .ns_slide_title a {
        color: #fff;
    }
    .ns_slide_title a:hover {
        color: #f24e4e;
    }
    .ns_slide_arrow {
        width: 100%;
        position: relative;
        top:60px;
    }
    .ns_slide_arrow_left {
        width: 30px;
        height: 30px;
        background: rgba(0, 0, 0, 0.8);
    }
</style>