<template>
  <div id="app">
    <my-header></my-header>
    <router-view/>
    <my-foot></my-foot>
    <my-test></my-test>
  </div>
</template>

<script>
  import Header from '@/components/my-header'
  import Foot from '@/components/my-foot'
  import test from '@/components/test'


export default {
  name: 'App',
    components:{
      'my-header':Header,
        'my-foot':Foot,
        'my-test':test
    }
}
</script>

<style>
body{
  background-color: white;
}

</style>
