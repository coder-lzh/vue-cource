export default store => {
  console.log("init了。。。") //每次刷新都会走这一步
    //如果本地有state的值，就将本地的值替换现在的值  replaceState store提供的方法
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
  store.subscribe((mutation, state) => {
	  console.log("执行了mutation方法") //经测试，无论是action，还是mutation都会走这个方法。nb
    localStorage.state = JSON.stringify(state)
  })
}
