<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  House, 
  Menu, 
  ShoppingCart, 
  User 
} from '@element-plus/icons-vue'

const router = useRouter()
const activeIndex = ref(0)

const navItems = [
  { name: '首页', icon: House, path: '/' },
  { name: '分类', icon: Menu, path: '/category' },
  { name: '购物车', icon: ShoppingCart, path: '/cart' },
  { name: '我的', icon: User, path: '/profile' }
]

const navigate = (path, index) => {
  activeIndex.value = index
  router.push(path)
}
</script>

<template>
  <div class="footer">
    <div 
      v-for="(item, index) in navItems" 
      :key="item.name"
      class="nav-item"
      :class="{ active: activeIndex === index }"
      @click="navigate(item.path, index)"
    >
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}

.nav-item span {
  font-size: 12px;
  margin-top: 3px;
}

.active {
  color: #4dd866;
}

.el-icon {
  font-size: 24px;
}
</style> 