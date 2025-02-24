import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; // 首页组件
import Shop from '../components/Shop.vue'; // 商城组件
import Cart from '../components/Cart.vue'; // 购物车组件
import Profile from '../components/Profile.vue'; // 我的组件


const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/cart', component: Cart },
  { path: '/profile', component: Profile },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../components/Product.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;


