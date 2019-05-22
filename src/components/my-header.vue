<template>
<div style="position: relative;">
    <!--小屏下的导航条-->
    <nav class="navbar navbar-default navbar-my-hide my-navbar">
        <h5 style="position: absolute;top: 40px">申明：本网站非MUK官网</h5>
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#caption" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <button class="navbar-toggle" @click.stop="myCart()" style="position: relative">购物车
                    <div class="cart-style" v-if="user.userid!=0">{{cartLenght}}</div>
                </button>
                <button class="navbar-toggle" @click.stop="myLoginTrn($event)">{{user.userid==0 ? '登陆' : user.username}}</button>

                <a class="navbar-brand"><img src="" alt="" @click="goTo('/')"></a>
            </div>

            <div class="collapse navbar-collapse " id="caption"  >
                <ul class="nav navbar-nav-my">
                    <input type="text" class="my-input" placeholder="search" v-model="search" @keyup.enter="goSearch()">
                    <ul class="my-language">
                        <li>中国大陆</li>
                        <li>英语</li>
                        <li>日语</li>
                    </ul>
                    <li class="active" @click="goTo('/')"><a>首页 <span class="sr-only">(current)</span></a></li>
                    <li @click="goTo('/about')"><a>关于我们</a></li>
                    <li @click="goTo('/news')"><a>新闻资讯</a></li>
                    <li @click="goTo('/productCenter')"><a>产品中心</a></li>
                    <li @click="goTo('/shopCenter')"><a>购物中心</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div id="my-header-after"></div>
    <!--大屏下的导航条-->
    <div class="bNavbar-hide bNavbar">
        <h4 style="position: absolute;top: 40px">申明：本网站非MUK官网</h4>
        <div class="bNavbar-box1">
            <ul class="">
                <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CHINA/中国大陆</li>
                <li>ENGLISH/英语</li>
                <li>JAPAN/日语</li>
            </ul>
            <img src="" alt="" class="cursor" @click="goTo('/')">
            <div @click.stop="">
                <div class="login-img cursor " @click="myLoginTrn($event)"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{user.userid==0 ? '登陆' : user.username}}</div>
                <div class="cart-img cursor "  @click="myCart()" style="position: relative"><div class="cart-style2" v-if="user.userid!=0">{{cartLenght}}</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;购物车</div>
                <input class="input-img" type="text" v-model="search" @keyup.enter="goSearch()">
            </div>
        </div>
        <ul style="" class="my-ul">
            <li @click="goTo('/')">首页</li>
            <li @click="goTo('/about')">关于我们</li>
            <li @click="goTo('/news')">新闻资讯</li>
            <li @click="goTo('/productCenter')">产品中心</li>
            <li @click="goTo('/shopCenter')">购物中心</li>
        </ul>
        <hr style="padding: 0px;margin: 0px auto">
    </div>
    <!--登陆框-->
    <div class="my-login clear"  id="login" style="" @click.stop>
        <div class="my-arrow"></div>
        <div class="container">
            <div class="row my-login-1 " id="loginHeight">
                <div class="col-sm-6 col-md-6" >
                    <h4 class="" style="background-color: white">登陆</h4>
                    <input type="text" class="my-input2" v-model="userInput.uname">
                    <input type="password" class="my-input2" v-model="userInput.upwd" @keyup.enter="login()">
                    <div class="my-span clear">
                                <span class="cbox checked float_left" @click="remember()" onclick="this.className=/checked/ig.test(this.className)?this.className.replace('checked',''):(this.className+' checked')">
                                </span>
                        <span class="float_left ">记住用户名</span>
                        <span>忘记密码?</span>
                    </div>
                    <div>
                        <span class="my-button cursor" @click="login()">登陆</span>
                    </div>
                </div>
                <div class="col-sm-6" >
                    <h4>新用户注册</h4>
                    <p style="margin:3% 0%;">注册成为MUK美妆官网会员，下单流程更流畅，
                        并可查看您的订单记录，追踪订单物流，第一时间获取官网最新资讯.</p>
                    <span class="my-button cursor" @click="goTo('/register'),myLoginHiden()">立刻注册</span>
                </div>
            </div>
        </div>
    </div>

    <div class="mesbox" style="">
        加入购物车成功
    </div>
</div>
</template>

