<template>
    <div class="cls_newsdetail">
        <div v-for="n in list" :key="n.id">
            <h2>{{n.title}}</h2>
            <span>发布时间: {{n.pubTime}}</span>
            <div class="cls_newscontent" >
                <p v-html="n.content"></p>
            </div>
        </div>
        <div class="cls_newsmore">
            <div v-for="item in more_list" :key="item.id">
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[{id:"1",title:"这是标题",pubTime:'2012/05/03',content:"这是新闻内容"}],
            more_list:[{id:1,img:'',title:"哈哈哈哈哈",url:'cccccccc'}]
        }
    },
    mounted(){
        this.setContent();
    },
    methods:{
        setContent(){
            let content = "这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容"
            this.list = [{id:"1",title:"这是标题",pubTime:'2012/05/03',content}]
            return this.list;
        }
    }
}
</script>
<style>
    .cls_newsdetail {
        width: 100%;
        margin: 0 auto;
    }
    .cls_newscontent {
        display: block;
        overflow: hidden;
    }
</style>