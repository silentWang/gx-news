import axios from './request'

export const getNewsList = ()=>{
    return axios.get("/v1/news/cate").then(res=>res.data)
}
/**分类下资讯列表 */
export const getNewsListById = (idx)=>{
    let ext = "/v1/news/list?cateid="+idx
    return axios.get(ext).then(res=>res.data)
}
/**新闻详情 */
export const getNewsDetailById = (idx)=>{
    // let data = {
    //     category_id: 1,
    //     click: 0,
    //     content: "&lt;div class=&quot;article container&quot;&gt;↵                &lt;p&gt;我们常说“世界之大无奇不有”，虽说我们大家的思想正在逐渐开放，与时俱进中，但是对于部分事情的发生还是有些不理解，大跌眼镜，在现如今这个高压社会下生存每个人或多或少都会有些压力，倘若这些积攒的压力没有得到妥善抒发，便会造成极其严重的后果，对此，希望屏幕前的各位懂得抒发内心的压力，且必须要选择正确的方式，不要伤害到自己。&lt;/p&gt;&lt;p&gt;要知道无论发生怎样的事情我们都要做打不死的小强，要一如既往地好好爱自己，不要伤害自己更不要随便作践自己，要知道这样非但解决不了问题，于事无补，反而还会伤害到自己。&lt;/p&gt;&lt;p&gt;这不就在近日，广西柳州发生的一件事让大家大跌眼镜，但也确确实实为这位姑娘感到惋惜，事情是这样的在当地虹桥路口一名全身赤裸的女子就那样静静的跪在地上，一句话也不说，对于这一情况过路人都忍不住多看两眼，当然更多的也是好奇这位姑娘究竟是因为什么要这样做，下面让我们一起来看看吧！&lt;/p&gt;&lt;div class=&quot;lazy-img-container img custom-height &quot; data-count=&quot;4&quot; style=&quot;max-width: 640px&quot;&gt;↵                        &lt;div class=&quot;content img-loaded&quot; style=&quot;padding-bottom: 75.3125%&quot;&gt;↵                            &lt;img src=&quot;https://publish-pic-cpu.baidu.com/af25aeed-816d-45e5-af49-22892a589c7a.jpeg@q_90,w_450&quot; data-src=&quot;https://publish-pic-cpu.baidu.com/af25aeed-816d-45e5-af49-22892a589c7a.jpeg@q_90,w_450&quot; data-width=&quot;640&quot; data-height=&quot;482&quot;&gt;↵                        &lt;/div&gt;↵                    &lt;/div&gt;&lt;p&gt;通过网络上所流传的视频，我们清楚地看到该名女子没穿衣服全身赤裸的跪在一辆黑色轿车旁，全程一言不发，众所周知现如今这个天气有多寒冷，更别说是不穿衣服了，就算是穿衣服长时间跪在外边也都受不了，难以想象这位年轻女子又是怎么忍受这一切的。&lt;/p&gt;&lt;p&gt;对于这一奇葩行为成功吸引不少过路人围观，大家也都十分好奇究竟是发生了什么事情会导致一个年轻小姑娘不在乎面子的全身赤裸跪在大马路上，更多的是对她这种行为感到无法理解。&lt;/p&gt;&lt;p&gt;从视频中我们看到这位女子年纪不大，也就像二十出头左右，留着一头利落的短发，不少过路人看到这一情况后便上前给她披衣服，但都遭到了女子的拒绝，对于过路人的暖心行为丝毫不感冒，一直沉默的跪在轿车旁边，过了没一会便起身离开，全程一言不发。&lt;/p&gt;&lt;div class=&quot;lazy-img-container img custom-height &quot; data-count=&quot;4&quot; style=&quot;max-width: 640px&quot;&gt;↵                        &lt;div class=&quot;content img-loaded&quot; style=&quot;padding-bottom: 79.84375%&quot;&gt;↵                            &lt;img src=&quot;https://publish-pic-cpu.baidu.com/af09c37c-e1c2-44b4-9d50-0047eae7f4c3.jpeg@q_90,w_450&quot; data-src=&quot;https://publish-pic-cpu.baidu.com/af09c37c-e1c2-44b4-9d50-0047eae7f4c3.jpeg@q_90,w_450&quot; data-width=&quot;640&quot; data-height=&quot;511&quot;&gt;↵                        &lt;/div&gt;↵                    &lt;/div&gt;&lt;p&gt;这件事情曝光后引起广大网友的关注，大家纷纷对此事发表看法，猜测这位女子或许是遇到了什么不顺心的事，心态崩了，因此做出了这样冲动的行为，也有不少网友猜测这位小姑娘或许是为情所困，感情不顺，毕竟女孩在受到感情挫折时往往都会做出冲动举动，虽说对于事情真相究竟是怎样我们无从得知，但是我想说的是无论是因为何种原因，遇到了什么问题大家都不应当选择这么极端的方式，最终受到伤害的只有自己罢了。&lt;/p&gt;&lt;div class=&quot;lazy-img-container img custom-height &quot; data-count=&quot;4&quot; style=&quot;max-width: 640px&quot;&gt;↵                        &lt;div class=&quot;content img-loaded&quot; style=&quot;padding-bottom: 59.06249999999999%&quot;&gt;↵                            &lt;img src=&quot;https://publish-pic-cpu.baidu.com/1bd6c129-6851-4328-b9d3-8d153c419ff8.jpeg@q_90,w_450&quot; data-src=&quot;https://publish-pic-cpu.baidu.com/1bd6c129-6851-4328-b9d3-8d153c419ff8.jpeg@q_90,w_450&quot; data-width=&quot;640&quot; data-height=&quot;378&quot;&gt;↵                        &lt;/div&gt;↵                    &lt;/div&gt;&lt;p&gt;在现如今这个高压社会下，每个人每天都会遇到各种各样的烦心事，倘若不能合理地调节情绪，凡事都情绪化，一旦情绪爆发的那一刻后果将不堪设想，甚至你会做出一系列不受控制的举动。&lt;/p&gt;&lt;p&gt;其实通过新闻报道我们也都看到了许多诸如此类的报道，在以往也是发生了许多奇葩、另类的行为，但这样就能够将问题解决吗？未必见得，对此还是希望大家能够明辨是非，选择一个正确且合适的方法来解决问题。&lt;/p&gt;&lt;div class=&quot;lazy-img-container img custom-height &quot; data-count=&quot;4&quot; style=&quot;max-width: 640px&quot;&gt;↵                        &lt;div class=&quot;content img-loaded&quot; style=&quot;padding-bottom: 71.5625%&quot;&gt;↵                            &lt;img src=&quot;https://publish-pic-cpu.baidu.com/8261974f-7ec1-490c-917e-4b1870bc196e.jpeg@q_90,w_450&quot; data-src=&quot;https://publish-pic-cpu.baidu.com/8261974f-7ec1-490c-917e-4b1870bc196e.jpeg@q_90,w_450&quot; data-width=&quot;640&quot; data-height=&quot;458&quot;&gt;↵                        &lt;/div&gt;↵                    &lt;/div&gt;&lt;p&gt;希望这件事情的发生能够给屏幕前的各位敲响警钟，希望诸如此类的事情在以后就不要在发生了，希望屏幕前的你们都要好好地爱自己，不要被他人所牵引情绪，万事都以自己优先，凡事多为自己考虑考虑，不要给自己的人生留有遗憾！&lt;/p&gt;&lt;p&gt;对于这件事你们有何看法，下方留言讨论！&lt;/p&gt;↵                &lt;div id=&quot;more-content&quot;&gt;&lt;/div&gt;↵            &lt;/div&gt;↵        ",
    //     created_at: null,
    //     description: null,
    //     id: 1,
    //     keywords: "",
    //     thumb: "https://publish-pic-cpu.baidu.com/064c2176-cbc2-4cfe-9f97-1330407c56d1.jpeg@w_228,h_152@_@https://publish-pic-cpu.baidu.com/aced3fdf-fa31-4ace-bf1c-977091624e65.jpeg@w_228,h_152@_@https://publish-pic-cpu.baidu.com/ab154b04-a8d3-43f3-936c-d536d95dfe8a.jpeg@w_228,h_152",
    //     title: "为情所困？广西一年轻女子赤身跪在马路中间，全程一言不发",
    //     updated_at: null
    // }
    let ext = "v1/news/detail?id=" + idx
    return axios.get(ext).then(res=>res.data)
}
/**24小时热销 */
export const get24HoursNews = ()=>{
    return axios.get("/v1/news/index").then(res=>res.data)
}