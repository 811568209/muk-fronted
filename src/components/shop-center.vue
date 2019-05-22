<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-md-3 my-boxstyle" v-for="(item,index,key) in productList">
                <div class="cursor" @click="goTo(item.pid)">
                    <img :src=item.show_img alt="" class="my-img-response">
                    <!--<img :src="require('../assets/image/shop-center/1352512632.png')" alt="" class="my-img-response">-->
                </div>
                <div class=" sc-box1">
                    <h4>{{item.title2 | string_length(11)}}</h4>
                    <p>{{item.title1}}</p>
                    <div style="" class=" sc-box2">
                        <span>★★★★★</span>
                        <span>|</span>
                        <span>{{item.price1 | currency}}</span>
                    </div>
                    <span class="my-button-sc cursor" @click="goTo(item.pid)">立即购买</span>
                    <span class="my-button-sc2 cursor" @click="addCart(item.pid,item.price1)">加入购物车</span>
                </div>
            </div>
        </div>
        <div class="row paging" >
            <div class="clear" style="display: inline-block">
                <div style="display: inline-block;float: left">
                    <span>每页显示条数</span>
                    <br>
                    <select name="" id="" style="height: 30px" v-model="pageData.pageSize" @change="optionupdate()">
                        <option value=4  >4</option>
                        <option value=8  >8</option>
                        <option :value=pageData.totalRow >{{pageData.totalRow}}</option>
                    </select>
                </div>
                <div style="display: inline-block;float: left">
                    <ul class="cursor clear" style="padding: 0">
                        <li :class="{disabled : pageData.pageNeed==1}"  @click="pagupdate('--')">上一页</li>
                        <li v-for="(item,index) in pageData.pageTotal" :class="{active : index+1==pageData.pageNeed}"
                            @click="pagupdate(index+1)">{{index+1}}</li>
                        <li :class="{disabled : pageData.pageNeed==pageData.pageTotal}"  @click="pagupdate('++')">下一页</li>
                    </ul>
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
                productList:[{
                    pid:'', simg1:'',simg2:'',simg3:'',simg4:'',simg5:'',simg6:'',simg7:'',show_img:'',
                    title1:'',title2:'',introduce:'',select1:'',select2:'',select3:'',price1:'',price2:'',price3:'',
                    details_text1:'',details_text2:'',details_text3:'',
                    details_img1:'',details_img2:'',details_img3:'',details_img4:''
                },{},{}],
                user:{username:'nobabdy',userid:'0',phone:'123'},
                pageData:{pageSize:8,pageNeed:1,pageTotal:1,totalRow:0},
                search:''
//
            }
        },
        mounted: function () {
            window.scrollTo(0,0);
            this.bus.$off('useridchang')

            this.bus.$on('useridchang',(mes)=>{
                this.user=mes;
//                console.log(this.user.userid,'rezult');
            })
            this.bus.$emit('getuserid','getuserid')//挂载时请求获取header组件的uid
            this.mesbox=this.carousel.methods.mesgBox()
//            setInterval(()=>{
//                console.log(this.pageData);
//            },3000)
            if(this.$route.params.from=="header"){
                this.search=this.$route.params.search
                this.goSearch()
            }else {
                this.getdata()
            }
        },
        methods: {
            getdata:function () {
                this.$http.post(this.urlAdree+'/product/list',this.pageData,{emulateJSON:true}).then((response)=>{
                    console.log(response.body);
                    this.productList=response.body.data;
                    this.pageData=response.body.pageData;
                    console.log(this.productList);
                })
            },
            goTo:function (pid) {
                this.$router.push('/productDetails/'+pid)
            },
            addCart:function (pid,price) {
                console.log(this.user.userid);
                if (this.user.userid==0){
                    alert('请登陆！')

                }else {
                    let data={uid:this.user.userid,pid:pid,
                        selected:1,count:1,
                        total_prices:price}
                    this.$http.post(this.urlAdree+'/cart/add',data,{emulateJSON:true}).then((response)=>{
                        console.log(response.body);
                        this.bus.$emit('cartid',{id:response.body.id,click:'add'})
                        if (response.body.code='1')
                        this.mesbox('加入购物车成功！')
                    })
                }
            },
            mesbox:function () {
            },
            pagupdate:function (val) {
                if (val=='--'){
                    this.pageData.pageNeed>1 && this.pageData.pageNeed--
                }else if (val=='++'){
                    this.pageData.pageNeed<this.pageData.pageTotal && this.pageData.pageNeed++
                }else{
                    this.pageData.pageNeed=val
                }

                if(this.$route.params.from=="header"){
                    let search=this.$route.params.search
                    this.goSearch()
                }else {
                    this.getdata()
                }
            },
            optionupdate:function () {
                this.pageData.pageNeed=1
                if(this.$route.params.from=="header"){
                    let search=this.$route.params.search
                    this.goSearch()
                }else {
                    this.getdata()
                }
            },
            goSearch:function (search) {
                this.$http.post(this.urlAdree+'/product/search',{search:this.search,pageSize:this.pageData.pageSize,pageNeed:this.pageData.pageNeed,pageTotal:this.pageData.pageTotal,totalRow:this.pageData.totalRow},{emulateJSON:true}).then((response)=>{
                    this.productList=response.body.data;
                    this.pageData=response.body.pageData;
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
            string_length:function (myInput,ars) {
                if (myInput!=undefined){
                    if(myInput.length>ars){
                        return myInput.slice(0,ars)+"..."
                    }else {
                        return myInput
                    }
                }
            },
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
    .paging{
        /*float: right;*/
        text-align: center;
    }
    .paging ul{
        list-style: none;
        display: inline-block;
    }
    .paging ul>li{
        float:left;padding: 10px
    }
    .paging .active{
        border-bottom: 1px solid black
    }
    .paging .disabled{
        opacity: 0.3;
    }
    .sbb{
        border: 1px solid black;
    }
    .container{
        width: 100%;
    }
    .my-boxstyle{
        text-align: center;
    }
    .sc-box1{
        margin-bottom: 80px;
    }
    .sc-box2 {
        display: flex;justify-content: space-around;width: 60%;margin: 0 20%
    }
    .my-button-sc{
        margin-top: 3%;
        width: 125px;
        height: 35px;
        background-color: black;
        color:white;
        outline: none;
        display: inline-block;
        text-align: center;
        line-height: 35px;
    }
    .my-button-sc2{
        margin-top: 3%;
        width: 125px;
        height: 36px;
        background-color: white;
        color:black;
        outline: none;
        display: inline-block;
        text-align: center;
        line-height: 35px;
        border: 1px solid black;
    }








</style>



