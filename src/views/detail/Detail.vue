<template>
  <div id="detail">
    <detailNavBar class="detail-nav" @titleClick="titleClick" ref="detailNav"></detailNavBar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 这里我们传入的是topImages是作为属性值，我们要用-连接，因为在html内属性值不区分大小写，就相当于topimages，就会传递失败 -->
      <detailSwiper :top-images="topImages"></detailSwiper>
      <detailBaseInfo :GoodsInfo="GoodsInfo"></detailBaseInfo>
      <detailShopInfo :ShopInfo="ShopInfo"></detailShopInfo>
      <detailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></detailGoodsInfo>
      <detailParamInfo :GoodsParam="GoodsParam" ref="params"></detailParamInfo>
      <detailCommentInfo :CommentInfo="CommentInfo" ref="comment"></detailCommentInfo>
      <goodsList :goods="rcommends" ref="recommend"></goodsList>
    </scroll>
    <backTop @click.native="backTop" v-show="isShoweBackTop"></backTop>
    <detailBottomBar @addCart="addCart"></detailBottomBar>
    <!-- <Toast :message="message" :show="show"></Toast> -->
  </div>
</template>

<script>
//导入子组件
import detailNavBar from "./components/detailNavBar";
import detailSwiper from "./components/detailSwiper";
import detailBaseInfo from "./components/detailBaseInfo";
import detailShopInfo from "./components/detailShopInfo";
import detailGoodsInfo from "./components/detailGoodsInfo";
import detailParamInfo from "./components/detailParamInfo";
import detailCommentInfo from "./components/detailCommentInfo";
import goodsList from "components/content/goods/goodsList";
import detailBottomBar from "./components/detailBottomBar";
//导入网络请求
import {
  getDetail,
  GoodsInfo,
  ShopInfo,
  GoodsParam,
  getrecommend
} from "network/detail";
//导入公共组件
import scroll from "components/common/scroll/scroll";
import { debounce } from "common/utils.js";
// import Toast from "components/common/toast/Toast";
//导入mixin文件
import { itemListenerMixin, backTopMixin } from "common/mixin.js";
export default {
  name: "detail",
  data() {
    return {
      iid: null,
      topImages: [],
      GoodsInfo: {},
      ShopInfo: {},
      detailInfo: {},
      GoodsParam: {},
      CommentInfo: {},
      rcommends: [],
      topYs: [],
      //第一个数是0，后面的是其他组件的offsettop
      //我们在mounted里面也拿不到这个全部的数据，因为图片加载比较慢
      currentIndex: null
      // message: "",
      // show: false
    };
  },
  //这里我们是引用mixin，通过引用之后我们在mixin里面写的代码就相当于直接复制过来使用了
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailGoodsInfo,
    detailParamInfo,
    detailCommentInfo,
    detailBottomBar,
    scroll,
    // Toast,
    goodsList
  },
  methods: {
    imageLoad() {
      //我们这里原来的函数就是添加了防抖参数，这里就只执行1次，提高性能
      this.$refs.scroll.scroll.refresh();
      this.topYs.push(0);
      this.topYs.push(this.$refs.params.$el.offsetTop);
      this.topYs.push(this.$refs.comment.$el.offsetTop);
      this.topYs.push(this.$refs.recommend.$el.offsetTop);
      //添加了一个js能表达的最大的数值，用于把这个数组变成一个4个区间，方便对比
      this.topYs.push(Number.MAX_VALUE);
    },
    //tab栏发出的事件
    titleClick(index) {
      //负值才是向下滚动
      this.$refs.scroll.scrollTo(0, -this.topYs[index], 100);
    },
    contentScroll(position) {
      //获取到滚动Y的值
      const positionY = -position.y;
      //和详情页面中获取的topYs进行对比
      //[0,params,comment,recommend]，在区间之内更改index值
      for (let i = 0; i < this.topYs.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.topYs[i] &&
          positionY < this.topYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNav.currentindex = this.currentIndex;
        }
      }
      //调用mixin里面的函数
      this.listenShowBackTop(position);
    },
    addCart() {
      //获取商品信息 只选择在购物车里面需要展示的数据
      const product = {};
      product.image = this.topImages[0];
      product.title = this.GoodsInfo.title;
      product.desc = this.GoodsInfo.desc;
      product.price = this.GoodsInfo.nowPrice;
      product.iid = this.iid;
      //要把这个数据传递给购物车组件，使用vuex全局数据共享，通过mutations来操作数据
      this.$store.dispatch("addCart", product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);  普通组件封装形式
        this.$Toast.show(res, 1500);
      });
    }
  },
  created() {
    //保存商品id
    this.iid = this.$route.params.iid;
    //根据iid获取详情数据
    getDetail(this.iid).then(res => {
      //获取顶部轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.GoodsInfo = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取商家信息数据
      this.ShopInfo = new ShopInfo(data.shopInfo);
      //获取商品详情数据
      this.detailInfo = data.detailInfo;
      //获取商品参数信息
      //可以看detail.js文件这里我们需要传入2个参数，并且通过传入的参数，我们重新构造了一个新的对象，用于传递，这样传递过去之后获取参数会更加方便
      this.GoodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        //表明评论不为空的情况
        this.CommentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getrecommend().then(res => {
      this.rcommends = res.data.list;
    });
  },
  updated() {
    //这里我们可以保证是一定是渲染完并且有值的时候，这样我们才能拿到组件的offsettop值 updated只要有数据更新就会执行
    //我们要每次都赋空值
    // this.topYs = [];
    //根据最新数据，dom已经被渲染，但是图片没有加载完，当前获取的offsetTop是不包含图片的
    // this.topYs.push(0);
    // this.topYs.push(this.$refs.params.$el.offsetTop);
    // this.topYs.push(this.$refs.comment.$el.offsetTop);
    // this.topYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.topYs);
    //一般情况下，拿到offsetTop值不对的情况，是图片加载的问题
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.detailItemListener);
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.backtop {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
</style>
