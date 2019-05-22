<template>
    <div>
        <div class="container">
            <div class="row">
                <!--标题-->
                <div>
                    <h3 class="my-nd-h4">{{newsDetails.title}}</h3>
                </div>
            </div>
            <div class="row">
                <!--文字区域-->
                <p class="my-nd-p">
                    {{newsDetails.introduce}}
                </p>
                <!--图片区域-->
                <p class="my-nd-p-img">
                    <img :src=newsDetails.img1 alt="" class="img-responsive">
                </p>
                <p class="my-nd-p-img">
                    <img :src=newsDetails.img2 alt="" class="img-responsive">
                </p>
                <p class="my-nd-p-img">
                    <img :src=newsDetails.img3 alt="" class="img-responsive">
                </p>
                <p class="my-nd-p-img">
                    <img :src=newsDetails.img4 alt="" class="img-responsive">
                </p>
                <hr>
                <p class="my-nd-p">
                    上一篇：<a class="cursor" @click="getdata(previous.nid,$event)">{{previous.title==null? "无" : previous.title}}</a>
                </p>
                <p class="my-nd-p">
                    下一篇：<a class="cursor" @click="getdata(next.nid,$event)">{{next.title==null? "无" : next.title}}</a>
                </p>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                urlAdree:this.carousel.data().address,
                user:{username:'nobabdy',userid:'0',phone:'123'},
                newsDetails:{nid:'',img1:'',img2:'',img3:'',img4:'',introduce:'',title:'',pubTime:''},
                previous:{nid:'',title:''},
                next:{nid:'',title:''}
            }
        },
        mounted: function () {
            this.newsDetails.nid = this.$route.params.nid
            window.scrollTo(0,0);
            this.bus.$off('useridchang')
            this.bus.$on('useridchang',(mes)=>{
                this.user=mes;
//                console.log(this.user.userid,'rezult');
            })
            this.bus.$emit('getuserid','getuserid')//挂载时请求获取header组件的uid
//            setInterval(()=>{
//                console.log(this.newsDetails.nid);
//                console.log(666);
//            },1000)
            this.getdata(this.newsDetails.nid)
        },
        methods: {
            getdata:function (nid,event) {
                if(event==undefined){
                    this.$http.post(this.urlAdree+'/news/details',{nid:nid},{emulateJSON:true}).then((response)=>{
                        console.log(response.body);
                        this.newsDetails=response.body.current
                        this.previous=response.body.previous
                        this.next=response.body.next
                    })
                }else {
                    if (event.target.innerHTML=="无"){
                        return
                    }else {
                        window.scrollTo(0,0);
                        this.$http.post(this.urlAdree+'/news/details',{nid:nid},{emulateJSON:true}).then((response)=>{
                            console.log(response.body);
                            this.newsDetails=response.body.current
                            this.previous=response.body.previous
                            this.next=response.body.next
                        })
                    }
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
    @media (max-width: 768px){
        .my-nd-h4{
            margin: 30px 0;
        }
        .my-nd-h4:after{
            border-bottom: 1px solid #c6c6c6;;
            display: block;
            position: relative;
            content: '';
            top: 20px;
        }
    }
    @media (min-width: 768px){
        .my-nd-h4{
            margin: 70px 0;
        }
        .my-nd-h4:after{
            border-bottom: 1px solid #c6c6c6;;
            display: block;
            position: relative;
            content: '';
            top: 60px;
        }
    }
    .my-nd-p{
        margin: 20px 0;
        font-size: 16px;
        color: #666;
        line-height: 26px;
    }
    .my-nd-p-img{
        margin: 20px 0;
        text-align: center;
        display: block;
    }
    .my-nd-p-img img{
        display: block;
        margin: auto;
    }
</style>


