<template>
  <div>
    <!-- route 路由额外携带的food参数 ,必须使用props定义和接收-->
    {{food}}
  </div>
</template>
<script>
export default {
  props:{
      food:{
          type:String,
          default:"apple"
      }
  }
}
</script>
