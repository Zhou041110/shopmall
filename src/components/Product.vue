<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElButton, ElMessage } from 'element-plus'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const router = useRouter()
const productId = route.params.id
const productInfo = ref(null)
const cartStore = useCartStore()

const fetchProductInfo = async () => {
  try {
    const response = await fetch('/images.json')
    const data = await response.json()
    // 从 smallImages 和 categoryImages 中查找商品
    const product = 
      data.smallImages.find(item => item.id === Number(productId)) ||
      data.categoryImages.find(item => item.id === Number(productId))
    
    if (product) {
      // 确保价格是数字类型
      productInfo.value = {
        ...product,
        price: Number(product.price)
      }
    } else {
      ElMessage.error('商品不存在')
      router.push('/')
    }
  } catch (error) {
    console.error('Error loading product:', error)
    ElMessage.error('加载商品信息失败')
  }
}

const addToCart = () => {
  if (productInfo.value) {
    cartStore.addToCart(productInfo.value)
    ElMessage({
      message: '已加入购物车',
      type: 'success',
    })
  }
}

const buyNow = () => {
  ElMessage({
    message: '前往付款',
    type: 'success',
  })
}

onMounted(() => {
  fetchProductInfo()
})
</script>
<template>
  <div class="product-container">
    <div class="product-detail" v-if="productInfo">
      <!-- 商品图片 -->
      <div class="product-image">
        <img :src="productInfo.src" :alt="productInfo.alt">
      </div>
      
      <!-- 商品信息 -->
      <div class="product-info">
        <h2 class="product-title">{{ productInfo.text }}</h2>
        <div class="price">¥{{ productInfo.price }}</div>
        <div class="product-desc">
          <p>商品描述：</p>
          <p>{{ productInfo.alt }}</p>
        </div>
      </div>
    </div>
    
    <!-- 商品操作按钮 -->
    <div class="action-buttons">
      <el-button 
        type="warning" 
        size="large" 
        @click="addToCart"
        class="action-button"
      >
        加入购物车
      </el-button>
      <el-button 
        type="danger" 
        size="large" 
        @click="buyNow"
        class="action-button"
      >
        直接购买
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.product-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  padding-bottom: 120px;
}

.product-detail {
  padding: 20px;
}

.product-image {
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}

.product-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.product-info {
  background: white;
  border-radius: 8px;
  padding: 15px;
}

.product-title {
  font-size: 20px;
  color: #333;
  margin: 0 0 10px 0;
}

.price {
  color: #ff6b6b;
  font-size: 24px;
  font-weight: bold;
  margin: 15px 0;
}

.product-desc {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.product-desc p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 5px 0;
}

.action-buttons {
  position: fixed;
  bottom: 55px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.action-button {
  flex: 1;
  margin: 0 5px !important;
  height: 40px !important;
}

:deep(.el-button) {
  font-size: 16px !important;
  font-weight: bold !important;
  border-radius: 20px !important;
}
</style>