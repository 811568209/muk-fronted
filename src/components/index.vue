<template>
    <div id="myIndex">
        <!--手机端的大背景图-->
        <div class="myBody"></div>
         <!--图片轮播-->
        <!--<div style="width: 100px;height: 100px;background: black;" ></div>-->
        <div class="carousel bgw">
            <div :style="carouselStyle" class="clear"
                 @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)"
                 @mousedown="touchstart($event)"  @mousemove.prevent="touchmove($event)" @mouseup="touchend($event)" @dragstart="dragstart()">
                <div :style="carouselBox" v-for="(item,index) in carouselData"  @dblclick="goTo('/productDetails/',item.pid)" class="cursor" id="carouselBox" >
                    <img :src=item.img alt=""  class="my-img-response" :title=item.title @load="firstbox()">
                    <span style="width: 20px;height: 20px;padding: 0">{{index+1}}</span>
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

        <!--最新商品推荐-->
        <div class="container hot bgw">
            <div class="row">
                <div class="col-sm-6 my-boxstyle">
                    <div>
                        <h4 style="" class="my-h4">最新商品推荐</h4>
                    </div>
                    <!--盒子1-->
                    <div class="hidden-xs">
                        <h5 class="my-h5">{{referr[0].title1}}
                            <br>
                            {{referr[0].title2}}
                        </h5>
                        <p class="my-p">{{referr[0].introduce}}</p>
                        <a class="border-know cursor" style="" @click="goTo('/productDetails/',referr[0].pid)">know more</a>
                    </div>
                    <div style="width: 100%">
                        <img :src=referr[0].img alt="" class="my-img-response">
                    </div>
                    <div class="hidden-sm hidden-md hidden-lg">
                        <h5 class="my-h5">{{referr[0].title1}}
                            <br>
                            {{referr[0].title2}}
                        </h5>
                        <p class="my-p">{{referr[0].introduce}}</p>
                        <a class="border-know cursor" style="" @click="goTo('/productDetails/',referr[0].pid)">know more</a>
                    </div>
                </div>
                <!--盒子二-->
                <div class="col-sm-6 my-boxstyle">
                    <div>
                        <img :src=referr[1].img alt="" class="my-img-response">
                    </div>
                    <div>
                        <h5 class="my-h5">{{referr[1].title1}}
                            <br>{{referr[1].title2}}
                        </h5>
                        <p class="my-p">{{referr[1].introduce}}</p>
                        <a class="border-know cursor" style="" @click="goTo('/productDetails/',referr[1].pid)">know more</a>
                    </div>
                </div>
            </div>
        </div>

        <!--经典热卖-->
        <div >
            <div class="container bgw">
                <div class="row">
                    <div class="col-xs-12 my-boxstyle">
                        <h4 class="my-h4-2" >经典热卖</h4>
                        <p class=" my-p-2" >CLASSIC HOT</p>
                    </div>
                </div>
                <div class="row my-magrgin">
                    <div class="col-sm-5 my-boxstyle">
                        <div >
                            <img :src=hot[0].img1 alt="" class="my-img-response cursor" @click="goTo('/productDetails/',hot[0].pid)">
                        </div>
                        <div class="hidden-xs">
                            <a class="border-know-2 cursor" @click="goTo('/productDetails/',hot[0].pid)">MORE &nbsp;<img src="" alt=""></a>
                        </div>
                    </div>
                    <div class="col-sm-7 my-boxstyle">
                        <img :src=hot[0].img2 alt="" class="my-img-response cursor" @click="goTo('/productDetails/',hot[0].pid)">
                        <!--<img src="./static/image/index/0933733026.jpg" alt="" class="my-img-response  ">-->
                        <div style="text-align: right">
                            <h5 class="my-h5">{{hot[0].title1}} </h5>
                            <h5 class="my-h5">{{hot[0].title2}}</h5>
                            <p class="my-p-3">
                                {{hot[0].introduce}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!--蓝色背景-->
            <div class="bg bg-xs">
            </div>
        </div>

        <!--新闻-->
        <div>
            <div class="container bgw" >
                <div class="row">
                    <div class="col-xs-12 my-boxstyle">
                        <h4 class="my-h4-2" >新闻资讯</h4>
                        <p class=" my-p-2" >NEWS</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4 my-boxstyle shadow cursor" v-for="(item,index) in newsList" @click="goTo('/newDetails/',item.nid)">
                        <a >
                            <img :src=item.img1 alt="" class="my-img-response">
                        </a>
                        <div>
                            <h5 class="my-h5">{{item.title}}</h5>
                            <p class="my-p">{{item.introduce | string_length(100)}}</p>
                            <span class="my-span-2">
                                <span class="my-news-span">NEWS</span>
                                <time class="my-time">{{item.pubTime | timeFormat}}</time>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 my-boxstyle" @click="goTo('/news')">
                        <a class="border-know cursor" style="" >MORE &nbsp;<img src="" alt=""></a>
                    </div>
                </div>
            </div>
        </div>

        <!--WeChat-->
        <div>
            <div class="container bgw">
                <div class="row">
                    <div class="col-xs-12 my-boxstyle">
                        <div class="my-h4-2 my-h4-3" ><img src="" alt="" style="width: 100%;"></div>
                    </div>
                </div>

                <div class="row bgw">
                    <!--box1-->
                    <div class="my-col-sm-1 padding-right-4 padding-top-4 padding-bottom-4 padding-left-4-xs">
                        <a ><img src="" alt="" class="my-img-response"></a>
                    </div>
                    <!--box2-->
                    <div class="my-col-sm-2 padding-right-4 padding-left-4 padding-top-4 padding-bottom-4">
                        <div class="my-row">
                            <div class="my-col-xs-4 padding-right-4 padding-bottom-4">
                                <img src="" alt="" class="my-img-response">
                            </div>
                            <div class="my-col-xs-8 padding-left-4 padding-bottom-4 ">
                                <img src="" alt="" class="my-img-response">
                            </div>
                        </div>
                        <div class="my-row">
                            <div class="my-col-xs-8 padding-top-4 padding-right-4 ">
                                <img src="" alt="" class="my-img-response">
                            </div>
                            <div class="my-col-xs-4 padding-top-4 padding-left-4 ">
                                <img src="" alt="" class="my-img-response">
                            </div>
                        </div>
                    </div>
                    <!--box3-->
                    <div class="my-col-sm-1 padding-right-4 padding-left-4 padding-top-4 padding-bottom-4">
                        <img src="" alt="" class="my-img-response">
                    </div>
                    <!--box4-->
                    <div class="my-col-sm-1 padding-left-4 padding-top-4 padding-bottom-4 padding-right-4-xs">
                        <div class="my-row">
                            <div class="my-col-xs-12 padding-bottom-4">
                                <img src="" alt="" class="my-img-response">
                            </div>
                            <div class="my-col-xs-12 padding-top-4">
                                <img src="" alt="" class="my-img-response">
                            </div>
                        </div>
                    </div>
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
                carouselData:[{id:'',img:'',title:'',pid:''},{},{}],
                referr:[{id:'',img:'',introduce:'',title1:'',title2:'',pid:''},
                    {id:'',img:'',introduce:'',title1:'',title2:'',pid:''}],
                hot:[{id:'',img1:'',img2:'',introduce:'',title1:'',title2:'',pid:''}],
                newsList:[{nid:'',img1:'',img2:'',img3:'',img4:'',introduce:'',title:'',pubTime:''},{},{}],
                EventListener:{addEventresize:'',}
            }
        },
        mounted: function () {
            window.scrollTo(0,0);
            this.bus.$off('useridchang')
            this.carousel1()
            window.onload=function () {
            }
            this.bus.$on('useridchang',(mes)=>{
                this.user=mes;
//                console.log(this.user.userid,'rezult');
            })
            this.bus.$emit('getuserid','getuserid')//挂载时请求获取header组件的uid
            this.getdatacarousel()
            this.getdatareferr()
            this.getdatahot()
            this.getdatanew()
//            console.log(this.urlAdree);
//            console.log(this.carousel.data().address);


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
                let width=parseInt(getComputedStyle(document.querySelector('#carouselBox')).width)
                this.carouselStyle.transform='translateX('+-width+'px)'
            },
            dragstart:function () {
                console.log('dragstart');
            },
            carousel1:function () {
                let timercarousel1=setInterval(()=>{
                    let originalX=parseInt(this.carouselStyle.transform.match(/[-]*\d+/)[0])
                    let width=parseInt(getComputedStyle(document.querySelector('#carouselBox')).width)
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
                if (e.target.nodeName!=='IMG'){
                    return
                }
                let imgs=document.querySelectorAll('#carouselBox>img')
                for (let elem of imgs){
                    elem.ondragstart=function (){return false;};
                }
                this.setCapture && this.setCapture();

                clearInterval(this.touchdata.timercarousel1)
                this.carouselStyle.transition='all 0s linear'
                console.log(e);
                console.log('touchstart');

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
                if (e.target.nodeName!=='IMG'){
                    return
                }
                this.setCapture && this.setCapture();
                e.preventDefault()
                this.carouselStyle.transition='all 0s linear'
                //                    每次移动的x坐标
                let currentXmove=0

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
//                console.log(translateX);
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
//                    console.log(distancentooriginalX);
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
//                        console.log('timehod>250');
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
//                        console.log(translateX,'out');
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


//                console.log(translateX);
                this.carousel1()
//                this.carouselStyle.transition='all 0.3s linear'
//                setTimeout(()=>{
//                    this.carouselStyle.transform='translateX('+(-1*boxwidth)+'px)'
//                },500)
            },
            getdatacarousel:function () {
                this.$http.post(this.urlAdree+'/indexx/carousel',{emulateJSON:true}).then((response)=>{
//                    console.log(response.body);
                    this.carouselData=response.body
                    this.carouselData.push(this.carouselData[0])
                    this.carouselData.unshift(this.carouselData[this.carouselData.length-2])
//                    console.log(this.carouselData);
                })
            },
            getdatareferr:function () {
                this.$http.post(this.urlAdree+'/indexx/referr',{emulateJSON:true}).then((response)=>{
//                    console.log(response.body,);
                    this.referr=response.body
                    console.log(this.referr);
                })
            },
            getdatahot:function () {
                this.$http.post(this.urlAdree+'/indexx/hot',{emulateJSON:true}).then((response)=>{
//                    console.log(response.body);
                    this.hot=response.body
                })
            },
            goTo:function (destination,pid) {
                this.$router.push('/')
                if (pid==undefined){
                    this.$router.push(destination)
                }else {
                    this.$router.push(destination + pid)
                }
            },
            getdatanew:function () {
                this.$http.post(this.urlAdree+'/news/list',{emulateJSON:true}).then((response)=>{
                    this.newsList=response.body
                })
            }
        },
        computed: {
            name: function () {
                return
            }
        },
        watch: {//前面属性名称:函数
            dataofname: function () {
            },
            'carouselStyle':{
                handler(){
                    let transform=parseInt(this.carouselStyle.transform.match(/[-]*\d+/)[0])
                    let width=parseInt(getComputedStyle(document.querySelector('#carouselBox')).width)
//                    console.log(transform,'deep');
                    this.active=-transform/width
                },
                deep:true
            }
        },
        filters: {
            timeFormat:function (myImput) {
                myImput=new Date(myImput)
                let year=myImput.getFullYear()
                let month=myImput.getMonth()+1
                let date=myImput.getDate()
                return year+'.'+month+'.'+date
            },
            string_length:function (myInput,ars) {
                if (myInput!=undefined){
                    if(myInput.length>ars){
                        return myInput.slice(0,ars)+"..."
                    }else {
                        return myInput
                    }
                }
            },
        }
    }
