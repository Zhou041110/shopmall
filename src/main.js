import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 引入 Vant UI
import Vant from 'vant'
import 'vant/lib/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(Vant) // 注册 Vant
app.use(ElementPlus) // 注册 Element Plus

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
