export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      //数组常用的方法有哪些？
      // let oldProduct = null;
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item;
      //   }
      // }
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2.判断oldProduct
      if(oldProduct){
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve("当前的商品数量加一")
      }else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve("添加了新的商品")
      }
    })
  }
}