</script>


<style scoped>
    @media screen and (max-width: 361px){
        /*#myIndex{*/
            /*position: relative;*/
            /*top:106px*/
        /*}*/
    }
    @media screen and (min-width:361px) and (max-width: 768px){
        /*#myIndex{*/
            /*position: relative;*/
            /*top:56px*/
        /*}*/
    }
    @media (max-width: 768px){
        .myBody{
            /*background-image: url("../assets/image/index/index_bg1.jpg");*/
            background-repeat: no-repeat;
            background-size: 100% 100vh;
            position: fixed;
            z-index: -1;
            top: 0px;
            width: 100%;
            height: 100vh;
        }
        .bgw{
            background: white;
        }
        .bg-xs{
            /*background: url('../assets/image/index/index_bg1.jpg') no-repeat center bottom/100% auto;*/
            /*background-image: url("../assets/image/index/index_bg1.jpg");*/
            /*background-repeat: no-repeat;*/
            /*background-size: 100% 800px;*/
            /*background-position: bottom;*/
            /*background-origin: content-box;;*/
            /*background-attachment: fixed;*/
            /*width: 100%;*/
            /*margin: 0;*/
            /*padding: 0;*/
            height: 200px;
        }

        .shadow{
            transition: all 0.2s;
            padding: 0;
            margin: 0 15px;
        }
        .my-row{
            width: 100%;

        }
        .my-row:after{
            content:"";
            display:block;
            clear:both;
        }
        .my-row:before{
            display: table;
            content: "";
        }
        .my-col-sm-1{
            width: 100%;
            float: left;
            /*padding: 0px 15px;*/
        }
        .my-col-sm-2{
            width: 100%;
            float: left;
            /*padding: 0px 15px;*/
        }
        .my-col-xs-4{
            width: 33.33%;
            float: left;
        }
        .my-col-xs-8{
            width: 66.66%;
            float: left;
        }
        .my-col-xs-12{
            width: 100%;
            float: left;
        }
        .padding-left-4-xs{
            padding-left: 4px;
        }
        .padding-right-4-xs{
            padding-right: 4px;
        }
    }
    @media (min-width: 768px){
        .my-row{
            width: 100%;
            content:"";
            display:block;
            clear:both;
        }
        .my-col-xs-4{
            width: 33.33%;
            float: left;
        }
        .my-col-xs-8{
            width: 66.66%;
            float: left;
        }
        .my-col-sm-1{
            width: 20%;
            float: left;
        }
        .my-col-sm-2{
            width: 40%;
            float: left;
        }
        .my-col-xs-12{
            width: 100%;
            float: left;
        }
        .my-magrgin{
            margin: 0px 13%
        }
        .my-boxstyle{
            text-align: center;
            padding: 0;
        }
        .my-h4-2:before{
            display: block;
            position: absolute;
            content: '';
            top: 54%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            width: 42%;
            left: 3%;
            border-bottom: 1px dashed #c6c6c6;
        }
        .my-h4-3:before{
            top: 60%;
        }
        .my-h4-2:after{
            display: block;
            position: absolute;
            content: '';
            top: 54%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            width: 42%;
            right: 3%;
            border-bottom: 1px dashed #c6c6c6;
        }
        .my-h4-3:after{
            top: 60%;
        }
        .bg{
            /*background: url('../assets/image/index/index_bg1.jpg') no-repeat center bottom/100% auto;*/
            /*background-image: url("../assets/image/index/index_bg1.jpg");*/
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: bottom;
            background-origin: content-box;;
            background-attachment: fixed;
            width: 100%;
            margin: 0;
            padding: 0;
            height: 400px;

        }
    }
