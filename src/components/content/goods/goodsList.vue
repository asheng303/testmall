<template>
  <div class="goods-list">
    <goodsListItem v-for="(item,index) in goods" :goodsItem="item" :key="index" />
  </div>
</template>

<script>
import goodsListItem from "./goodsListItem";
export default {
  name: "goodsList",
  components: {
    goodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>