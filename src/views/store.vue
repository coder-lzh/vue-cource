<template>
  <div>
      <!--子组件-->
   <a-input  @out="handleInput"/>
    <br>
    {{inputValue}}<br>
      <!--兄弟组件传值-->
      <a-show :content="inputValue"/>
      appName:{{appName2}}
      <hr/>
      {{appNameWithVersion2}}
      <hr>
      appName: {{this.$store.state.stateValue}}
      <button @click="update">修改state的值</button>
      <hr>
      <input v-model="stateValue"/>  {{ stateValue }}
  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
import { mapState ,mapGetters} from 'vuex'
export default {
  name: 'store',
  data () {
    return {
      inputValue: ''
    }
  },
  components: {
    AInput,
      AShow
  },//计算属性
    computed:{
        ...mapState({
            appName:state=>state.appName , /*还可以存放一个对象*/
            appName2:state=>state.user.appName2  /*还可以存放一个对象*/
        }),
       ...mapGetters('user',[
            'appNameWithVersion2'
        ]),
        stateValue: {
            get () {
                return this.$store.state.stateValue
            },
            set (val) {
                this.$store.commit('SET_STATE_VALUE',val)
            }
        },
    },
    methods:{
        handleInput(val){
            this.inputValue=val;
        },
        update(){
            this.$store.dispatch("updateAppName")
        }
    }
}
</script>
