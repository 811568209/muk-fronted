<template>
    <div>
        <!--图片轮播-->
        <div class="carousel bgw">
            <div :style="carouselStyle" class="clear"
                 @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)"
                 @mousedown="touchstart($event)"  @mousemove.prevent="touchmove($event)" @mouseup="touchend($event)" @dragstart="dragstart()">
                <div :style="carouselBox" v-for="(item,index) in carouselData"  @dblclick="goTo('/productDetails/',item.pid)" class="cursor" id="carouselBox2" >
                    <img :src=item.img alt=""  class="my-img-response" :title=item.title @load="firstboxwidth()">
                    <span style="">{{index+1}}</span>
                    <!--<div :style="{backgroundImage:'url(' + item.img + ')'}" style="width: 100%;height: 300px">-->
                    <!--&lt;!&ndash;<img :src=item.img alt=""  class="my-img-response" :title=item.title>&ndash;&gt;-->
                    <!--</div>-->
                </div>
                <!--<div :style="carouselBox" >-->
                    <!--<img src="../assets/image/index/1603331373.jpg" alt=""  class="my-img-response">-->
                    <!--<span style="">1</span>-->
                <!--</div>-->
                <!--<div :style="carouselBox">-->
                    <!--<img src="../assets/image/index/1603969783.jpg" alt=""  class="my-img-response">-->
                    <!--<span >2</span>-->
                <!--</div>-->
                <!--<div :style="carouselBox">-->
                    <!--<img src="../assets/image/index/1603107080.jpg" alt=""  class="my-img-response">-->
                    <!--<span >3</span>-->
                <!--</div>-->
                <!--<div :style="carouselBox">-->
                    <!--<img src="../assets/image/index/1603331373.jpg" alt="" class="my-img-response">-->
                    <!--<span >4</span>-->
                <!--</div>-->
            </div>
            <!--轮播分页-->
            <ul>
                <li :class="{myActive:active==1}"></li>
                <li :class="{myActive:active==2}"></li>
                <li :class="{myActive:active==3}"></li>
            </ul>
        </div>

        <div class="container">
            <!--产品一-->
            <div class="row my-pc-row">
                <div class="col-sm-7 col-sm-offset-5 my-boxstyle cursor">
                    <img :src=referr[0].img alt="" class="my-img-response" @click="goTo('/productDetails/',referr[0].pid)">
                </div>
                <!--小屏幕下隐藏-->
                <div class=" hidden-xs my-pc-xs-hidd">
                    <h4 class="my-h4-pc">
                        {{referr[0].title1}}
                    </h4>
                    <p class="my-p-pc">
                        {{referr[0].introduce}}
                    </p>
                    <a class="border-know cursor"  @click="goTo('/productDetails/',referr[0].pid)">know more</a>
                </div>
                <!--中屏幕以上隐藏-->
                <div class="col-xs-12 hidden-md hidden-sm hidden-lg">
                    <h4 class="my-h4-pc2">
                        {{referr[0].title1}}
                    </h4>
                    <p class="my-p-pc2">
                        {{referr[0].introduce}}
                    </p>
                    <a class="border-know2 cursor" @click="goTo('/productDetails/',referr[0].pid)">know more</a>
                </div>
            </div>

            <!--产品二-->
            <div class="row my-pc-row">
                <div class="col-sm-7 my-boxstyle cursor">
                    <img :src=referr[1].img alt="" class="my-img-response" @click="goTo('/productDetails/',referr[1].pid)">
                </div>
                <!--小屏幕下隐藏-->
                <div class=" hidden-xs my-pc-xs-hidd" style="right:0px">
                    <h4 class="my-h4-pc">
                        {{referr[1].title1}}
                    </h4>
                    <p class="my-p-pc">
                        {{referr[1].introduce}}
                    </p>
                    <a class="border-know cursor" @click="goTo('/productDetails/',referr[1].pid)">know more</a>
                </div>
                <!--中屏幕以上隐藏-->
                <div class="col-xs-12 hidden-md hidden-sm hidden-lg">
                    <h4 class="my-h4-pc2">
                        {{referr[1].title1}}
                    </h4>
                    <p class="my-p-pc2">
                        {{referr[1].introduce}}
                    </p>
                    <a class="border-know2 cursor" @click="goTo('/productDetails/',referr[1].pid)">know more</a>
                </div>
            </div>

            <!--产品三-->
            <div class="row my-pc-row">
                <div class="col-sm-7 col-sm-offset-5 my-boxstyle cursor">
                    <img :src=referr[2].img alt="" class="my-img-response" @click="goTo('/productDetails/',referr[2].pid)">
                </div>
                <!--小屏幕下隐藏-->
                <div class=" hidden-xs my-pc-xs-hidd">
                    <h4 class="my-h4-pc">
                        {{referr[2].title1}}
                    </h4>
                    <p class="my-p-pc">
                        {{referr[2].introduce}}
                    </p>
                    <a class="border-know cursor" @click="goTo('/productDetails/',referr[2].pid)">know more</a>
                </div>
                <!--中屏幕以上隐藏-->
                <div class="col-xs-12 hidden-md hidden-sm hidden-lg">
                    <h4 class="my-h4-pc2">
                        {{referr[2].title}}
                    </h4>
                    <p class="my-p-pc2">
                        {{referr[2].introduce}}
                    </p>
                    <a class="border-know2 cursor" @click="goTo('/productDetails/',referr[2].pid)">know more</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                urlAdree:this.carousel.data().address,
                touchdata:{touchstarttime:0,currentXstart:0,originalX:0,timercarousel1:0,canMove:false,transitionclass:false},
                carouselStyle:{
                    width: 500+'%',
                    transition:'',
                    transform: 'translateX(0px)'
                },
                carouselBox:{
                    display: 'block',
                    width:20+'%',
                    float: 'left'
                },
                active:1,
                user:{username:'nobabdy',userid:'0',phone:'123'},
                carouselData:[{id:'',img:'',title:'',pid:''},{},{}],
                referr:[{id:'',img:'',introduce:'',title1:'',title2:'',pid:''}, {},{}],
                search:'',
                EventListener:{addEventresize:'',}
            }
        },
        mounted: function () {
            window.scrollTo(0,0);
            this.bus.$off('useridchang')
            this.bus.$on('useridchang',(mes)=>{
                this.user=mes;
            })
            this.bus.$emit('getuserid','getuserid')//挂载时请求获取header组件的uid
            this.getCarouData()
            this.getReferrData()
            this.carousel1()



//            window.onresize=()=>{
//                let width=parseInt(getComputedStyle(document.querySelector('#carouselBox2')).width)
//                this.carouselStyle.transform='translateX('+-width+'px)'
//            }
            let addEventresize=(e)=>{
                this.firstboxwidth()
            }
            this.EventListener.addEventresize=addEventresize
            window.addEventListener('resize',addEventresize)

        },
        beforeDestroy:function () {
            clearInterval(this.touchdata.timercarousel1)
            window.removeEventListener("resize",this.EventListener.addEventresize);
            console.log('beforeDestroy');
        },
        methods: {
            firstboxwidth:function () {
                let width=parseInt(getComputedStyle(document.querySelector('#carouselBox2')).width)
                this.carouselStyle.transform='translateX('+-width+'px)'
            },
            getCarouData:function () {
                this.$http.post(this.urlAdree+'/product/carousel',{emulateJSON:true}).then((response)=>{
                    this.carouselData=response.body
                    this.carouselData.push(this.carouselData[0])
                    this.carouselData.unshift(this.carouselData[this.carouselData.length-2])
//                    console.log(this.carouselData);
                })
            },
            getReferrData:function () {
                this.$http.post(this.urlAdree+'/product/referr',{emulateJSON:true}).then((response)=>{
                    this.referr=response.body
                    console.log(this.referr);
                })
            },
            carousel1:function () {
                let timercarousel1=setInterval(()=>{
                    let originalX=parseInt(this.carouselStyle.transform.match(/[-]*\d+/)[0])
                    let width=parseInt(getComputedStyle(document.querySelector('#carouselBox2')).width)
                    this.carouselStyle.transition='all 0.3s';

                    if (originalX>-3*width){
                        originalX-=width;
                        this.carouselStyle.transform='translateX('+originalX+'px)'
                    }else if (originalX>=-4*width){
                        originalX-=width;
                        this.carouselStyle.transform='translateX('+originalX+'px)'
                        console.log(originalX);
                        setTimeout(()=>{
                            this.carouselStyle.transition='all 0s linear';
                            this.carouselStyle.left=0+'%';
                            this.carouselStyle.transform='translateX('+-width+'px)'
                        },300)
                    }
                },3000)
                this.touchdata.timercarousel1=timercarousel1;
            },
            touchstart:function (e) {
                console.log('---------------touchstart--------------------');
                if (e.target.nodeName!=='IMG'){
                    return
                }
                let imgs=document.querySelectorAll('#carouselBox2>img')
                for (let elem of imgs){
                    elem.ondragstart=function (){return false;};
                }
                console.log(e.trage);

                this.setCapture && this.setCapture();
                clearInterval(this.touchdata.timercarousel1)
                this.carouselStyle.transition='all 0s linear'
                console.log(e);
                console.log('touchstart');
                console.log(e.target);
//                this.clientX=e.touches[0].clientX
//                  记录初始的触摸点x坐标
                let currentXstart=0
                if (e.type.indexOf('mouse')!=-1){
                    currentXstart=e.clientX
                    this.touchdata.canMove=true
                }else {
                    currentXstart=e.changedTouches[0].clientX
                }

//                console.log(this.clientX);

//                记录初始的transformX值
                let originalX=parseInt(this.carouselStyle.transform.match(/[-]*\d+/)[0])

                this.touchdata.currentXstart=currentXstart
//                纪录初始的点击时间
                this.touchdata.touchstarttime=new Date()
                let parentwidth=parseInt(getComputedStyle(e.target.parentNode.parentNode).width)
                let boxwidth=parseInt(getComputedStyle(e.target.parentNode).width)
//                头尾异常处理，如果是第一张图片就切换到倒数第二张，并且把transformx记录原点也切换
                if(Math.abs(parseInt(originalX/boxwidth))==0){
                    this.carouselStyle.transition='all 0s linear'
                    originalX=-(this.carouselData.length-2)*boxwidth
                    this.carouselStyle.transform='translateX('+(-(this.carouselData.length-2)*boxwidth)+'px)'
                    console.log('15执行');

                }
//                头尾异常处理，如果是最后一张图片就切换到第二张，并且把transformx记录原点也切换
                if(Math.abs(parseInt(originalX/boxwidth))>=Math.round(parentwidth/boxwidth)-1){
                    this.carouselStyle.transition='all 0s linear'
                    originalX=-1*boxwidth
                    this.carouselStyle.transform='translateX('+(-1*boxwidth)+'px)'
                    console.log('16执行');
                }
                this.touchdata.originalX=originalX
            },
            touchmove:function (e) {
//                console.log('---------------------touchmove--------------------------');
                if (e.target.nodeName!=='IMG'){
                    return
                }
                e.preventDefault()
                this.carouselStyle.transition='all 0s linear'
                //                    每次移动的x坐标
                let currentXmove=0
//                console.log('touchmove');
                if (e.type.indexOf('mouse')!=-1){
                    currentXmove=e.clientX
                    if (!this.touchdata.canMove){
                        return
                    }
                }else {
                    currentXmove=e.changedTouches[0].clientX
                }
                if (e.target.nodeName!=='IMG'){
                    return
                }
                let translateX=parseInt(this.carouselStyle.transform.match(/[-]*\d+/)[0])
                let originalX=this.touchdata.originalX
//                console.log(e.touches,'touches');
//                console.log(e.targetTouches,'targetTouches');
//                console.log(e.changedTouches,'changedTouches');

//                transition改变值=初始transition值+（每次移动的x坐标-初始x坐标）
                let changX=originalX+(currentXmove-this.touchdata.currentXstart)

//               console.log(changX);


//                  可滑动距离
                let parentwidth=parseInt(getComputedStyle(e.target.parentNode.parentNode).width)
//                单个box距离
                let boxwidth=parseInt(getComputedStyle(e.target.parentNode).width)
//                    超出可滑动距离时的处理，这里没有这种情况
                if (translateX>=0 || translateX<=-(parentwidth-boxwidth)){
                    console.log('out');
                    let outX=translateX
                    if (translateX>=0){
                        changX=5 * changX / (50 + outX)
                    }
                    console.log(translateX,'translateX');
                    if (translateX<-(parentwidth-parseInt(getComputedStyle(e.target).width))){
                        let outX=translateX-(parentwidth-parseInt(getComputedStyle(e.target).width))
                        changX=-10 * (changX-(parentwidth-parseInt(getComputedStyle(e.target.parentNode.parentNode).width))) / (outX*5)
                        changX=translateX+changX
                        console.log(changX,'<');
                    }
                }else{
//                    console.log('notout',translateX);
                }
                this.carouselStyle.transform='translateX('+changX+'px)'

            },
            touchend:function (e) {
                console.log('------------------------touchend----------------------------');
                if (e.target.nodeName!=='IMG'){
                    return
                }
                this.setCapture && this.setCapture();
                this.carouselStyle.transition='all 0.3s linear'
                if (e.type.indexOf('mouse')!=-1){
                    this.touchdata.canMove=false
                }else {

                }

                console.log(e);
                console.log('touchend');
//                console.log(e.touches[0]);
//                console.log(e.targetTouches[0]);
//                console.log(e.changedTouches[0]);
                let translateX=parseInt(this.carouselStyle.transform.match(/[-]*\d+/)[0])
                console.log(translateX);
//                可移动宽度
                let parentwidth=parseInt(getComputedStyle(e.target.parentNode.parentNode).width)
//                单个盒子宽度
                let boxwidth=parseInt(getComputedStyle(e.target.parentNode).width)
//                始末滑动过的距离，大于0向右，小于0向左
                let distancentooriginalX=this.touchdata.originalX-translateX


//             左边和右边都没溢出时，的滑动
                if (translateX<=0 && translateX>-(parentwidth-boxwidth)){
                    let timehold=new Date()-this.touchdata.touchstarttime
//                    始末滑动过的距离，大于0向右，小于0向左
                    console.log(distancentooriginalX);
                    console.log(timehold);
//                    快速滑动在250ms内
                    if (timehold<250){
//                        向右快速滑动
                        if (distancentooriginalX>0){
                            let x=(parseInt(translateX/boxwidth)-1)*boxwidth
                            console.log(x,'>0');
                            this.carouselStyle.transition='all 0.3s linear'
                            setTimeout(()=>{
//                                疑是bug
                                this.carouselStyle.transition='all 0.3s linear'
                                this.carouselStyle.transform='translateX('+x+'px)'
                            },0)
                            console.log('5执行');
//                            向右块速滑动从倒数第二张切换到最后一张时，显示完最后一张就切换到第二张
                            if(Math.abs(parseInt(translateX/boxwidth))>=Math.round(parentwidth/boxwidth)-2){
                                setTimeout(()=>{
                                    this.carouselStyle.transition='all 0s linear'
                                    this.carouselStyle.transform='translateX('+(-1*boxwidth)+'px)'
                                },300)
                                console.log('14执行');
                            }
                        }else   if (distancentooriginalX<0)
                        {
                            //向左快速滑动
                            let x=(parseInt(translateX/boxwidth))*boxwidth
                            console.log(x,'<0');

                            setTimeout(() => {
//                                疑是bug
                                this.carouselStyle.transition = 'all 0.3s linear'
                                this.carouselStyle.transform = 'translateX(' +x+ 'px)'
                            },0)
                            console.log('6执行');
                            //向左快速滑动到第一个box后切换到倒数第二个box
                            if(Math.abs(parseInt(translateX/boxwidth))==0){
                                setTimeout(()=>{
                                    this.carouselStyle.transition='all 0s linear'
                                    this.carouselStyle.transform='translateX('+(-(this.carouselData.length-2)*boxwidth)+'px)'
                                },300)
                                console.log('11执行');
                            }
                        }
                    }else if(timehold>=250){
//                        滑动在超出250ms为慢速滑动
                        console.log('timehod>250');
//                    向右慢速滑动
                        if (distancentooriginalX>0){
//                    滑动距离过半
                            if(Math.abs(distancentooriginalX)>=boxwidth/2){
                                let x=(parseInt(translateX/boxwidth)-1)*boxwidth
                                this.carouselStyle.transition='all 0.3s linear';
                                this.touchdata.transitionclass=true
                                console.log(this.carouselStyle.transition);
                                setTimeout(()=>{
                                    this.carouselStyle.transform='translateX('+x+'px)'
                                },0)
                                console.log('7执行',translateX/boxwidth);
//                        向右慢速滑动距离过半,从倒数第二张切换到最后一张时，显示完最后一张就切换到第二张
                                if(Math.abs(parseInt(translateX/boxwidth))>=Math.round(parentwidth/boxwidth)-2){
                                    setTimeout(()=>{
                                        this.carouselStyle.transition='all 0s linear'
                                        this.carouselStyle.transform='translateX('+(-1*boxwidth)+'px)'
                                    },300)
                                    console.log('13执行');
                                }

                            }else if(Math.abs(distancentooriginalX)<boxwidth/2)
                            {
//                        滑动距离未过半
                                let x=(parseInt(translateX/boxwidth))*boxwidth
                                this.carouselStyle.transition='all 0.3s linear'
                                setTimeout(()=>{
                                    this.carouselStyle.transform='translateX('+x+'px)'
                                },0)
                                console.log('8执行');
                            }
                        }else if (distancentooriginalX<0)   //向左慢速滑动
                        {
//                    滑动距离过半
                            if(Math.abs(distancentooriginalX)>=boxwidth/2){
                                let x=(parseInt(translateX/boxwidth))*boxwidth
                                this.carouselStyle.transition='all 0.3s linear'
                                setTimeout(()=>{
                                    this.carouselStyle.transform='translateX('+x+'px)'
                                },0)
                                console.log('9执行');
//                        向左慢速滑动距离过半到最后的box切换到倒数第二个box
                                if(Math.abs(parseInt(translateX/boxwidth))==0){
                                    setTimeout(()=>{
                                        this.carouselStyle.transition='all 0s linear'
                                        this.carouselStyle.transform='translateX('+(-(this.carouselData.length-2)*boxwidth)+'px)'
                                    },300)
                                    console.log('12执行');
                                }

                            }else if(Math.abs(distancentooriginalX)<boxwidth/2)
                            {
//                        滑动距离未过半
                                let x=(parseInt(translateX/boxwidth)-1)*boxwidth
                                this.carouselStyle.transition='all 0.3s linear'
                                setTimeout(()=>{
                                    this.carouselStyle.transform='translateX('+x+'px)'
                                },0)
                                console.log('13执行');
                            }
                        }
                    }
                }else {



                    //   左边或右边溢出时，此处无需处理
                    console.log(translateX,'out');
                    if (translateX>=0){
                        console.log('out>0');
                        this.carouselStyle.transition='all 0.3s linear'
                        setTimeout(()=>{
                            this.carouselStyle.transform='translateX('+0+'px)'
                        },0)
                        console.log('3执行');
                    }
                    if (translateX<-(parentwidth-boxwidth)){
                        console.log('out<00000');
                        this.carouselStyle.transition='all 0.3s linear'
                        setTimeout(()=>{
                            this.carouselStyle.transform='translateX('+-(parentwidth-boxwidth)+'px)'
                        },0)
                        console.log('4执行');
                    }
                }


                console.log(translateX);
                this.carousel1()
//                this.carouselStyle.transition='all 0.3s linear'
//                setTimeout(()=>{
//                    this.carouselStyle.transform='translateX('+(-1*boxwidth)+'px)'
//                },500)
            },
            goTo:function (destination,pid) {
                if (pid==undefined){
                    this.$router.push(destination)
                }else {
                    this.$router.push(destination + pid)
                }
            },

        },
        computed: {
            name: function () {
                return
            }
        },
        watch: {//前面属性名称:函数
            'carouselStyle':{
                handler(){
                    let transform=parseInt(this.carouselStyle.transform.match(/[-]*\d+/)[0])
                    let width=parseInt(getComputedStyle(document.querySelector('#carouselBox2')).width)
//                    console.log(transform,'deep');
                    this.active=-transform/width
//                    console.log(this.active);
                },
                deep:true
            }
        },
        filters: {
            filter1(){

            }
        }
    }
