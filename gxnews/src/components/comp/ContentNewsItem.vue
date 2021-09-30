<template>
    <div>
        <div v-if="type == 'next'">
            <div id="next_pic">
                <a target="_blank">
                    <img :src="images[0]" @click="gotoNews"/>
                </a>
            </div>
            <div class="acn_news_next_title_content">
                <div>
                    <a class="bn_left_link"  @click="gotoNews">{{title}}</a>
                </div>
                <div class="acn_next_list_news_tag" @click="gotoNews">
                    <span class="tags_wrapper">
                        <a href="#">娱乐</a>&nbsp;
                        <a href="#">新闻</a>&nbsp;
                    </span>
                    <span>{{time}}</span>
                </div>
            </div>
        </div>
        <div v-else-if="type == 'nup'">
            <div class="nup_one_div">
                <a class="n_up_image_a"  :title="title">
                    <img :src="images[0]" @click="gotoNews">
                </a>
                <div class="n_up_pp">
                    <a :title="title" @click="gotoNews">{{title}}</a>
                </div>
                <p><span class="n_up_pp_span" @click="gotoNews"><span>{{from}}</span>的人还浏览了</span></p>
            </div>
        </div>
        <div v-else-if="type == 'nlink'">
            <div class="nup_nlink_div">
                <a @click="gotoNews">{{from}}&nbsp;&nbsp;&nbsp;&nbsp;</a>
                <a :title="title" @click="gotoNews">{{title}}</a>
            </div>
        </div>
        <div v-else-if="type == 'hot'">
            <div class="nup_hot_div">
                <a class="nup_hot_image_a"  :title="title">
                    <img :src="images[0]" @click="gotoNews">
                </a>
                <a :title="title" class="hot_title" @click="gotoNews">{{title}}</a>
            </div>
        </div>
        <div v-if="type == 'dialog'">
            <div id="next_pic">
                <a target="_blank">
                    <img :src="images[0]" @click="gotoNews"/>
                </a>
            </div>
            <div class="acn_news_dialog_title_content">
                <div>
                    <a class="bn_left_link"  @click="gotoNews">{{title}}</a>
                </div>
                <div class="acn_dialog_list_news_tag" @click="gotoNews">
                    <span class="tags_wrapper">
                        <a href="#">娱乐</a>&nbsp;
                        <a href="#">新闻</a>&nbsp;
                    </span>
                    <span>{{time}}</span>
                </div>
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
        },
        cateName:""
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
        this.time = this.newsInfo.time;
        if(this.type == "nup"){
            let rate = 20 + Math.floor(80*Math.random());
            this.from = rate + "%";
        }
        else if(this.type == "nlink"){
            this.from = this.cateName ? this.cateName : "推荐"
        }
        else{
            this.from = this.newsInfo.from;
        }
    },
    methods:{
        gotoNews(){
            this.$emit("gotoNews",this.newsInfo)
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
    .acn_news_next_title_content {
        text-align: left;
        float: left;
        width: 500px;
        height: 95px;
        position: relative;
    }
    .acn_news_next_title_content div {
        background: #fff;
        text-align: left;
    }
    .acn_news_dialog_title_content {
        text-align: left;
        float: left;
        width: 500px;
        height: 95px;
        position: relative;
    }
    .acn_news_dialog_title_content div {
        text-align: left;
    }
    .bn_left_link {
        color: #333;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
    }
    .acn_next_list_news_tag {
        position: absolute;
        bottom: 0px;
        left: 0px;
        zoom: 1;
        width: 100%;
        font-size: 12px;
        color: #bbb;
    }
    .acn_dialog_list_news_tag {
        position: absolute;
        bottom: 0px;
        left: 0px;
        zoom: 1;
        width: 100%;
        font-size: 12px;
        color: #666;
    }
    .acn_next_list_news_tag .tags_wrapper a {
        border: 1px solid #eee;
    }
    .tags_wrapper a {
        border: 1px solid #f24e4e;
        border-radius: 3px;
        padding: 2px 6px;
        color: #f24e4e;
        font-style: normal;
    }
    .tags_wrapper a:hover {
        border: 1px solid #f24e4e;
        border-radius: 3px;
        padding: 2px 6px;
        color: #f24e4e;
        font-style: normal;
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
        width: 340px;
        position: relative;
        text-align: left;
    }
    .n_up_pp a {
        display: block;
        width: 190px;
        height: 200px;
        font-size: 14px;
        overflow: hidden;
    }
    .n_up_pp_span {
        display: block;
        position: absolute;
        color: #A6A6A6;
        font-size: 12px;
        left: 150px;
        bottom: 10px;
    }
    .n_up_pp_span span {
        color: #ee4b4c;
    }
    .nup_nlink_div {
        width: 350px;
        display: inline-block;
        text-align: left;
        padding-left: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .nup_hot_div {
        width: 166px;
    }
    .nup_hot_div .hot_title {
        display: block;
        width: 156px;
        height: 36px;
        overflow: hidden;
    }
    .nup_hot_div .nup_hot_image_a {
        width: 166px;
        height: 92px;
    }
    .nup_hot_div .nup_hot_image_a img{
        width: 166px;
        height: 100%;
    }
</style>