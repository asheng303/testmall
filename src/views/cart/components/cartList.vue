<template>
  <div>
    <cartListItem v-for="(item,index) in cartList" :key="index" :product="item"></cartListItem>
  </div>
</template>
<script>
import cartListItem from "./cartListItem";
import { mapGetters } from "vuex";

export default {
  name: "cartList",
  components: {
    cartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>

<style>

</style>