<template>
    <div id="slider">
        <div class="cls_panel" @mouseover="stop" @mouseleave="play">
            <ul class="cls_container" :style="containerStyle">
                <li>
                    <img :src="sliders[sliders.length - 1].img" alt="">
                </li>
                <li v-for="(item, index) in sliders" :key="index">
                    <img :src="item.img" @click="gotoIndex(index)" alt="">
                </li>
                <li>
                    <img :src="sliders[0].img" alt="">
                </li>
            </ul>
            <ul class="cls_direction">
                <li class="left" @click="move(360, 1, speed)">
                    <svg class="icon" width="35px" height="35.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"/></svg>
                </li>
                <li class="right" @click="move(360, -1, speed)">
                    <svg class="icon" width="35px" height="35.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"/></svg>
                </li>
            </ul>
            <ul class="dots">
                <li v-for="(dot, i) in sliders" :key="i" :class="{dotted: i === (currentIndex-1)}" @click = jump(i+1)></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'slider',
    props: {
        initialSpeed: {
            type: Number,
            default: 30
        },
        initialInterval: {
            type: Number,
            default: 3
        }
    },
    data () {
        return {
            sliders:[
                {img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1491929574,2607686081&fm=26&gp=0.jpg'},
                {img:'https://f10.baidu.com/it/u1=83108544&u2=2023014971&fm=76'},
                {img:'https://t10.baidu.com/it/u1=43899183&u2=1560074593&fm=76'},
                {img:'https://f10.baidu.com/it/u1=83108544&u2=2023014971&fm=76'}
            ],
            imgWidth:360,
            currentIndex:1,
            distance:-360,
            maxCount:4,
            transitionEnd: true,
            speed: this.initialSpeed
        }
    },
    computed:{
        containerStyle() {
            return {
                transform:`translate3d(${this.distance}px, 0, 0)`
            }
        },
        interval() {
            return this.initialInterval * 1000
        }
    },
    mounted() {
        this.init()
    },
    methods:{
        init() {
            this.play()
            window.onblur = function() { this.stop() }.bind(this)
            window.onfocus = function() { this.play() }.bind(this)
        },
        move(offset, direction, speed) {
            if (!this.transitionEnd) return
            this.transitionEnd = false
            direction === -1 ? this.currentIndex += offset/360 : this.currentIndex -= offset/360
            if (this.currentIndex > this.maxCount) this.currentIndex = 1
            if (this.currentIndex < 1) this.currentIndex = this.maxCount
            const destination = this.distance + offset * direction
            this.animate(destination, direction, speed)
        },
        animate(des, direc, speed) {
            if (this.temp) {
                window.clearInterval(this.temp);
                this.temp = null ;
            }
            this.temp = window.setInterval(() => {
                if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
                    this.distance += speed * direc
                } else {
                    this.transitionEnd = true
                    window.clearInterval(this.temp)
                    this.distance = des
                    if (des < -1440) this.distance = -360
                    if (des > -360) this.distance = -1440
                }
            }, 20)
        },
        jump(index) {
            const direction = index - this.currentIndex >= 0 ? -1 : 1;
            const offset = Math.abs(index - this.currentIndex) * 360;
            const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed ;
            this.move(offset, direction, jumpSpeed)
        },
        play() {
            if (this.timer) {
                window.clearInterval(this.timer)
                this.timer = null
            }
            this.timer = window.setInterval(() => {
                this.move(360, -1, this.speed)
            }, this.interval)
        },
        stop() {
            window.clearInterval(this.timer)
            this.timer = null
        },
        gotoIndex(index){
            console.log(index);
        }
    }
}
</script>
<style>
    ol,ul{
        list-style: none;
    }
    #slider{
        text-align: center;
    }
    .cls_panel{
        position:relative;
        width:360px;
        height:360px;
        margin:0 auto;
        overflow:hidden;
    }
    .cls_container{
        left:-40px;
        display:flex;
        position:absolute;
    }
    .left, .right{
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        width:50px;
        height:50px;
        background-color:rgba(0,0,0,.3);
        border-radius:50%;
        cursor:pointer;
    }
    .left{
        left:3%;
        padding-left:12px;
        padding-top:10px;
    }
    .right{
        right:3%;
        padding-right:12px;
        padding-top:10px;
    }
    .cls_container li img{
        user-select: none;
        width: 360px;
        height: 320px;
        cursor: pointer;
    }
    .cls_container li{
        width: 360px;
        height: 320px;
    }
    .dots{
        position:absolute;
        bottom:10px;
        left:50%;
        transform:translateX(-50%);
    }
    .dots li{
        display:inline-block;
        width:15px;
        height:15px;
        margin:0 3px;
        border:1px solid white;
        border-radius:50%;
        background-color:#333;
        cursor:pointer;
    }
    .dots .dotted{
        background-color:orange;
    }
</style>