<template>
    <div>
        <div v-if="type == 'next'">
            <div id="next_pic">
                <a target="_blank">
                    <img :src="images[0]" @click="gotoNews"/>
                </a>
            </div>
            <div class="an_dialog_list_news_title_content">
                <div>
                    <a class="bn_left_link"  @click="gotoNews">{{title}}</a>
                </div>
                <div class="an_dialog_list_news_tag" @click="gotoNews">
                    <span class="tags_wrapper">
                        <a href="#">娱乐</a>&nbsp;
                        <a href="#">新闻</a>&nbsp;
                    </span>
                    <span>{{time}}</span>
                </div>
            </div>
        </div>
        <div v-else-if="type == 'nup'">
            <div class="nup_three_div" v-if="images.length >= 3">
                <a :title="title" @click="gotoNews">{{title}}</a>
                <div class="nup_three_img_div">
                    <a href="" @click="gotoNews">
                        <img :src="images[0]">
                    </a>
                    <a href="" @click="gotoNews">
                        <img :src="images[1]">
                    </a>
                    <a href="" @click="gotoNews">
                        <img :src="images[2]">
                    </a>
                </div>
                <span class="nup_three_from_time" @click="gotoNews">{{from}}&nbsp;&nbsp;&nbsp;</span>
            </div>
            <div class="nup_one_div" v-else>
                <a class="n_up_image_a"  :title="title">
                    <img :src="images[0]" @click="gotoNews">
                </a>
                <div class="n_up_pp">
                    <a :title="title" @click="gotoNews">{{title}}</a>
                </div>
                <p><span class="n_up_pp_span" @click="gotoNews">{{from}}&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        type:{
            default:function(){
                return "next";
            }
        },
        newsInfo:{
            required:true
        }
    },
    data(){
        return {
            images:[],
            title:"",
            from:"",
            time:""
        }
    },
    mounted(){
        this.images = this.newsInfo.pics;
        this.title = this.newsInfo.title;
        this.from = this.newsInfo.from;
        this.time = this.newsInfo.time;
    },
    methods:{
        gotoNews(){
            this.$emit("gotoNews",this.newsInfo.id)
        }
    }
}
</script>
<style>
    #next_pic {
        width: 177px;
        height: 100px;
        float: left;
        margin-right: 15px;
        background-color: #f1f1f1;
    }
    #next_pic a {
        width: 177px;
        height: 100px;
        display: block;
        overflow: hidden;
    }
    #next_pic img {
        width: 177px;
        height: 100px;
        overflow: hidden;
        padding: 0px;
        transition: all 0.6s;
    }
    #next_pic img:hover {
        transform: scale(1.2);
    }
    .an_dialog_list_news_title_content {
        text-align: left;
        float: left;
        width: 500px;
        height: 95px;
        position: relative;
    }
    .an_dialog_list_news_title_content div {
        background: #fff;
        text-align: left;
    }
    .bn_left_link {
        color: #222222;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
    }
    .an_dialog_list_news_tag {
        position: absolute;
        bottom: 0px;
        left: 0px;
        zoom: 1;
        width: 100%;
        font-size: 12px;
        color: #bbb;
    }
    .tags_wrapper a {
        border: 1px solid #eee;
        border-radius: 3px;
        padding: 2px 6px;
        color: #a0a0a0;
        font-style: normal;
    }
    .tags_wrapper a:hover {
        border: 1px solid #f24e4e;
        border-radius: 3px;
        padding: 2px 6px;
        color: #f24e4e;
        font-style: normal;
    }
    .nup_three_div {
        text-align: left;
    }
    .nup_three_div a {
        color: #333;
        font-size: 17px;
        font-weight: bold;
        font-family: "Microsoft YaHei";
        letter-spacing: .5px;
    }
    .nup_three_div a:hover {
        color: #f24e4e;
    }
    .nup_three_img_div {
        position: relative;
        margin-left: -5px;
        top: 5px;
    }
    .nup_three_img_div a {
        width: 140px;
        height: 90px;
        display: block;
        overflow: hidden;
        float: left;
        margin-left: 5px;
    }
    .nup_three_img_div img {
        width: 140px;
        height: 90px;
        transition: all .5s;
    }
    .nup_three_img_div img:hover {
        transform: scale(1.2);
    }
    .nup_three_from_time {
        color: #A6A6A6;
        text-decoration: none;
        font-size: 12px;
        position: relative;
        top: 10px;
    }
    .nup_one_div {
        width: 100%;
        height: 90px;
        position: relative;
    }
    .n_up_image_a {
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
    .n_up_image_a img {
        width: 140px;
        min-height: 90px;
        vertical-align: middle;
        transition: all 0.6s;
    }
    .n_up_image_a img:hover {
        transform: scale(1.2);
    }
    .n_up_pp {
        width: 280px;
        position: relative;
        text-align: left;
        overflow: hidden;
    }
    .n_up_pp a {
        font-size: 17px;
        font-weight: bold;
        font-family: "Microsoft YaHei";
    }
    .n_up_pp_span {
        display: block;
        position: absolute;
        color: #A6A6A6;
        font-size: 12px;
        left: 150px;
        bottom: 0px;
    }
</style>