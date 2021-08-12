export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //判断之前商品是不是之前添加过 使用数组的find方法
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //如果这个东西
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('商品数量+1')
      } else {
        context.commit('addToCart', payload)
        resolve('添加新商品')
      }
    })

  }
}