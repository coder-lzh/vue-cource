<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="handleChilk('back')">返回上一页</button>
    <button @click="handleChilk('push')">跳转到parent</button>
    <button @click="handleChilk('replace')">替换到parent</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
   beforeRouteEnter(to,from,next){
      //渲染之前的钩子，这里还不能使用this关键字。想得到this关键字可以通过下面这个方法。
       next(vm=>{
           console.log(vm) //这个vm就是this对象
       })
       console.log(' beforeRouteEnter !')
       next()
   },
    beforeRouteLeave(to,from,next){
        /*console.log(' beforeRouteLeave !', this)
        const answer = window.confirm('确认离开？')
        answer ? next() : next(false)*/
        next()
  },
    //用处是当路由携带的路径参数发生改变的时候会触发这个钩子，比如说/home/1  变成  /home/2
    beforeRouteUpdate(to,from,next){

    },

  methods: {
    // 定义点击方法
    handleChilk(type){
      // 路由实例，在 main.js 已注册
      if(type === 'back'){ // 返回上一页
        // go(1) -> 前进一页
        // this.$router.go(-1)
        this.$router.back()
      } else if(type === 'push'){ // 跳转
        // this.$router.push('/parent')

        const name = 'payenzhuang'  // 定义变量
        // 命名使用方式
        this.$router.push({
          // es6的写法
          path: `/argu/${name}`

          // 跳转到argu的时候使用动态路由参数
          // name: 'argu',
          // params: {
          //   name: 'paynezhuang'
          // }

          // 参数
          // query: {
          //   name: 'paynezhuang'
          // }
        })
        // push replace 区别，replace是替换，push是浏览历史里加入记录，回退上个
        // replace 是将当前的浏览记录替换，之后再回推将是替换的页面
      } else if(type === 'replace'){
        this.$router.replace({
          name: 'parent'
        })
      }
    }
  }
}
</script>
