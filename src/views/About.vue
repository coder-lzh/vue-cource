<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
  import {setTitle} from "../lib/util"
export default {
  name: 'about',
  beforeRouteEnter(to,from,next){
      to.meta && setTitle(to.meta.title)
      //渲染之前的钩子，这里还不能使用this关键字。想得到this关键字可以通过下面这个方法。
      next(vm=>{
          console.log(vm) //这个vm就是this对象
      })
      console.log(' beforeRouteEnter !')
      next()
  },
}
</script>
