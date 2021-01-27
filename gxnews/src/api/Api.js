import axios from './request'

export const getNewsList = ()=>{
    //test
    let categery = [];
    for(let i = 0;i < 8;i++){
        categery.push({id:i,name:"游戏",url:""});
    }
    let news = [];
    for(let i = 0;i < 10;i++){
        news.push({
            id:i,
            url:'https://www.baidu.com/',
            title:"这是新闻标题",
            author:"大神王",
            time:"2012-01-25",
            image_urls:["https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg"]
        });
    }
    let news24 = [];
    for(let i = 0;i < 10;i++){
        news24.push({
            id:i,
            url:'https://www.baidu.com/',
            title:"这是新闻标题你看看你看看你看看那啊",
            from:"大神王",
            image_url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg"
        });
    }
    return {categery,news,news24}

    return axios.get("/index/list").then(res=>{res.data})
}