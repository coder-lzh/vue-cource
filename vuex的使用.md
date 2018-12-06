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

就相当于我们的computed计算属性

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