<script>
    import CryptoJS from 'crypto-js'
    export default{
        data(){
            return {
                urlAdree:this.carousel.data().address,
                userInput:{uname:'',upwd:''},
                user:{username:'nobabdy',userid:'0',phone:'123'},
                cartLenght:0,
                search:'',
                rememberme:true,
            }
        },
        mounted: function () {
            console.log(document.cookie,'cookie');
            console.log(this);
            let path=this.$router.history.current.fullPath
            this.$router.push('//')
            setTimeout(()=>{
                this.$router.push(path)
            },1)
            window.onload=()=> {
//                this.logbox()
                console.log('onload!');
            }
            this.bus.$on("logOut",(mes)=>{
                console.log(mes+'header get');
                if (mes=='logOut'){
                    this.user={username:'nobabdy',userid:'0'}
                }
            });
            this.bus.$on('registersuccess',(mes)=>{
                console.log(mes);
                this.user=mes
            })
            this.bus.$on('getuserid',(mes)=>{//监听来自请求获取header组件的uid
                    this.bus.$emit('useridchang',this.user)//发送uid
            })
            this.isLogin()

//            setInterval(()=>{
////                this.bus.$emit('test','test')
//                this.bus.$emit('useridchang',this.user)
//            },1000)
            this.mesbox=this.carousel.methods.mesgBox()
            this.bubbling()
            this.bus.$on('cartlenght',(mes)=>{
                this.cartLenght=mes
            })
            this.readunameupwdcookie()

        },
        methods: {
            encryptByDES:function(message, key){
                //DES加密,key是密钥
                const keyHex = CryptoJS.enc.Utf8.parse(key);
                const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                return encrypted.toString();
            },
            decryptByDES:function(ciphertext, key){
                //DES解密,key是密钥
                const keyHex = CryptoJS.enc.Utf8.parse(key);
                // direct decrypt ciphertext
                const decrypted = CryptoJS.DES.decrypt({
                    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
                }, keyHex, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                return decrypted.toString(CryptoJS.enc.Utf8);
            },
            readunameupwdcookie:function () {
                function getCookie(cname)
                {
                    let name = cname + "=";
                    let ca = document.cookie.split(';');
                    for(let i=0; i<ca.length; i++)
                    {
                        let c = ca[i].trim();
                        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
                    }
                    return "";
                }
                console.log('cookie 中用户名:',this.decryptByDES(getCookie('un'),'userinfromation'));
                this.userInput.uname=this.decryptByDES(getCookie('un'),'userinfromation')
                this.userInput.upwd=this.decryptByDES(getCookie('ud'),'userinfromation')
            },
            remember:function () {
                let cbox= document.querySelector('.cbox')
                if(cbox.className.indexOf('checked')!=-1){
                    this.rememberme=true
                }else{
                    this.rememberme=false
                    let d = new Date();
                    d.setTime(d.getTime() + (-7 * 24 * 60 * 60 * 1000));
                    let expires = "expires=" + d.toGMTString();
                    document.cookie = 'un=;' + expires;
                    document.cookie = 'ud=;' + expires;
                    this.userInput.uname=''
                    this.userInput.upwd=''
                }
            },
            goTo:function (destination) {
                this.$router.push(destination);
                let caption=document.querySelector('#caption')
//                console.log(caption);
//                caption.dataAriaExpanded="false"
                caption.className="collapse navbar-collapse"

            },
            isLogin:function () {
                this.$http.post(this.urlAdree+'/user/islogin',{emulateJSON:true}).then((response)=>{
//                    console.log(response.body);
                    if (response.body.code==-1){
                        alert(response.body.mesg)
                    }else if (response.body.code==1){
                        this.user.username=response.body.uname;
                        this.user.userid=response.body.uid;
                        this.user.phone=response.body.phone;
//                        console.log(this.user);
                        this.myLoginHiden()
                        this.uid =response.body.uid;
                    }
                })
            },
            login:function () {
                console.log('click login');
                //用户名密码记过加密记录在cookie中，密钥是userinfromation
                let uname=this.encryptByDES(this.userInput.uname,'userinfromation')
                let upwd=this.encryptByDES(this.userInput.upwd,'userinfromation')
                let data=this.userInput
                this.$http.post(this.urlAdree+'/user/login',data,{emulateJSON:true}).then((response)=>{
                    console.log(response.body);
                    if (response.body.code!==1){
                        alert(response.body.mesg)
                    }else{
                        this.user.username=response.body.uname;
                        this.user.userid=response.body.uid;
                        this.user.phone=response.body.phone;
                        console.log(this.user);
                        this.myLoginHiden()
                        if(this.rememberme==true){
                            let d = new Date();
                            d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
                            let expires = "expires=" + d.toGMTString();
                            document.cookie = 'un=' +uname+ ';' + expires;
                            document.cookie = 'ud=' +upwd+ ';' + expires;
                        }
                    }
                })
            },
            myLoginShow:function () {
                let loginHeight=document.querySelector('#loginHeight');
                let login=document.querySelector('#login');

                loginHeight.style.display='block'
                login.style.display='block'
                setTimeout(()=>{
                    loginHeight.className='row my-login-1 my-login-1-show'
                },5)
            },
            myLoginHiden:function () {
                let loginHeight=document.querySelector('#loginHeight');
                let login=document.querySelector('#login');

                loginHeight.className='row my-login-1'
                setTimeout(()=>{
                    loginHeight.style.display='none'
                    login.style.display='none'
                },400)
            },
            myLoginTrn:function (e) {
                if (this.user.userid=='0'){
                    let loginHeight=document.querySelector('#loginHeight');
                    if (loginHeight.className.indexOf('my-login-1-show')==-1){
                       this.myLoginShow()
                    }else{
                      this.myLoginHiden()
                    }
                }else{
                    this.$router.push('/')
                    this.goTo('/personMes/personData')
                }

            },
            myCart:function () {

                if (this.user.userid=='0') {
                    this.mesbox('请先登陆！')
                    this.myLoginShow()
                }else{
                        this.$router.push('/cart')
                }
            },
            getTotalTop:function (elem) {
                var sum=0;
                do{
                    sum=elem.offsetTop+sum;
                    elem=elem.offsetParent;
                }while(elem!=null);
                return sum
            },
//            登陆框移动，已废弃
            logbox:function () {
                let bNavbarUl=document.querySelector('.bNavbar-box1>ul');
                let bNavbarDiv=document.querySelector('.bNavbar-box1>div');
                let myLogin=document.querySelector('.my-login')
                if (document.body.clientWidth<768){
                    myLogin.style.right='0%'
                }else if (document.body.clientWidth<970){
                    bNavbarUl.style.width='50%'
                    bNavbarDiv.style.width='50%'
                    myLogin.style.right='16%'
                }else if (document.body.clientWidth<1200){
                    bNavbarUl.style.width='40%'
                    bNavbarDiv.style.width='40%'
                    myLogin.style.right='14%'
                }
                window.onresize = function(){
                    if (document.body.clientWidth<768){
                        myLogin.style.right='0%'
                    }else if (document.body.clientWidth<970){
                        bNavbarUl.style.width='50%'
                        bNavbarDiv.style.width='50%'
                        myLogin.style.right='16%'
                    }else if (document.body.clientWidth<1200){
                        bNavbarUl.style.width='40%'
                        bNavbarDiv.style.width='40%'
                        myLogin.style.right='14%'
                    }else{
                        bNavbarUl.style.width='30%'
                        bNavbarDiv.style.width='30%'
                        myLogin.style.right='6%'
                    }
                };
            },
//            mesgBox:function () {
//                let mesbox=document.querySelector('.mesbox')
//                mesbox.style.display='block'
//                let timer=null
//                clearTimeout(timer)
//                timer =setTimeout(()=>{
//                    mesbox.className="mesbox mesboxShow"
//                    timer =setTimeout(()=>{
//                        mesbox.className="mesbox"
//                        timer = setTimeout(()=>{
//                            mesbox.style.display='none'
//                        },1000)
//                    },3000)
//                },2)
//            }
            mesbox:function () {
            },
            bubbling:function () {
                let body=document.querySelector('body')
                body.onclick=()=>{
                    this.myLoginHiden()
                }
            },
            goSearch:function () {
                this.$router.push(' ')
                setTimeout(()=>{
                    this.$router.push({
                        name:'shopCenter',
                        params:{
                            from:'header',
                            search:this.search
                        }
                    })
                },30)
            }

        },
        computed: {
            name: function () {
                return
            }
        },

        watch: {//前面属性名称:函数
            'user': {
                handler(newVal, oldVal){
                    console.log(this.user.userid);
                    this.bus.$emit('useridchang',this.user)
                },
                deep: true
            },
        },
        filters: {
            filter1(){

            }
        }
    }
</script>


<style scoped>
    /*.mesbox{*/
        /*width: 100px;height: 30px;line-height: 30px;text-align: center;background:rgba(0,0,0,0.5);color: white;*/
        /*position: fixed;z-index: 20;top:50%;left: 50%;transform:translate(-50%,-50%);*/
        /*border-radius: 1px;font-weight: 600;overflow: hidden;box-shadow:0px 0px 2px black;*/
        /*transition: all 0.2s linear;opacity: 0;display: none;*/
    /*}*/
    /*.mesboxShow{*/
        /*width: 180px;height: 50px;line-height: 50px;*/
        /*display: block;*/
        /*opacity: 1*/
    /*}*/
    .container{
        width: 100%;
    }
    @media screen and (max-width: 355px){
        #my-header-after{
            padding-bottom: 106px;
        }
    }
    @media screen and (min-width:355px) and (max-width: 768px){
        #my-header-after{
            padding-bottom: 56px;
        }
    }
    .cart-style{
        width: 20px;height: 20px;background: red;position: absolute;top: 0px;right: 0px;color: white;text-align: center;border-radius: 10px
    }
    .cart-style2{
        width: 20px;height: 20px;background: red;position: absolute;top: -7px;left: 10px;color: white;text-align: center;border-radius: 10px;line-height: 20px;
    }
</style>




