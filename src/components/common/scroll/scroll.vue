<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 这里我们需要包装2层，1层是wrapper，另1层是bs里面必须是一个单独元素 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //创建对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
      //这里的属性是我们可以自己传入来设定的，因为有的地方需要实时监听，有的地方不需要实时监听 实时监听会影响性能，不需要用的时候就是不要打开
    });
    //这里用document.querySelector方法不能准确的拿到这个dom元素，我们需要绑定个ref
    //这里拿到的就一定是添加了ref的元素

    //监听滚动
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    //监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
      //我们这里会判断scroll实例是否创建了
    },
    finishPull() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      console.log("--------");
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style>
</style>