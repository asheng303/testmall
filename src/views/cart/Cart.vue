<template>
  <div id="cart">
    <cartNavBar></cartNavBar>
    <scroll class="cart-list" ref="scroll">
      <cartList></cartList>
    </scroll>
    <cartBottomBar></cartBottomBar>
  </div>
</template>

<script>
import cartNavBar from "./components/cartNavBar";
import cartList from "./components/cartList";
import cartBottomBar from "./components/cartBottomBar";
//导入公共组件
import scroll from "components/common/scroll/scroll";
export default {
  name: "Cart",
  components: {
    cartNavBar,
    cartList,
    cartBottomBar,
    scroll
  },
  activated() {
    console.log("111");
    this.$refs.scroll.refresh();
    //进入购物车的时候就要刷新一次，重新计算可滚动的区域
  }
};
</script>

<style scoped>
#cart {
  position: relative;
  height: 100vh;
}

.cart-list {
  height: calc(100% - 44px - 49px - 40px);
  width: 100%;
  overflow: hidden;
}
</style>
