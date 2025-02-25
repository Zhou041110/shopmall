<template>
  <div class="profile-container">
    <!-- 已登录状态 -->
    <div v-if="isLoggedIn" class="user-info">
      <el-avatar :size="64" icon="UserFilled" />
      <h2>{{ currentUser.name }}</h2>
      <h2>{{ currentUser.text }}</h2>
      <h2>just call me</h2>
      <h2>{{ currentUser.phone }}</h2>
      <el-button type="danger" @click="handleLogout">退出登录</el-button>
    </div>

    <!-- 未登录状态 -->
    <div v-else class="login-register">
      <el-tabs v-model="activeTab" class="demo-tabs">
        <!-- 登录标签页 -->
        <el-tab-pane label="登录" name="login">
          <el-form 
            :model="loginForm" 
            :rules="rules"
            label-position="top"
          >
            <el-form-item label="用户名" prop="username">
              <el-input 
                v-model="loginForm.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
            
            <el-form-item label="密码" prop="password">
              <el-input 
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>

            <el-form-item>
              <el-button 
                type="primary" 
                @click="handleLogin"
                class="submit-btn"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 注册标签页 -->
        <el-tab-pane label="注册" name="register">
          <el-form 
            :model="registerForm"
            :rules="rules"
            label-position="top"
          >
            <el-form-item label="用户名" prop="username">
              <el-input 
                v-model="registerForm.username"
                placeholder="请输入用户名"
              />
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input 
                v-model="registerForm.password"
                type="password"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>

            <el-form-item label="确认密码">
              <el-input 
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                show-password
              />
            </el-form-item>

            <el-form-item>
              <el-button 
                type="primary" 
                @click="handleRegister"
                class="submit-btn"
              >
                注册
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('login')
const isLoggedIn = ref(false)
const currentUser = ref(null)

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 注册表单数据
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

// 登录方法
const handleLogin = async () => {
  try {
    const response = await fetch('/UserMsg.json')
    const data = await response.json()
    
    const user = data.userdata.find(
      user => user.name === loginForm.username && user.psw === loginForm.password
    )

    if (user) {
      isLoggedIn.value = true
      currentUser.value = user
      ElMessage({
        type: 'success',
        message: '登录成功'
      })
      // 可以将登录状态存储到 localStorage
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      ElMessage({
        type: 'error',
        message: '用户名或密码错误'
      })
    }
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage({
      type: 'error',
      message: '登录失败，请稍后重试'
    })
  }
}

// 注册方法
const handleRegister = () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage({
      type: 'error',
      message: '两次输入的密码不一致'
    })
    return
  }
  
  // 这里可以添加注册逻辑
  ElMessage({
    type: 'success',
    message: '注册成功'
  })
}

// 退出登录
const handleLogout = () => {
  isLoggedIn.value = false
  currentUser.value = null
  localStorage.removeItem('user')
  ElMessage({
    type: 'success',
    message: '已退出登录'
  })
}

// 检查是否已登录
const checkLoginStatus = () => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
    isLoggedIn.value = true
  }
}

// 在组件挂载时检查登录状态
checkLoginStatus()
</script>

<style scoped>
.profile-container {
  padding: 20px;
  min-height: calc(100vh - 110px);
  background-color: #f5f5f5;
}

.login-register {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.user-info {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.user-info h2 {
  margin: 15px 0;
  color: #333;
}

.submit-btn {
  width: 100%;
  margin-top: 10px;
}

:deep(.el-tabs__nav) {
  width: 100%;
  display: flex;
}

:deep(.el-tabs__item) {
  flex: 1;
  text-align: center;
}

:deep(.el-form-item__label) {
  font-weight: bold;
}
</style>
