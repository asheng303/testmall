<template>
  <div class="bottom-bar">
    <div class="check-content">
      <checkButton class="check-button" v-model="isSelectAll" @click.native="checkClick"></checkButton>
      <span>全选</span>
    </div>
    <div class="total-price">合集：￥{{totalPrice}}</div>
    <div class="calcuate">去结算{{checkLength}}</div>
  </div>
</template>

<script>
import checkButton from "./checkButton";
export default {
  name: "cartBottomBar",
  components: {
    checkButton
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中的情况
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        //全部或者部分不选中
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
    }
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          //过滤器
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        //过滤器
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      //使用find方法，我们这里只要找到一个没有checked的就停止，这样性能好一点
      return !this.$store.state.cartList.find(item => !item.checked);
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  width: 80px;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.total-price {
  flex: 1;
}
.calcuate {
  width: 90px;
  background-color: red;
  color: #ffffff;
  text-align: center;
}
</style>