<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 ">
                    <div class="row">
                        <div class="col-xs-2  pd-padding-0 tag1">
                            <!--上箭头-->
                            <span class="glyphicon glyphicon-menu-up pd-arrow cursor" @click="movedown()"></span>
                            <!--可视区域-->
                            <div class="my-pd-box2 ">
                                <!--总共盒子-->
                                <div :style="boxmove">
                                    <div  class=" pd-box3 cursor" @click="active(key)" v-for="(item,index,key) in simg">
                                        <img :src=item alt="" class="img-responsive" @load="boxleft(),active(0)">
                                        <!--<img src="./static/image/product-details/1/1418714887.jpg" alt="" class="img-responsive">-->
                                    </div>
                                </div>
                            </div>
                            <!--下箭头-->
                            <span class="glyphicon glyphicon-menu-down pd-arrow cursor" @click="moveup()"></span>
                        </div>
                        <!--大图片-->
                        <div class="col-xs-10 pd-bimg">
                            <div>
                                <!--占位-->
                                <img :src=simg.simg1 alt="" class="img-responsive"style="opacity: 0">
                            </div>
                            <img :src=item alt="" v-for="(item,index,key) in simg" class="img-responsive">
                        </div>
                    </div>
                </div>

                <div class="col-md-6  clear pd-padding-0">
                    <div  class="pd-back-img cursor" :class="{ 'pd-back-img-full': favorite }" @click="Favorite()"></div>
                    <div class=" clear padding-left-40-pd">
                        <h3 style="">{{details.title1}}</h3>
                        <h4 style="">{{details.title2}}</h4>
                        <p style="">{{details.introduce}}</p>
                        <div style="" class="text-align-r-pd cursor">
                            <a  style="">查看详情</a>
                        </div>
                        <ul style="" class="">
                            <li class="eee cursor" v-for="(item,index,key) in price"  :class="{'my-li-pdbb':Select==parseInt(index)}" @click="selectChang(index)">
                                <p >{{item.select}} {{index}}</p>
                                <span>{{item.price | currency}}</span>
                            </li>
                        </ul>
                        <div class="pd-box4" >
                            <div class="pd-box4-box1">
                                <span class="my-span1 cursor" @click="reduce()">-</span>
                                <input style="" type="text" v-model="count">
                                <span class="my-span1 cursor" @click="plus()">+</span>
                            </div>
                            <div class="pd-box4-box2">
                                <span class="my-button-sc-pd cursor" @click="buy()">立即购买</span>
                                <span class="my-button-sc2-pd cursor" @click="addCart()">
                                    <img src="" alt="">
                                    加入购物车
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" style="position: relative;top: 100px;color: black">
            <h4>产品详情</h4>
        </div>
        <div style="width: 100%;height: 200px;background: #f8f8f8">
            <hr style="border-bottom: 1px solid #dadada; position: relative;top: 120px">
        </div>
        <div class="container">
            <div class="row pd-product-d">
                <p>{{details.details_text1}}</p>
                <p>{{details.details_text2}}</p>
                <p>{{details.details_text3}}</p>
                <p>{{details.details_text4}}</p>
                
                <p><img :src=details.details_img1 alt="" class="my-img-response"></p>
                <p><img :src=details.details_img2 alt="" class="my-img-response"></p>
                <p><img :src=details.details_img3 alt="" class="my-img-response"></p>

                <p  style="margin-top: 80px"><img src="" alt="" class="my-img-response"></p>
                <h1 style="">DARE TO SHARE</h1>
                <h2 style="">探索发现</h2>
                <div style="" class="pd-box5" v-if="details.simg7.trim()!=''">
                    <span style="">
                        <img :src=simg.simg1 alt="" class="img-responsive pd-margin-top-3">
                        <img :src=simg.simg2 alt="" class="img-responsive pd-margin-top-3" >
                    </span>
                    <span style="width: 19.75%;display: inline-block">
                         <img :src=simg.simg3 alt="" class="img-responsive pd-margin-top-3">
                         <img :src=simg.simg4 alt="" class="img-responsive pd-margin-top-3" >
                    </span>
                    <span style="">
                        <img :src=simg.simg5 alt="" class="img-responsive pd-margin-top-3">
                    </span>
                    <span style="width: 19.75%;display: inline-block">
                         <img :src=simg.simg6 alt="" class="img-responsive pd-margin-top-3">
                         <img :src=simg.simg7 alt="" class="img-responsive pd-margin-top-3" >
                    </span>
                </div>
            </div>
        </div>
        <div class="pd-minbox-backg" :style="minboxBG">
            <div class="pd-minbox" :style="minboxShow">
                <div class="pd-minbox-box1">
                    <span>信息</span>
                    <span style="font-size: 20px" @click="close()" class="cursor">x</span>
                </div>
                <div class="pd-minbox-box2">
                    <h3>登陆</h3>
                    <input type="text" class="my-input2" v-model="userInput.uname">
                    <input type="password" class="my-input2" v-model="userInput.upwd">
                    <div style="display: block">忘记密码?</div>
                    <div class="clear">
                        <span class="pd-my-button cursor" @click="userLogin()" >登陆</span>
                        <span class="pd-my-button cursor" @click="goto('register')">注册</span>
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
                minboxBG:{
                    display:'none',
                },
                minboxShow:{
                    width: '0px',
                    height: '0px',
                    opacity:0
                },
                favorite:false,
                boxmove:{
                    position: 'relative',
                    top:'0px',
                    transition:'all 0.2s linear'
                },
                details:{
                    pid:'', simg1:'',simg2:'',simg3:'',simg4:'',simg5:'',simg6:'',simg7:'',show_img:'',
                    title1:'',title2:'',introduce:'',select1:'',select2:'',select3:'',price1:'',price2:'',price3:'',
                    details_text1:'',details_text2:'',details_text3:'',
                    details_img1:'',details_img2:'',details_img3:'',details_img4:''
                },
                simg:{},
                price:{},
                user:{username:'nobabdy',userid:'0',phone:'123'},
                userInput:{uname:'',upwd:''},
                Select:1,
                selectStyle:{border: '1px solid #eeeeee;'},
                count:1,
                EventListener:{resize:'',}

            }
        },
        mounted: function () {
            window.scrollTo(0,0);
            this.bus.$off('useridchang')
            let title=document.querySelectorAll('title');
//            console.log(title="this is muk" );
            document.title='muk_product'
            this.bus.$on('useridchang',(mes)=>{
                this.user=mes;
                console.log(mes);
            })
            this.bus.$emit('getuserid','getuserid')//挂载时请求获取header组件的uid
            this.details.pid=this.$route.params.pid
            if (this.$route.params.from=='favorite'){
                this.Select=this.$route.params.Select
                this.details.pid=this.$route.params.pid
            }else if (this.$route.params.from=='personOrder'){
                this.Select=this.$route.params.selected
                this.details.pid=this.$route.params.pid
            }
            this.getdata()
            this.mesbox=this.carousel.methods.mesgBox()

            let resize=(e)=>{
                this.boxleft()
            }
            this.EventListener.resize=resize
            window.addEventListener('resize',resize)
        },
        beforeDestroy:function () {
            window.removeEventListener("resize",this.EventListener.resize);
            console.log('beforeDestroy');
        },
        methods: {
            boxleft:function () {
                setTimeout(()=>{
                    let boxl= document.querySelector('.tag1')
                    let boxlinner= document.querySelector('.my-pd-box2')
                    let boxrheight= getComputedStyle(document.querySelector('.pd-bimg')).height
                    boxl.style.height=boxrheight
                    boxlinner.style.height=parseInt(boxrheight)-28+'px'
                },5)
            },
            plus:function () {
               this.count++
            },
            reduce:function () {
                this.count>1 && this.count--;
            },
            favor:function () {
//                if (this.user.userid==0){
//                    this.mesbox('请登录',4000)
//                    return
//                }
//                if (this.favorite==true){
//                    this.mesbox('你已收藏过了！')
//                }else{
//                    this.favorite=true
//                    if (this.favorite==true){
//                        this.mesbox('收藏成功！')
//                    }
//                }
            },
            active:function (num) {
                setTimeout(()=>{
                    let minbox=document.querySelectorAll('.pd-box3');
                    for (let i=0;i<minbox.length;i++){
                        minbox[i].style.border="none"
                    }
                    minbox[num].style.border="1px solid black";
                    let bigimg=document.querySelectorAll('.pd-bimg>img');
                    for (let j=0;j<minbox.length;j++){
                        bigimg[j].style.zIndex=0;
                    }
                    bigimg[num].style.zIndex=5;
                },10)

            },
            moveup:function () {
                let boxheight=document.querySelectorAll('.pd-box3');
                if (parseInt(this.boxmove.top)>-(boxheight.length-3)*(boxheight[0].offsetHeight+11)&&boxheight[4].offsetHeight>10){
                    this.boxmove.top=parseInt(this.boxmove.top)-boxheight[0].offsetHeight-14+'px'
                }
            },
            movedown:function () {
                if (parseInt(this.boxmove.top)<0){
                let boxheight=document.querySelectorAll('.pd-box3');
                this.boxmove.top=parseInt(this.boxmove.top)+boxheight[0].offsetHeight+14+'px'
                }
            },
            buy:function () {
                console.log(this.user.userid);
                if (this.user.userid==0){
                    this.login()
                }else {
                    let data={uid:this.user.userid,pid:this.details.pid,
                        selected:this.Select,count:this.count,
                        total_prices:this.details['price'+this.Select]*this.count};
                        this.$router.push({
                            name:'order',
                            params:{
                                from:'productDetails',
                                data:data
                            }
                        })
                        return;
                    this.$http.post(this.urlAdree+'/cart/add',data,{emulateJSON:true}).then((response)=>{
                        console.log(response.body);
                        this.bus.$emit('cartid',{id:response.body.id,click:'buy'})
                        setTimeout(()=>{
                            this.$router.push('/cart')
                        },100)

                    })
                }
            },
            addCart:function () {
                console.log(this.user.userid);
                if (this.user.userid==0){
                    this.login()
                }else {
                    let data={uid:this.user.userid,pid:this.details.pid,
                        selected:this.Select,count:this.count,
                        total_prices:this.details['price'+this.Select]*this.count}
                    this.$http.post(this.urlAdree+'/cart/add',data,{emulateJSON:true}).then((response)=>{
                        console.log(response.body);
                        this.bus.$emit('cartid',{id:response.body.id,click:'add'})
                        if (response.body.code='1')
//                            alert('加入购物车成功！')
                        this.mesbox('加入购物车成功！')
                    })
                }
            },
            getdata:function () {
                let pid=this.details.pid;
//                console.log(pid);
                this.$http.post(this.urlAdree+'/product/details',{pid:pid},{emulateJSON:true}).then((response)=>{
//                    console.log(response.body);
                    this.details=response.body;
//                    console.log(this.details);

                    //获取小图片
                    for (let key in this.details){
                        if (key.indexOf('simg')!=-1){
                            if (this.details[key].trim()!=''){
                                this.simg[key]=this.details[key]
                            }
                        }
                    }
                    this.simg=Object.assign({}, this.simg);
                    //获取规格
                    for (let key in this.details){
                        if (key.indexOf('select')!=-1){
                            if (this.details[key].trim()!=''){
                                let index=/\d/.exec(key)[0];
                                this.price[index]={}
                                this.price[index]['select']= this.details[key]
                                this.price[index]['price']=this.details['price'+index]
                            }
                        }
                    }
//                    setTimeout(()=>{
//                        this.active(0)
////                        this.boxleft()
//                    },10)
                    this.isFavorite()
                })
            },
            login:function () {
                this.minboxBG.display='block';
                setTimeout(()=>{
                    this.minboxShow.width='330px';
                    this.minboxShow.height='365px';
                    this.minboxShow.opacity=1
                },10)
            },
            close:function () {
                this.minboxShow.width='0px';
                this.minboxShow.height='0px';
                this.minboxShow.opacity=0
                setTimeout(()=>{
                    this.minboxBG.display='none';
                },200)

            },
            userLogin:function () {
                let data=this.userInput
                this.$http.post(this.urlAdree+'/user/login',data,{emulateJSON:true}).then((response)=>{
                    console.log(response.body);
                    if (response.body.code!==1){
                        alert(response.body.mesg)
                    }else{
                        this.user.username=response.body.uname;
                        this.user.userid=response.body.uid;
                        this.user.phone=response.body.phone;
//                        console.log(this.user);
                        this.bus.$emit('registersuccess', this.user)
//                        alert(response.body.mesg)
                        this.close()
                    }
                })
            },
            selectChang:function (val) {
                this.Select=parseInt(val)
                this.isFavorite()
                let bigimg=document.querySelectorAll('.pd-bimg>img');
                for (let j=0;j<bigimg.length;j++){
                    bigimg[j].style.zIndex=0;
                }
                bigimg[val-1].style.zIndex=5;
            },
            mesbox:function () {
            },
            isFavorite:function () {
                this.$http.post(this.urlAdree+'/favorite',{uid:this.user.userid,pid:this.details.pid,selected:this.Select},{emulateJSON:true}).then((response)=>{
                    console.log(response.body);
                    this.favorite=response.body.favorite
                })
            },
            Favorite:function () {
                if (this.user.userid==0){
                    this.mesbox('请登录',4000)
                    return
                }
                this.$http.post(this.urlAdree+'/favorite/collect',{uid:this.user.userid,pid:this.details.pid,selected:this.Select},{emulateJSON:true}).then((response)=>{
                    console.log(response.body);
                    this.favorite=response.body.favorite
                    if (this.favorite==true){
                    this.mesbox('收藏成功！！',2000)
                    }else if (this.favorite==false){
                        this.mesbox('取消收藏！',2000)
                    }
                })
            },
            goto:function (dest,data) {
                this.$router.push({
                    name:dest
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
            }
        },
        filters: {
            currency:function (myInput) {
                myInput=parseInt(myInput)
                if (myInput>1000){
                    let qw= parseInt(myInput/1000)
                    return'￥'+qw.toString()+','+(myInput-1000*qw).toString()
                }else {
                    return'￥'+myInput
                }
            }
        }
    }
</script>


<style scoped>
    .pd-bimg{
        position: relative;
    }
    .pd-bimg>img{
        position: absolute;
        padding-right: 30px;
        top:0px
    }
    /*.pd-bimg>img:nth-child(1){*/
        /*z-index: 2;*/
    /*}*/
    .pd-minbox-box1{
        width: 100%;height: 40px;padding: 0 30px;display: flex;justify-content: space-between;
        background: #F8F8F8;border-bottom: 1px solid #eee
    }
    .pd-minbox-box1>span
    {
        margin-top: 10px;
        overflow: hidden;
    }
    .pd-minbox-backg{
        width: 100%;height: 100vh;background: rgba(0,0,0,0.5);position: fixed;top:0px;
        display: none;
        z-index: 100;
    }
    .pd-my-button{
        margin-top: 40px;
        width: 95px;
        height: 33px;
        background-color: black;
        color:white;
        outline: none;
        display: inline-block;
        text-align: center;
        line-height: 33px;
        margin-bottom: 100px;
    }
    .pd-minbox-box2>span {
        float:right;
        border-bottom: 1px solid silver;
        color: silver;
        font-size: 12px;
    }
    .pd-minbox-box2{
        width: 60%;margin: 0px auto
    }
    .pd-minbox{
        width: 0;height: 0;
        background: white;opacity: 1;
        position: relative;
        top:50%;left: 50%;
        transform: translate(-50%,-50%);
        /*display: inline-block;*/
        transition: all 0.2s linear;
        box-shadow: 0px 0px 50px black;
        overflow: hidden;
    }
    .pd-minbox-show{
        width: 330px;height: 365px;
    }
    .pd-box5>span{
        width: 19.75%;display: inline-block
    }
    .pd-box5>span:nth-child(3){
        width: 39.75%;display: inline-block
    }
    .pd-margin-top-3{
        margin-top: 3px
    }
    .pd-box5{
        display: flex;justify-content: space-between
    }
    .pd-product-d>h1{
        text-align: center;
        /*margin-top: 30px;*/
    }
    .pd-product-d>h2{
        text-align: center
    }
    .pd-product-d{

    }
    .pd-product-d>p{
        font-size: 18px;text-align: left;margin-bottom: 10px
    }
    .pd-product-d p:last-child{
        margin-top: 50px;
    }
    .pd-box4{
        display: flex;justify-content: space-between;margin-top: 40px
    }
    .pd-box4-box2
    {
        height: 48px;width: 50%;display:inline-block
    }
    .pd-box4-box1{
        border: 1px solid silver;height: 48px;width: 26%;display:inline-block
    }
    .pd-box4-box1>input
    {
        width: 46%;height: 46px;outline: none;border: none;float: left
    }
    .pd-box4-box1>.my-span1
    {
        width: 27%;height: 48px;display: inline-block;background: #f2f2f2;float: left;font-size: 20px;text-align: center;line-height: 48px
    }
    .pd-box4-box1>.my-span2
    {
        width: 27%;height: 48px;display: inline-block;background: #f2f2f2;float: left;font-size: 20px;text-align: center;line-height: 48px
    }
    .padding-left-40-pd>ul{
        list-style: none;margin: 10px 0;padding: 0;display: flex;justify-content: space-between
    }
    .padding-left-40-pd>ul>li{
        width: 20%
    }
    .padding-left-40-pd>ul>li>p{
        margin:10px 0 10px 10px
    }
    .padding-left-40-pd>ul>li>span{
        margin:0 0 10px 10px;display: inline-block
    }
    .text-align-r-pd
    {
        text-align: right}
    .text-align-r-pd>a
    {
        font-size: 16px;font-weight: 400;color: black}
    .padding-left-40-pd{
        padding-left: 40px
    }
    .padding-left-40>h4{
        margin: 20px 0
    }
    .padding-left-40>h3{
        margin-top: 0
    }
    .padding-left-40>p{
        margin:20px 0
    }
    .my-button-sc-pd{
        width: 48%;
        height: 46px;
        background-color: black;
        color:white;
        outline: none;
        display: inline-block;
        text-align: center;
        line-height: 46px;
        overflow: hidden;
    }
    .my-button-sc2-pd{
        width: 48%;
        height: 46px;
        background-color: white;
        color:black;
        outline: none;
        display: inline-block;
        text-align: center;
        line-height: 46px;
        border: 1px solid black;
        /*margin-left: 1%;*/
        overflow: hidden;
    }
    .clear:after{
        content:"";
        display:block;
        clear:both;
    }
    .pd-back-img{
        width: 32px;
        height: 32px;
        /*background: url("../assets/image/product-details/icon_shoucang.png");*/
        background-position:0px 32px;
        float: left;
    }
    .pd-back-img-full{
        background-position:0px 0px;
    }
    .pd-box3{
        margin: 14px 0
    }
    .pdbb{
        border: 1px solid black;
    }
    .padding-left-40-pd .my-li-pdbb{
        border: 1px solid black;
    }
    .eee{
        border: 1px solid #eeeeee;
    }
    .pd-padding-0{
        padding: 0;
        padding-left: 15px;
    }
    .pd-arrow{
        text-align: center;display: block
    }
    @media screen and (min-width:0px) and (max-width: 419px){
        .my-pd-box2{
            padding: 0;height: 190px;
            overflow: hidden;
            width: 80%;margin:auto
        }
    }
    @media screen and (min-width:420px) and (max-width: 768px){
        .my-pd-box2{
            padding: 0;height: 304px;
            overflow: hidden;
            width: 80%;margin:auto
        }
    }
    @media screen and (min-width:768px) and (max-width: 991px){
        .my-pd-box2{
            padding: 0;height: 370px;
            overflow: hidden;
            width: 80%;margin:auto
        }
    }
    @media screen and (min-width:992px) and (max-width: 1200px){
        .my-pd-box2{
            padding: 0;height: 250px;
            overflow: hidden;
            width: 80%;margin:auto
        }
    }
    @media(min-width: 1200px){
        .my-pd-box2{
            padding: 0;height: 304px;
            overflow: hidden;
            width: 80%;margin:auto
        }
    }
</style>



