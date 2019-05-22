<template>
    <div class="container">
        <div class="row">
            <div class="clear">
                <span style="float: left;padding: 10px 10px">称谓</span>
                <label for="man"  style="float: left;padding: 10px 10px">
                    <input type="radio" value="man" name="gender" id="man" v-model="userInput.gender"> 男士
                </label>
                <label for="women"  style="float: left;padding: 10px 10px">
                    <input type="radio" value="women" name="gender" id="women" v-model="userInput.gender"> 女士
                </label>
            </div>
            <div class="col-sm-6">
                <label for="username" style="width: 100%">
                    用户名
                    <input type="text"id="username" class="my-input2" v-model="userInput.uname">
                </label>
            </div>
            <div class="col-sm-6">
                <label for="name" style="width: 100%">
                    姓名
                    <input type="text"id="name" class="my-input2" v-model="userInput.name">
                </label>
            </div>

        </div>
        <div class="row">
            <div class="col-sm-6">
                <label for="upwd" style="width: 100%">
                    密码
                    <input type="password"id="upwd" class="my-input2" v-model="userInput.upwd">
                </label>
            </div>
            <div class="col-sm-6">
                <label for="upwd2" style="width: 100%">
                    确认密码
                    <input type="password"id="upwd2" class="my-input2" v-model="userInput.upwd2">
                </label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <span class="my-button-sc-pda" @click="register()">注册</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                urlAdree:this.carousel.data().address,
                user:{username:'nobabdy',userid:'0',phone:'123'},
                userInput:{uname:'',upwd:'',upwd2:'',gender:'man',name:''}
            }
        },
        mounted: function () {
            this.bus.$off('useridchang')
            this.bus.$on('useridchang',(mes)=>{
                this.user=mes;
//                console.log(this.user.userid,'rezult');
            })
            this.bus.$emit('getuserid','getuserid')//挂载时请求获取header组件的uid
            this.mesbox=this.carousel.methods.mesgBox()
        },
        methods: {
            register:function () {
                console.log(this.userInput.uname);
                if (this.userInput.uname==''||this.userInput.upwd==''||this.userInput.upwd2=='' ){
                    this.mesbox('用户名 和 密码不能为空')
                    return
                }
//                if (this.userInput.uname.length<6){alert("用户名需要6位以上的字符");return}
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/.test(this.userInput.upwd) || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/.test(this.userInput.upwd2)){alert("至少8-16个字符，至少1个大写字母，1个小写字母和1个数字");return}
                if (this.userInput.upwd!= this.userInput.upwd2){alert("两次密码不一致");return}
                this.$http.post(this.urlAdree+'/user/register',this.userInput,{emulateJSON:true}).then((response)=>{
                    console.log(response.body);
                    if (response.body.code==0){
                        alert(response.body.mesg)
                    }else {
                        let user = {username: this.userInput.uname, userid: response.body.uid, phone: '123'};
                        this.bus.$emit('registersuccess', user)
                        alert(response.body.mesg)
                        this.$router.push('/')
                    }
                })
            },
            mesbox:function () {
            }
        },
        computed: {

        },
        watch: {//前面属性名称:函数
//            user: {
//                handler(newVal, oldVal){
//                    console.log(this.user);
//                },
//                deep: true
//            }
        },
        filters: {
            filter1(){

            }
        }
    }
</script>


<style scoped>
    .my-button-sc-pda{
        width: 80%;
        height: 46px;
        background-color: black;
        color:white;
        outline: none;
        display: inline-block;
        text-align: center;
        line-height: 46px;
        overflow: hidden;
        cursor: pointer;
    }
    .my-button-sc2-pda{
        width: 80%;
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
        cursor: pointer;
    }
</style>
