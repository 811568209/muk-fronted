<template>
    <div>
        <!--新闻头-->
        <div class="container">
            <div class="row">
                <div class="col-lg-4 my-boxstyle">
                    <div class="my-new-box1">
                        <h3>
                            <span>新闻资讯</span>
                        </h3>
                        <p>打造美丽宣言</p>
                    </div>
                </div>
                <!--新闻轮播-->
                <div class="col-lg-8 my-boxstyle">
                    <div class="margin-0-14">
                        <div style="overflow: hidden">
                             <div :style="carouselStyle"
                                  @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)"
                                  @mousedown="touchstart($event)"  @mousemove.prevent="touchmove($event)" @mouseup="touchend($event)" @dragstart="dragstart()">
                                 <div :style="carouselBox" v-for="(item,index) in carouselData" @dblclick="goTo('/newDetails/',item.nid)" id="newcarouselBox" style="position: relative">
                                     <img :src=item.img1 alt="" class="my-img-response cursor" @load="firstbox()">
                                     <div class="my-text">{{item.title}}</div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--新闻列表-->

        <div class="container" style="margin-top: 50px">
            <div class="row my-new-margin" style="position: relative" v-for="(item,index) in newsList" v-if="newsList[1]">
                <div class="col-lg-6" @click="goTo('/newDetails/',item.nid)">
                    <img :src=item.img1 alt="" class="my-img-response cursor">
                </div>
                <div class="col-lg-6">
                    <h5 class="my-h5">
                        <a class="my-a">{{item.title}}</a>
                    </h5>
                    <p class="my-p-3">{{item.introduce}}</p>
                </div>
                <!--{{item.pubTime | timeFormat}}-->
                <a @click="goTo('/newDetails/',item.nid)" class="border-know-news cursor" >MORE &nbsp;<img src="" alt=""></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                urlAdree:this.carousel.data().address,
                touchdata:{touchstarttime:0,currentXstart:0,originalX:0,timercarousel1:0,canMove:false},
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
                newsList:[{nid:'',img1:'',img2:'',img3:'',img4:'',introduce:'',title:'',pubTime:''},{},{}],
                carouselData:[{nid:'',img1:'',img2:'',img3:'',img4:'',introduce:'',title:'',pubTime:''},{},{},{}],
                EventListener:{addEventresize:'',}
            }
        },
        mounted: function () {
            window.scrollTo(0,0);
            this.bus.$off('useridchang')
            this.carousel1()
            this.bus.$on('useridchang',(mes)=>{
                this.user=mes;
//                console.log(this.user.userid,'rezult');
            });
            this.bus.$emit('getuserid','getuserid')//挂载时请求获取header组件的uid
            this.getDataList()
//            this.firstbox()

            let addEventresize=(e)=>{
                this.firstbox()
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
            firstbox:function () {
                let width=parseInt(getComputedStyle(document.querySelector('#newcarouselBox')).width)
                this.carouselStyle.transform='translateX('+-width+'px)'
            },
            dragstart:function () {
                console.log('dragstart');
            },
            carousel1:function () {
                let timercarousel1=setInterval(()=>{
                    let originalX=parseInt(this.carouselStyle.transform.match(/[-]*\d+/)[0])
                    let width=parseInt(getComputedStyle(document.querySelector('#newcarouselBox')).width)
                    this.carouselStyle.transition='all 0.3s';
                    if (originalX>-3*width){
                        originalX-=width;
                        this.carouselStyle.transform='translateX('+originalX+'px)'
                    }else if (originalX>=-4*width){
                        originalX-=width;
                        this.carouselStyle.transform='translateX('+originalX+'px)'
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
                let imgs=document.querySelectorAll('#newcarouselBox>img')
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
                this.setCapture && this.setCapture();
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
            getDataList:function () {
                this.$http.post(this.urlAdree+'/news/list',{emulateJSON:true}).then((response)=>{
//                    console.log(response.body);
                    this.newsList=response.body
                    this.carouselData=response.body.slice()
                    this.carouselData.push(this.carouselData[0])
                    this.carouselData.unshift(this.carouselData[this.carouselData.length-2])
                    console.log(this.newsList,'newlist');
                    console.log(this.carouselData,'newsCarouData');

                })
            },
            goTo:function (destination,pid) {
                if (pid==undefined){
                    this.$router.push(destination)
                }else {
                    this.$router.push(destination + pid)
                }
            }
        },
        computed: {
            name: function () {
                return
            }
        },
        watch: {//前面属性名称:函数
            dataofname: function () {
            }
        },
        filters: {
            timeFormat:function (myImput) {
                myImput=new Date(myImput)
                let year=myImput.getFullYear()
                let month=myImput.getMonth()+1
                let date=myImput.getDate()
                return year+'.'+month+'.'+date
            }
        }
    }
</script>


<style scoped>
    .my-a{
        text-decoration: none;
        color: black;
    }
    .my-new-margin{
        margin: 30px 0;
    }
    .my-img-response{
        display: block;width: 100%
    }
    .border-know-news{
        /*border:1px solid black;*/
        width: 123px;
        height: 33px;
        text-align: center;
        line-height: 33px;
        display: inline-block;
        color: black;
        text-decoration: none;
        position:absolute;
        bottom:0px;
        right: 12px;
        /*margin-top: 100px;*/
    }
    .my-h5{
        margin-bottom: 30px;font-size: 20px;font-weight: 500;margin-top: 0px;
    }
    .my-p-3{
        margin: 20px auto;color: #999;font-size: 16px;font-weight: 500;
        margin-top: 0;margin-right: 0;
        padding-bottom: 80px;
    }
    .my-text{
        position: absolute;bottom: 0px;font-weight: 500;color: white;
        background:rgba(0,0,0,0.5);width: 100%;height: 35px;text-align: left;line-height: 35px;padding-left: 10px
    }
    .my-boxstyle{
        text-align: center;
        padding: 0;
    }
    .margin-0-14{
        margin: 0px 14px;
    }
    .bb{
        border: 1px solid black;
    }
    .my-new-box1{
        background: black;
        margin: 0 14px;
        padding: 0;
        height: 450px;
        box-sizing: border-box;
        color: white;
        text-align: center;
    }
    .my-new-box1 h3{
        margin: 0px auto;
        padding-top: 150px;
        border-bottom: 1px solid white;
        width: 100px;
        padding-bottom: 10px;
    }
    .my-new-box1 p{
        padding-top: 50px;
    }
</style>


