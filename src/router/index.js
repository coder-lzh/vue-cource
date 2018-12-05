import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

// 将创建实例单独拿出来，
const router = new Router({
    routes: routes
})

//是否登陆的标志 ，通过计算获得
const HAS_LOGINED = true
// 在router实例上进行全局守卫 router实例的beforeEach，这个方法可以注册一个全局前置守卫。
// to 和 from 都是路由对象，to表示即将跳转的路由对象，from表示当前你即将离开的路由对象
// next是一个函数，如果你确定要跳转会用到next函数
router.beforeEach((to, from, next) => {

  //简单演示一下登陆的逻辑
    if(to.name!=="login"){
      if(HAS_LOGINED) next();
      else next({name:"login"})
    }else{
      if(HAS_LOGINED) next({name:"home"})
      else next()
    }
})

//跳转之后的钩子----------------------------------------
/*这个没多大用处，场景是比如跳转页面，开始loading图标显示，跳转完毕之后图标关掉*/
router.afterEach((to, from) => {
    // logining = false
})

/**
 * 1. 导航被触发
 * 2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
 * 3. 调用全局的前置守卫 beforeEach
 * 4. 在重用的组件里调用 beforeRouteUpdate
 * 5. 调用路由独享的守卫 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8. 调用全局的解析守卫 beforeResolve
 * 9. 导航被确认
 * 10. 调用全局的后置守卫 afterEach
 * 11. 触发DOM更新
 * 12. 用创建好的实例调用beforeRouterEnter守卫里传给next的回调函数
 */
export default router
