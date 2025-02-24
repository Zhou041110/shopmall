<script setup>
import { useCartStore } from '../stores/cartStore'
import { ElButton, ElInputNumber, ElEmpty } from 'element-plus'

const cartStore = useCartStore()

const updateQuantity = (productId, quantity) => {
  if (quantity < 1) return
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}
</script>

<template>
  <div class="cart-container">
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <el-empty description="购物车是空的" />
    </div>
    
    <div v-else class="cart-items">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <img :src="item.src" :alt="item.alt">
        <div class="item-info">
          <h3>{{ item.text }}</h3>
          <p class="price">¥{{ item.price }}</p>
        </div>
        <div class="item-actions">
          <el-input-number 
            v-model="item.quantity"
            :min="1"
            :max="99"
            @change="(value) => updateQuantity(item.id, value)"
          />
          <el-button 
            type="danger" 
            size="small"
            @click="removeItem(item.id)"
          >
            删除
          </el-button>
        </div>
      </div>
      
      <div class="cart-footer">
        <div class="total">
          总计: <span class="total-price">¥{{ cartStore.totalPrice }}</span>
        </div>
        <el-button type="danger" size="large">
          结算 ({{ cartStore.totalItems }}件)
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  padding: 20px;
  min-height: calc(100vh - 110px);
  background-color: #f5f5f5;
}

.cart-items {
  background: white;
  border-radius: 8px;
  padding: 10px;
}

.cart-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  flex: 1;
  padding: 0 15px;
}

.item-info h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.price {
  color: #ff6b6b;
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
}

.item-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.cart-footer {
  position: fixed;
  bottom: 55px;
  left: 0;
  right: 0;
  padding: 15px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.total {
  font-size: 16px;
}

.total-price {
  color: #ff6b6b;
  font-size: 20px;
  font-weight: bold;
}
</style> 