/*-------------------------------------------------------------------------*/
    .my-bc{
        border: 1px solid black;
    }
    .padding-right-4{
        padding-right: 4px;
    }
    .padding-left-4{
        padding-left: 4px;
    }
    .padding-top-4{
        padding-top: 4px;
    }
    .padding-bottom-4{
        padding-bottom: 4px;
    }

    .shadow{
        transition: all 0.2s;
    }
    .shadow:hover{
        transform: translate(0px,-20px);
        box-shadow: 0px 0px 10px silver;

    }
    .my-span-2{
        text-align: left;width: 100%;display: inline-block
    }
    .my-time{
        font-size: 14px;
        color: #999
    }
    .my-news-span{
        padding: 3px 10px;
        border: 1px solid #999;
        border-radius: 4px;
        font-size: 14px;
        color: #999;
        margin: 20px 10px;
        display: inline-block;
    }
    .my-img-response{
        display: block;width: 100%
    }
    .border-know-2{
        border:1px solid black;
        width: 123px;
        height: 33px;
        text-align: center;
        line-height: 33px;
        display: inline-block;
        color: black;
        text-decoration: none;
        margin-top: 100px;
    }
    .my-h4-2{
        margin: 20px 0;font-size: 26px;font-weight: 500;margin-bottom: 0;padding-top: 100px;
    }
    .my-h4-3{
        width: 60px;height:178px;margin: auto;margin-bottom: 50px;
    }
    .my-p-2{
        width: 80%;
        margin: 20px auto;color: #999;font-size: 16px;font-weight: 500;
        margin-top: 0;padding-bottom: 60px;
    }
    .my-p-3{
        width: 80%;
        margin: 20px auto;color: #999;font-size: 16px;font-weight: 500;
        margin-top: 0;margin-right: 0;
        padding-bottom: 80px;
    }
    .my-boxstyle{
        text-align: center;
        /*margin: 20px 0;*/
        padding: 0;
    }
    .my-h4{
        margin: 30px 0;font-size: 26px;font-weight: 500
    }
    .my-h5{
        margin: 30px 0;font-size: 20px;font-weight: 500
    }
    .my-p{
        width: 80%;
        margin: 20px auto;color: #999;font-size: 16px;font-weight: 500
    }
    .my-p br{
        line-height: 36px
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
        margin: 20px 0;
    }
    .hot{
        /*border: 1px solid black;*/
    }
    .container{
        width: 100%;
    }
    .carousel{
        width: 100%;overflow:hidden ;
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
    .transition{
        transition: all 0.3s linear;
    }

</style>


