<template>
    <div>
       <div style="width: 256px;height: 235px;background: #5cb85c;display: none"
            @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)" :style="mystyle"
            @mousedown="touchstart($event)"  @mousemove="touchmove($event)" @mouseup="touchend($event)"
       >
           <a href="##">
               <img src="" alt="">
           </a>

       </div>
    </div>

</template>

<script>
    export default{
        data(){
            return {
              mydata:[
                  {address:'11',obj:[{obj3:'obj3',obj9:'obj9'},{obj4:'obj4'},{obj5:'obj5'}] },
                  {address:'22',obj:[{obj3:'obj6',obj9:'obj9'},{obj7:'obj7'},{obj8:'obj8'}] }
                  ],
                currentXstart:0,
                originalX:0,
                canMove:false,
                mystyle:{
                    transform: 'translateX(123px)',
                    transition:'',
                }
            }
        },
        mounted: function () {
            this.bus.$on('test',(mes)=>{
                console.log(mes);
            })
        },
        methods: {
            touchstart:function (e) {
                console.log(e.type.indexOf('mouse')!=-1,'mouse');
                this.mystyle.transition=''
                console.log(e);
                console.log('touchstart');
                console.log(e.touches,'touches');
                console.log(e.targetTouches,'targetTouches');
                console.log(e.changedTouches,'changedTouches');
                let currentXstart=0
                if (e.type.indexOf('mouse')!=-1){
                    currentXstart=e.clientX
                    console.log(currentXstart);
                    this.canMove=true
                }else {
                    currentXstart=e.changedTouches[0].clientX
                    console.log('else');
                }
//                this.clientX=e.touches[0].clientX
//                console.log(this.clientX);
                let originalX=parseInt(this.mystyle.transform.match(/[-]*\d+/)[0])
                this.originalX=originalX
                this.currentXstart=currentXstart
                console.log(this.currentXstart);
            },
            touchmove:function (e) {
                console.log('touchmove');
                this.mystyle.transition=''
                let currentXmove=0
                if (e.type.indexOf('mouse')!=-1){
                    e.preventDefault()
                    currentXmove=e.clientX
                    console.log(this.canMove);
                    if (!this.canMove){
                        return
                    }
                    console.log(currentXmove);
                }else {
                    currentXmove=e.changedTouches[0].clientX
                }
                let translateX=parseInt(this.mystyle.transform.match(/[-]*\d+/)[0])
                let originalX=this.originalX

                let changX=originalX+(currentXmove-this.currentXstart)

                let parentwidth=parseInt(getComputedStyle(e.target.parentNode.parentNode.parentNode).width)
                if (translateX<=0 || translateX>parentwidth-parseInt(getComputedStyle(e.target).width)){
                    console.log('out');
                    let outX=translateX
                    if (translateX<=0){
                        changX=-5 * changX / (-50 + outX)
                    }
                    if (translateX>=parentwidth-parseInt(getComputedStyle(e.target).width)){
                        let outX=translateX-(parentwidth-parseInt(getComputedStyle(e.target).width))
                        changX=1 * (changX-(parentwidth-parseInt(getComputedStyle(e.target).width))) / (outX*5)
                        changX=translateX+changX
                    }
                }else{
                    console.log('notout');
                }
                console.log(changX,'changX');
                this.mystyle.transform='translateX('+changX+'px)'
            },
            touchend:function (e) {
                if (e.type.indexOf('mouse')!=-1){

                    this.canMove=false
                }else {

                }
                console.log(e);
                console.log('touchend');
                console.log(e.touches,'touches');
                console.log(e.targetTouches,'targetTouches');
                console.log(e.changedTouches,'changedTouches');
                let translateX=parseInt(this.mystyle.transform.match(/[-]*\d+/)[0])
                let parentwidth=parseInt(getComputedStyle(e.target.parentNode.parentNode.parentNode).width)
                if (translateX<=0 || translateX>=parentwidth-parseInt(getComputedStyle(e.target).width)){
                    console.log('out');
                    if (translateX<=0){
                        let timer1= setInterval(()=>{
                            translateX+=2
                            this.mystyle.transform='translateX('+translateX+'px)'
                            if (translateX>=0){
                                clearInterval(timer1)
                            }
                        },2)
                    }
                    if (translateX>=parentwidth-parseInt(getComputedStyle(e.target).width)){
                        let timer2= setInterval(()=>{
                            translateX-=2
                            this.mystyle.transform='translateX('+translateX+'px)'
                            if (translateX<=parentwidth-parseInt(getComputedStyle(e.target).width)){
                                clearInterval(timer2)
                            }
                        },2)
                    }
                }
                console.log(e.timeStamp,'changedTouches');

                this.mystyle.transition='all 0.3s linear'
                setTimeout(()=>{
                    this.mystyle.transform='translateX('+123+'px)'
                },2)
            },
            mousedown:function (e) {
//                console.log(e);
//                console.log('mousedown');
                this.canMove=true

                let currentXstart=e.clientX
                let originalX=parseInt(this.mystyle.transform.match(/[-]*\d+/)[0])
                this.originalX=originalX
                this.currentXstart=currentXstart
//                console.log(this.currentXstart);
//                console.log(originalX);

            },
            mousemove:function (e) {
                event.preventDefault();
                if (!this.canMove){
                    console.log('canmove false');
                    return

                }
                console.log(this.canMove);
                console.log('mousemove');
                let translateX=parseInt(this.mystyle.transform.match(/[-]*\d+/)[0])
                let originalX=this.originalX
                let currentXmove=e.clientX
                let changX=originalX+(currentXmove-this.currentXstart)

                let parentwidth=parseInt(getComputedStyle(e.target.parentNode.parentNode.parentNode).width)
                let boxwidth=parseInt(getComputedStyle(e.target).width)
                if (translateX<=0 || translateX>parentwidth-boxwidth){
                    console.log('out');
                    let outX=translateX
                    if (translateX<=0){
//                        changX=-5 * changX / (-50 + outX)
                    }
                    if (translateX>=parentwidth-boxwidth){
//                        let outX=translateX-(parentwidth-boxwidth)
//                        changX=1 * (changX-(parentwidth-parseInt(getComputedStyle(e.target).width))) / (outX*5)
//                        changX=translateX+changX
                    }
                }else{
                    console.log('notout');
                }
                console.log(changX,'changX');
                this.mystyle.transform='translateX('+changX+'px)'
            },
            mouseup:function (e) {
                console.log('mouseup');
                let translateX=parseInt(this.mystyle.transform.match(/[-]*\d+/)[0])
                let parentwidth=parseInt(getComputedStyle(e.target.parentNode.parentNode.parentNode).width)
                let boxwidth=parseInt(getComputedStyle(e.target).width)
                if (translateX<=0 || translateX>=parentwidth-boxwidth){
                    console.log('out');
                    if (translateX<=0){
                        let timer1= setInterval(()=>{
                            translateX+=2
                            this.mystyle.transform='translateX('+translateX+'px)'
                            if (translateX>=0){
                                clearInterval(timer1)
                            }
                        },2)
                    }
                    if (translateX>=parentwidth-boxwidth){
                        let timer2= setInterval(()=>{
                            translateX-=2
                            this.mystyle.transform='translateX('+translateX+'px)'
                            if (translateX<=parentwidth-parseInt(getComputedStyle(e.target).width)){
                                clearInterval(timer2)
                            }
                        },2)
                    }
                }
                this.canMove=false
            }
        },
        computed: {
            name: function () {
                return
            }
        },
        watch: {//前面属性名称:函数
//
        },
        filters: {
            filter1(){

            }
        }
    }
</script>


<style scoped>
.bb{
    transform: translateX(x);
}
</style>
