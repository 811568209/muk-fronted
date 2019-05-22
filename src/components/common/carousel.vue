<template>

</template>

<script>
    export default{
        data(){
            return {
                address:'http://2444f679p9.wicp.vip:16180',
//                address:'http://127.0.0.1:3000',
            }
        },
        mounted: function () {

        },
        methods: {
            carousel:function (_this,count) {
                count = count || 3
                setInterval(()=>{
                    _this.carouselStyle.transition='all 0.3s';
                    let left=parseInt(_this.carouselStyle.left);
                    if (left>(count-1)*(-100)){//小于倒数第一张图片时正常轮播
                        left-=100;
                        _this.carouselStyle.left=left+'%';
                        _this.active=left / (-100)+1
                    }else if (left>count*(-100)){//倒数第一张图片时正常轮播后把transition去掉后回滚到第一张图片
                        left-=100;
                        _this.carouselStyle.left=left+'%';
                        setTimeout(()=>{
                            _this.carouselStyle.transition='';
                            _this.carouselStyle.left=0+'%';
                        },300)
                        _this.active=1
                    }
                },4000)
            },
            mesgBox:function (innerHTML) {
                let timer
//                console.log(innerHTML);
                return function mesgBoxfun (innerHTML,stay) {
                    let mesbox=document.querySelector('.mesbox')
                    mesbox.innerHTML=innerHTML
                    stay=stay==undefined ? 800 : stay
                    mesbox.style.display='block'
                    clearTimeout(timer)
                    timer =setTimeout(()=>{
                        mesbox.className="mesbox mesboxShow"
                        timer =setTimeout(()=>{
                            mesbox.className="mesbox"
                            timer = setTimeout(()=>{
                                mesbox.style.display='none'
                            },500)
                        },stay)
                    },2)
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
        filter: {
            filter1(){

            }
        }
    }
</script>


<style scoped>

</style>
