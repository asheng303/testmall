<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          :class="{active:index===currentindex}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
//导入子组件
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "detailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentindex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.currentindex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 15px;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>