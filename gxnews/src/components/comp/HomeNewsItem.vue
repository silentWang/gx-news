<template>
    <div>
        <div v-if="type == 'home'">
            <div class="an_content_image" @click="gotoNews">
                <a target="_blank"><img :src='image'/></a>
            </div>
            <div class="an_content_desc">
                <div class="an_content_desc_inner" @click="gotoNews">
                    <h2><a target="_blank">{{title}}</a></h2>
                    <p class="an_content_info">
                        <a target="_self" >{{cateName}}</a>&nbsp;
                        <a target="_self" v-show="from.length > 0">{{from}}</a>&nbsp;
                        <span>{{time}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div v-else-if="type == 'small'" class="an_small_content">
             <a class="image"  :title="title">
                <img :src="image" @click="gotoNews">
            </a>
            <p>
                <a  :title="title" @click="gotoNews">{{title}}</a>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        type:{
            required:false,
            default:function(){
                return "home"
            }
        },
        cateName:"",
        newsInfo:{
            required:true
        }
    },
    data(){
        return {
            title:"",
            image:"",
            from:"",
            time:""
        }
    },
    mounted(){
        this.title = this.newsInfo.title;
        this.image = this.newsInfo.pics[0]
        this.from = this.newsInfo.from;
        this.time = this.newsInfo.time;
    },
    methods:{
        gotoNews(){
            if(this.newsInfo.type == 3){
                window.open(this.newsInfo.url,"_blank");
                return;
            }
            this.$emit("gotoNews",this.newsInfo.id)
        }
    }
}
</script>

<style>
    .an_content_image {
        display: block;
        background-color: #f1f1f1;
        overflow: hidden;
        width: 154px;
        height: 88px;
        float: left;
        margin-right: 15px;
    }
    .an_content_image a,.an_content_image img {
        display: block;
        background-color: #f1f1f1;
        overflow: hidden;
        width: 154px;
        height: 88px;
    }
    .an_content_image img {
        vertical-align: middle;
        width: 154px;
        height: auto;
        transition: all 0.6s;
    }
    .an_content_image img:hover {
        transform: scale(1.2);
    }
    .an_content_desc {
        width: 495px;
        height: 88px;
        float: left;
        position: relative;
    }
    .an_content_desc_inner {
        display: block;
        position: absolute;
        top: 50%;
        width: 100%;
        transform: (0,-50%);
        -webkit-transform: translate(0,-50%);
        -ms-transform: translate(0,-50%);
    }
    .an_content_desc_inner h2 {
        font-size: 20px;
        line-height: 1.3;
        margin-bottom: 4px;
        font-weight: 700;
        max-height: 52px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        cursor: pointer;
        text-align: left;
    }
    .an_content_info {
        font-size: 12px;
        color: #bbb;
        margin-top: 4px;
        text-align: left;
    }
    .an_content_info a {
        font-style: normal;
        border: 1px solid #eee;
        border-radius: 3px;
        padding: 2px 6px;
        color: #a0a0a0;
    }
    .an_content_info a:hover {
        border: 1px solid #f24e4e;
        border-radius: 3px;
        padding: 2px 6px;
        color: #f24e4e;
        font-style: normal;
    }
    .an_small_content a.image {
        float: left;
        width: 100px;
        height: 57px;
        display: block;
        overflow: hidden;
        margin-right: 10px;
        background: #f1f1f1;
        position: relative;
        cursor: pointer;
    }
    .an_small_content .image img {
        vertical-align: middle;
        width: 100px;
        height: 57px;
        transition: all 0.6s;
    }
    .an_small_content .image img:hover {
       transform: scale(1.2);
    }
    .an_small_content p {
        width: 206px;
        height: 54px;
        text-align: left;
        float: left;
        overflow: hidden;
        line-height: 25px;
    }
</style>