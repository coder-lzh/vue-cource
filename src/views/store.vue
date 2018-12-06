<template>
  <div>
      <!--子组件-->
   <a-input  @out="handleInput"/>
    <br>
    {{inputValue}}<br>
      <!--兄弟组件传值-->
      <a-show :content="inputValue"/>

  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
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
  },
    methods:{
        handleInput(val){
            this.inputValue=val;
        }
    }
}
</script>
