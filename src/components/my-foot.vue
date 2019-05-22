<template>
    <div class="foot bgw">
        <div class="container">
            <div class="row" style="background: black">
                <div class="col-sm-3 hidden-xs my-boxstyle-2">
                    <img src="" alt="" class="footLog">
                </div>
                <div class="col-sm-6 my-boxstyle-2">
                    <div class="footContainer">
                        <ul>
                            <li @click="goTo('/about')">关于我们</li>
                            <li @click="goTo('/news')">新闻资讯</li>
                            <li @click="goTo('/productCenter')">产品中心</li>
                            <li @click="goTo('/shopCenter')">购物中心</li>
                        </ul>
                        <p>MUK 上海美攸贸易有限公司 版权所有</p>
                        <p>ICP备案号：沪ICP备18034780号</p>
                    </div>
                </div>
                <div class="col-sm-3 hidden-xs bg my-boxstyle-2">
                    <img src="" alt="" class="footLog">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                user:{username:'nobabdy',userid:'0',phone:'123'},
                addid:{id:0,click:''}
            }
        },
        mounted: function () {
            this.bus.$off('useridchang')
            this.bus.$on('useridchang',(mes)=>{
                this.user=mes;
//                console.log(this.user.userid,'rezult');
            })
            this.bus.$emit('getuserid','getuserid')//挂载时请求获取header组件的uid

            this.bus.$on('cartid',(mes)=>{
                this.addid=mes
            })
            this.bus.$on('getcartid',(mes)=>{
                this.bus.$emit('acceptcartid',this.addid)
            })
        },
        methods: {
            goTo:function (destination) {
                this.$router.push(destination);
            },
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
            filter1(){

            }
        }
    }
</script>

<style scoped>
    @media (max-width: 768px){
        .bgw{
            background: white;
        }
        .foot{
            padding-top: 150px;
        }
        .my-boxstyle-2{
            text-align: center;
            padding: 10px 0;
        }
        .footContainer{
            /*border-left: 1px solid white;*/
            /*border-right: 1px solid white;*/
            width: 100%;
            padding: 5px 0;
            color: white;
            text-align: center;
        }
        .footContainer ul{
            list-style: none;
            display: flex;
            justify-content: space-between;
            padding: 0;
            width: 80%;
            margin: auto;
            padding-bottom: 30px;
        }
        .footContainer li{
            /*border-left: 1px solid white;*/
            width: 30%;
            font-size: 16px;
            cursor: pointer;
        }
    }
    @media (min-width: 768px){
        .foot{
            padding-top: 100px;
        }
        .my-boxstyle-2{
            text-align: center;
            padding: 30px 0;
        }
        .footContainer{
            border-left: 1px solid white;
            border-right: 1px solid white;
            width: 100%;
            padding: 20px 0;
            color: white;
            text-align: center;
        }
        .footContainer ul{
            list-style: none;
            display: flex;
            justify-content: space-between;
            padding: 0;
            width: 80%;
            margin: auto;
            padding-bottom: 40px;
        }
        .footContainer li{
            border-left: 1px solid white;
            width: 30%;
            font-size: 16px;
            cursor: pointer;
        }
        .footContainer li:nth-child(1){
            border-left:none;
        }
    }
    .container{
        width: 100%;
    }
    .footLog{
        padding-top: 30px;
    }
    .footContainer li a{
        text-decoration: none;
        color: white;

    }

</style>