</script>


<style scoped>
    .my-pc-row{
        position: relative;overflow-y: auto;
        margin-bottom: 20px;
    }
    .my-pc-xs-hidd{
        position: absolute;width:40%
    }
    .border-know{
        border:1px solid black;
        width: 123px;
        height: 33px;
        text-align: center;
        line-height: 33px;
        display: inline-block;
        color: black;
        text-decoration: none;
        margin: 20px 15%;
        margin-top: 10%;
    }
    .border-know2{
        border:1px solid black;
        width: 123px;
        height: 33px;
        text-align: center;
        line-height: 33px;
        display: inline-block;
        color: black;
        text-decoration: none;
        margin: 20px 0
    }
    .my-h4-pc{
        font-size: 26px;font-weight: 500;margin: 20px 15%;margin-top: 20%
    }
    .my-h4-pc2{
        font-size: 26px;font-weight: 500
    }
    .my-p-pc{
        width: 70%;
        margin: 20px auto;color: #999;font-size: 16px;font-weight: 500;margin-top: 10%;
    }
    .my-p-pc2{
        margin: 20px auto;color: #999;font-size: 16px;font-weight: 500;
    }
    .my-boxstyle{
        text-align: center;
        padding: 0;
    }
    .container{
        width: 100%;
    }
    .carousel{
        width: 100%;overflow: hidden;
    }
    .carousel>div div>span{
        position: relative;top:-40px;left: 50px;font-size: 20px;border: 1px solid black
    }
    .carousel ul{
        list-style: none;width: 60px;display: flex;justify-content: space-around;padding: 0;position: relative;top: -50px;margin: auto
    }
    .carousel li{
        border: 1px solid silver;float: left;width: 10px;height: 10px;border-radius: 50%;background-color: #e8e8e8;
        cursor: pointer;
    }
    .carousel .myActive{
        background-color: white
    }
    .pbb{
        border: 1px solid black;
    }
</style>




