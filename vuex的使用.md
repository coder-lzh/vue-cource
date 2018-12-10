## vuex的使用

先创建好一个明确的架构。
src文件夹下新建store文件夹，分别创建
1. state.js
2. mutations.js
3. index.js
4. getters.js
5. actions.js
6. module/user.js ,tabNav.js ,router.js
7. plugin/saveInLocal.js

state.js 是存放值的地方。
我们不能直接修改state里面的值，要想修改必须使用mutations.js 通过他创建一个方法，方法的第一个值是state，如果传的值是一个，就直接写
，如果是多个，就传个对象。

在index.js中创建vuex实例

```
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  }
})

```
在main.js中引入

```
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
ok，架子已经搭好了。开始codeing...

## state.js
就相当于data属性。我们在这里面定义的值可以在页面上取到。

```
const state = {
    appName: 'admin',
    stateValue: 'abc'
}
export default state
```
### 方法一
在任意vue页面取

```
appName: {{this.$store.state.appName}}
```

### 方法二

```
appName:{{appName}}

import { mapState } from 'vuex'

//计算属性
    computed:{
        ...mapState([
            'appName'  //参数是一个数组，appname是我们在state.js中定义的值。直接引用即可
        ])
    }
```
### 方法三

```
//计算属性
    computed:{
        ...mapState({
            appName:state=>state.appName  /*还可以存放一个对象*/
        })
    }
```
## getters.js

就相当于我们的computed计算属性,有时候我们state中有个count分数的变量，我们想实现，大于60分，就显示及格，低于60分就
显示不及格，这个时候我们可以采用getters来实现。

```
const getters = {
  appNameWithVersion: (state) => {
    return `${state.appName}v2.0`
  }
}
export default getters
```

### 方法一
在任意vue页面取

```
appName: {{this.$store.getters.appNameWithVersion}}
```
### 方法二

```
{{appNameWithVersion}}

import { mapGetters} from 'vuex'

//计算属性
    computed:{
       ...mapGetters([
            'appNameWithVersion'
        ])
    }
```
### 方法三
这个是获取子模块user下的例子，有个坑，别忘了在user子模块下加namespaced: true,  意思是使用命名空间

```
{{appNameWithVersion2}}

import { mapGetters} from 'vuex'

//计算属性
    computed:{
       ...mapGetters('user',[
            'appNameWithVersion2'
        ]),
    }
```
## mutations

作用：用来修改state中的值

mutations.js 中定义方法

```
const mutations = {
 	SET_STATE_VALUE (state, value) {
        state.stateValue = value
    }
}
```
在页面调用

```
 update(){
            this.$store.commit("SET_STATE_VALUE","zzz")
        }
```

## actions

作用：来修改mutations的值

```
方法一
actions:{
	increment(context,val){
		//context 是当前模块的上下文环境
		context.commit('mutations中方法名',val)
	}
}
方法二
actions:{
	increment({commit,state,rootState,dispatch},val){
		//state 是当前模块的state
		//rootState 是根模块下的state
       //dispatch 可以调用其他的actions
		commit('mutations中方法名',val)
	}
}
```

页面中调用

```
changName(){
	this.$store.dispatch('increment',val)
}
```

## plugins
作用，加载自定义插件的时候会初始化一下，然后我们比如执行了一个action方法，会相对应的执行action的钩子。

index.js 中定义

```
export default new Vuex.Store({
  strict: false,
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    router,
    tabNav
  }
   plugins: [ saveInLocal ]
})

```

saveInLocal.js
作用：一个保存本地变量的自定义插件，就是当我们每次改变值的时候都会走这个方法，然后这个方法会把state中的值保存到本地，我们刷新的时候会重新把本地的值重新赋给state

```
export default store => {
  console.log("init了。。。") //每次刷新都会走这一步
    //如果本地有state的值，就将本地的值替换现在的值  replaceState store提供的方法
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
  store.subscribe((mutation, state) => {
	  console.log("执行了mutation方法") //经测试，无论是action，还是mutation都会走这个方法。nb
    localStorage.state = JSON.stringify(state)
  })
}

```

## vuex的双向数据绑定
我们知道vuex中的state数据是不能直接改变的，所以我们在input中用v-model 会报错。我们可以采用计算属性的方法来实现。通过get，set方法来实现

```
<input v-model="stateValue"/>  {{ stateValue }}
//计算属性
computed: {
	stateValue: {
      get () {
        return this.$store.state.stateValue
      },
      set (val) {
        this.$store.commit('SET_STATE_VALUE',val)
      }
    },
}
```