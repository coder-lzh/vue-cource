import Home from '@/views/Home.vue'
// name 命名路由
export default [{
    path: '/',
    // 别名使用，访问别名的效果是一样的
    alias: '/home_page',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 懒加载作用，只有访问页面的时候才会进行加载，起到优化的作用
    // 注释是打包文件带哈希值的
    component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue')
  },
  // 动态路由
  {
    // :name 是参数，name传入进来是什么就是什么
    // 同一个页面不同的参数可以处理不同的逻辑
    path: '/argu/:name',
    name: 'argu',
    component: () => import('@/views/argu.vue')
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
