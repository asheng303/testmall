<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tabControl
      class="tabControl"
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
    ></tabControl>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <Swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></Swiper>
      <homeRecommendView :recommends="recommends"></homeRecommendView>
      <homeFeatureView></homeFeatureView>
      <tabControl ref="tabControl2" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tabControl>
      <goodsList :goods="showGoods"></goodsList>
    </scroll>
    <backTop @click.native="backTop" v-show="isShoweBackTop"></backTop>
  </div>
</template>

<script>
//导入自定函数方法
import { debounce } from "common/utils.js";
import { itemListenerMixin } from "common/mixin.js";
// 导入网络请求方法
import { getHomeMultidata, getHomeGoods } from "network/home";
// 导入子组件
import NavBar from "components/common/navbar/NavBar";
import Swiper from "./components/homeSwiper";
import homeRecommendView from "./components/homeRecommendView";
import homeFeatureView from "./components/homeFeatureView";
// 导入公共组件
import tabControl from "components/content/tabControl/tabControl";
import goodsList from "components/content/goods/goodsList";
import scroll from "components/common/scroll/scroll";
//导入mixin
import { backTopMixin } from "common/mixin.js";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        //设计好首页的数据模型
        //page保存当前第几页，list显示加载后的数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currenyType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  mixins: [backTopMixin],
  components: {
    NavBar,
    Swiper,
    homeRecommendView,
    homeFeatureView,
    tabControl,
    goodsList,
    scroll
  },
  computed: {
    showGoods() {
      return this.goods[this.currenyType].list;
    }
  },
  methods: {
    //事件监听相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currenyType = "pop";
          break;
        case 1:
          this.currenyType = "new";
          break;
        case 2:
          this.currenyType = "sell";
          break;
      }
      //让两个tab的index保持一致，两个中间点击任意一个就会联动切换了
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //决定tabControl是否吸顶 position：fixed 是否有这个属性
      this.isTabFixed = -position.y > this.tabOffsetTop;
      //调用mixin里面的函数
      this.listenShowBackTop(position);
    },
    loadMore() {
      this.getHomeGoods(this.currenyType);
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      //监听轮播图加载完成 我们只需要拿到1次的值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.recommends = res.data.recommend.list;
        this.banners = res.data.banner.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      //在原来的page加1，每次请求之后+1 就会自动请求后面的数据
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPull();
      });
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
    console.log("离开首页的y轴位置" + this.saveY);
    //取消全局事件监听
    this.$bus.$off("itemImageLoad", this.homeItemListener);
  },
  mounted() {
    //图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 800);
  }
};
</script>

<style scoped>
/* 添加了scoped表示只在此作用域有效 */
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  /* vh代表视口高度 viewport height 100vh就是100%的视口高度 */
}
.tabControl {
  position: relative;
  z-index: 9;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  /*浏览器原生滚动时，为了导航不跟随，我们这个时候使用的是bs，所以就没用了
   position: fixed !important;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9; */
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}

.backtop {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
</style>
