<template>
  <nav-bar class="nav-bar">
    <div slot="center" class="title">购物车({{cartLength}})</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";
export default {
  name: "cartNavBar",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(["cartLength"])
  }
};
</script>

<style>
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>