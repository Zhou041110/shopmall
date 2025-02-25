<script setup>
import { ref } from 'vue';

// 假设 swiperImages 是从某个地方获取的图片数组
const swiperImages = ref([
  'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg',
  // 其他图片链接...
]);
</script>

<template>
  <div class="home-banner">
    <swiper
      v-if="swiperImages.length > 0"
      :slides-per-view="1"
      :space-between="10"
      :loop="true"
      :autoplay="{ delay: 1000 }"
      class="mySwiper"
    >
      <swiper-slide v-for="(image, index) in swiperImages" :key="index">
        <img :src="image" :alt="'Slide ' + (index + 1)">
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang='scss'>
.home-banner {
  width: 100%;
  margin: 0 auto;
  height: auto;
  position: relative;
  z-index: 98;
}

.mySwiper {
  width: 100%;
  height: 200px;
}

.mySwiper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

// 添加媒体查询以适应移动端
@media (max-width: 768px) {
  .home-banner {
    height: 300px;
  }
}
</style>