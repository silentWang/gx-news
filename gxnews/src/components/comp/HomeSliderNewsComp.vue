<template>
    <div>
        <div class="home_newscon">
            <div class="home_slider_con">
                <div class="hs_ul_list">
                    <a class="hs_slider_image">
                        <img :src="newsInfo.pics?newsInfo.pics[0]:''">
                    </a>
                    <a class="hs_slider_title">{{newsInfo.title}}</a>
                </div>
            </div>
            <div></div>
        </div>
        <div class="home_first_news">
            <a>
                <h3>吉林监狱罪犯越狱脱逃现场监控曝光！翻墙逃跑</h3>
            </a>
        </div>
    </div>
</template>
<script>
import Utils from "@/js/Utils"
export default {
    props:{
        // newsList:{
        //     default(){
        //         return []
        //     }
        // }
    },
    data(){
        return {
            newsList:[],
            newsInfo:{},
            currentIndex:0
        }
    },
    mounted(){
        this.newsList = [
            {"id":8794661,"type":1,"title":"\u201c\u9738\u9053\u201d\u8d27\u8f66\u9738\u5360\u975e\u673a\u52a8\u8f66\u9053\u5378\u8d27","pics":["\/\/dfzximg02.dftoutiao.com\/news\/20211019\/20211019160805_f74b948282a306a86f3221bec57aa407_1_mwpm_03201609.jpeg"],"click":0,"cateId":1,"time":"2021\/10\/19","from":"\u65b0\u6c11\u665a\u62a5"},
            {"id":8794660,"type":1,"title":"\u7f57\u5609\u826f\u8001\u5a46\u6652\u7167\uff0c\u5bf9\u955c\u6d17\u5934\u4e0d\u5728\u610f\u7d20\u989c\u76ae\u80a4\u5ae9\uff0c\u8001\u516c\u4e0d\u5728\u5bb6\u72ec\u4eab\u751f\u6d3b","pics":["\/\/imgcdn.toutiaoyule.com\/20211019\/20211019164025628759a_t.jpeg?135x90"],"click":0,"cateId":1,"time":"2021\/10\/19","from":"\u732b\u773c\u5a31\u4e50"}
        ];
        this.newsInfo = this.newsList[this.currentIndex]
        Utils.addDelay(this.showNext,this,3000,0);
    },
    methods:{
        showNext(){

        }
    }
}
</script>

<style>
    .home_newscon {
        height: 260px;
        width: 100%;
        overflow:hidden;
    }
    .home_slider_con {
        width: 100%;
        height: 100%;
    }
    .hs_ul_list {
        list-style: none;
    }
    .hs_ul_list li {
        width: 100%;
        overflow:hidden;
    }
    .hs_ul_list .hs_slider_image {
        display: block;
        width: 100%;
        height: 260px;
        overflow:hidden;
        cursor: pointer;
    }
    .hs_slider_image img {
        width: 100%;
        cursor: pointer;
    }
    .hs_slider_title {
        display: block;
        width: 100%;
        height: 30px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        font-size: 18px;
        text-align: left;
        padding:5px 0 0 10px;
        position: relative;
        top: -35px;
        cursor: pointer;
    }
    .home_first_news {
        width: 100%;
        position: relative;
        overflow: hidden;
        height: 45px;
        box-shadow: 5px 5px 5px #ddd;
        margin-bottom: 15px;
    }
    .home_first_news a {
        cursor: pointer;
    }
    .home_first_news a h3 {
        padding-top: 5px;
        padding-left: 10px;
        text-align: left;
        line-height: 40px;
        font-size: 26px;
        font-weight: 700;
        color: #ee4b4c;
        text-overflow: ellipsis;
    }
</style>