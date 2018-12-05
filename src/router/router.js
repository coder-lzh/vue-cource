import Home from '@/views/Home.vue'
// name 命名路由
export default [{
    path: '/',
    // 别名使用，访问别名的效果是一样的
    alias: '/home_page',
    name: 'home',
    component: Home,
    //路由内的守卫
    beforeEnter:(to,from,next)=>{
        // if(from.name!=="login") console.log("这不是从登录页来的")
        // else console.log("是从登录页来的")
        next()
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 懒加载作用，只有访问页面的时候才会进行加载，起到优化的作用
    // 注释是打包文件带哈希值的
    component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue'),
      meta:{
        title:"关于"
      }
  },
  // 动态路由
  {
    // :name 是参数，name传入进来是什么就是什么
    path: '/argu/:name',
    name: 'argu',
    component: () => import('@/views/argu.vue'),
    // 同一个页面不同的参数可以处理不同的逻辑
    // <!-- route 路由额外携带的food参数 ,必须使用props定义和接收-->
    props:{
      food:"banner"
    }
  },
    // 动态路由2
  {
      path: '/argu2',
      name: 'argu2',
      component: () => import('@/views/argu2.vue'),
      // 同一个页面不同的参数可以处理不同的逻辑
      // 函数式传参，可以根据url后面的参数来传递。 http://localhost:8080/#/argu2?food=xx
      props: route =>({
          food:route.query.food
      })
  },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue')
    },
  // 嵌套路由
  {
    path: '/parent',
    name: 'parent',
    component: () => import('@/views/parent.vue'),
      // 嵌套数组
      children: [
        {
        // 子嵌套路由不需要'/',子嵌套会自动补全,只有父才需要
        path: 'child',
        component: () => import('@/views/child.vue')
      }
    ]
  },
  // 命名视图
  {
    path: '/named_view',
    // 命名视图components以上方使用不一样，它后面有个s
    components: {
      // 默认视图
      default: () => import('@/views/child.vue'),
      // 指定的命名视图加载
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },

    {
        path: '/store',
        name: 'store',
        meta: {
            title: 'sotre'
        },
        component: () => import('@/views/store.vue')
    },
  // 重定向
  {
    path: '/main',
    // 默认使用
    // redirect: '/'

    // 命名方式使用
    // redirect: {
    //   name: 'home'
    // }

    // 方法函数使用
    // redirect: to =>{
    //   // 可以在此处使用逻辑
    //   console.log(to)
    //   // 这里直接return回home
    //   return {
    //     name: 'home'
    //   }
    // }

    // 方法函数的简写
    redirect: to => '/'
  }
]
// 编程式的导航
