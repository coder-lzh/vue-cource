<template>
  <div>
      <!--子组件-->
   <a-input  @input="handleInput"/>
    <br>
    {{inputValue}}<br>
    <a-input @input="handleInput2"  ref="header"/>
    {{inputValue}}
  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
export default {
  name: 'store',
  data () {
    return {
      inputValue: ''
    }
  },
  components: {
    AInput
  },
    methods:{
        handleInput(val){
            console.log(val)
            this.inputValue=val;
        },
        handleInput2(){
            console.log(this.$refs.header.value)
            this.inputValue=this.$refs.header.value;
        }
    }
}
</script>
