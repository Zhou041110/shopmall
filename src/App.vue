<template>
  <div class="app-container">
    <HeaderNav :title="pageTitle" />
    <div class="main-content">
      <router-view></router-view>
    </div>
    <FooterNav />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import HeaderNav from './components/common/HeaderNav.vue'
import FooterNav from './components/common/FooterNav.vue'

const route = useRoute()
const pageTitle = ref('首页')

// 根据路由更新页面标题
watch(() => route.path, (newPath) => {
  switch(newPath) {
    case '/':
      pageTitle.value = '首页'
      break
    case '/category':
      pageTitle.value = '分类'
      break
    case '/cart':
      pageTitle.value = '购物车'
      break
    case '/profile':
      pageTitle.value = '我的'
      break
    case (newPath.match(/\/product\/\d+/) || {}).input:
      pageTitle.value = '商品详情'
      break
    default:
      pageTitle.value = '首页'
  }
})
</script>

<style>
.app-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  padding-top: 50px;
  padding-bottom: 55px;
}
</style>
