<template>
  <div class="home-page">
    <!-- 轮播图容器 -->
  <!-- 修改后的轮播图容器 -->
    <swiper 
      v-if="swiperImages.length > 0" 
      :modules="[Autoplay]"
      :slides-per-view="1" 
      :space-between="10" 
      :loop="true"
      :autoplay="{ delay: 2000, disableOnInteraction: false }" 
      class="mySwiper"
    >
      <swiper-slide v-for="(image, index) in swiperImages" :key="index">
        <img :src="image" :alt="'Slide ' + (index + 1)">
      </swiper-slide>
    </swiper>

    <!-- 小图片容器 -->
    <div v-if="smallImages.length > 0" class="small-images">
      <div v-for="image in smallImages" :key="image.id" class="small-image" @click="$router.push(`/product/${image.id}`)">
        <img :src="image.src" :alt="image.alt" />
        <div class="small-image-info">
          <p class="small-image-text">{{ image.text }}</p>
          <!-- <p class="small-image-price">¥{{ image.price }}</p> -->
        </div>
      </div>
    </div>

    <!-- 分类选项卡 男装女装童装-->
    <div class="category-tabs">
      <button v-for="category in categories" :key="category.name" :class="{ active: selectedCategory === category.name }"
        @click="selectCategory(category.name)">
        {{ category.name }}
      </button>
    </div>

    <!-- 分类商品展示 -->
    <div class="category-images">
      <div class="image-grid">
        <div v-for="image in filteredCategoryImages" :key="image.id" class="image-item"
          @click="$router.push(`/product/${image.id}`)">
          <img :src="image.src" :alt="image.alt" />
          <div class="image-info">
            <p class="image-text">{{ image.text }}</p>
            <p class="image-price">¥{{ image.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/autoplay'

// 分类数据
const categories = [
  { name: '男装' },
  { name: '女装' },
  { name: '童装' }
]

const selectedCategory = ref('男装')
const swiperImages = ref([])
const smallImages = ref([])
const categoryImages = ref([])

// 选择分类
const selectCategory = (categoryName) => {
  selectedCategory.value = categoryName
}

// 获取数据
const fetchImages = async () => {
  try {
    const response = await fetch('/images.json')
    const data = await response.json()
    swiperImages.value = data.swiperImages || []
    smallImages.value = data.recommendproducts || []
    categoryImages.value = data.products || []
  } catch (error) {
    console.error('Error loading images:', error)
  }
}

onMounted(() => {
  fetchImages()
})

// 计算属性，根据选中的分类过滤商品
const filteredCategoryImages = computed(() => {
  return categoryImages.value.filter(image => image.kind === selectedCategory.value)
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #f5f5f5;
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

.small-images {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
  overflow-x: auto;
}

.small-image {
  width: 23%;
  min-width: 80px;
  margin: 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.small-image img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.small-image-info {
  padding: 5px;
  text-align: center;
}

.small-image-text {
  margin: 2px 0;
  font-size: 12px;
  color: #333;
}

.small-image-price {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 14px;
  margin: 2px 0;
}

.category-tabs {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: white;
  margin: 10px 0;
}

.category-tabs button {
  padding: 8px 20px;
  border: none;
  background: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
}

.category-tabs button.active {
  color: #4dd866;
  font-weight: bold;
  border-bottom: 2px solid #4dd866;
}

.category-images {
  padding: 10px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.image-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.image-info {
  padding: 10px;
  text-align: center;
}

.image-text {
  margin: 5px 0;
  font-size: 14px;
  color: #333;
}

.image-price {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 16px;
  margin: 5px 0;
}
</style>
