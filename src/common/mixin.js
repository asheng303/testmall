import { debounce } from "common/utils.js";
//下面使用了这个函数，记得要同时引入
export const itemListenerMixin = {
  //这里使用了mixin技术，基本上所有的vue内容都可以采用这个技术
  data() {
    return {
      ItemListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 800);
    this.ItemListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.ItemListener);
  }
}
//回到顶部封装
//生命周期里的函数可以在mixin和主函数写，之后会合并，但是methods里面不能合并
import backTop from "components/content/backTop/backTop";
export const backTopMixin = {
  components: {
    backTop
  },
  data() {
    return {
      isShoweBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    listenShowBackTop(position) {
      //判断返回按钮是否显示
      if (position.y < -1000) {
        //打印的时候就是一个负数，所以是小于-1000
        this.isShoweBackTop = true;
      } else {
        this.isShoweBackTop = false;
      }
    }
  },
}