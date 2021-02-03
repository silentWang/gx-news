<template>
    <div class="cls_newsdetail">
        <div>
            <h2>{{detailInfo.title}}</h2>
            <span v-show="detailInfo.updated_at ? true : false">发布时间: {{detailInfo.updated_at}}</span>
            <div class="cls_newscontent" v-html="detailInfo.content">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            detailInfo:{}
        }
    },
    methods:{
        setData(info){
            info.content = this.escapeHtml(info.content);
            this.detailInfo = info;
        },
        escapeHtml(str) {
            var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
            str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
            str = str.replace(/gif@/g,'gif?@');
            return str.replace(/padding-bottom:( ?)[0-9]+(.?)\d+%/g,"");
        }
    }
}
</script>
<style>
    .cls_newsdetail {
        width: 100%;
        /* margin: 0 auto; */
        text-align: left;
    }
    .cls_newscontent {
        display: block;
    }
    .cls_newscontent img {
        display: block;
        margin: 0 auto;
    }
</style>