<template>
  <Swiper class="detail-swiper">
    <SwiperItem v-for="(item,index) in topImages" :key="index">
      <img :src="item" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "detailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style>
.detail-swiper {
  overflow: hidden;
  height: 350px;
}
</style>