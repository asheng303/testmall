export default {
  //mutations里面的每个方法，尽可能只做一件事情，如果不分开处理的话，之后就不好区分来验证错误
  //判断逻辑的东西可以放入actions
  addCounter(state, payload) {
    //这样修改是追踪的
    payload.count++
  },
  addToCart(state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  }
}