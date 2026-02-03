<script setup lang="ts">
// 引入必要的 Vue 组合式 API
import { reactive, ref } from 'vue'

// 定义页面元数据，设置导航栏标题
definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '用户登录',
    navigationStyle: 'custom', // 使用自定义导航栏以实现全屏设计
  },
})

// 表单数据接口定义
interface FormData {
  username: string
  password: string
  rememberMe: boolean
}

// 表单错误信息接口定义
interface FormErrors {
  username?: string
  password?: string
}

// 响应式表单数据
const formData = reactive<FormData>({
  username: '',
  password: '',
  rememberMe: false,
})

// 响应式错误信息
const errors = reactive<FormErrors>({})

// 密码可见性状态
const showPassword = ref(false)

/**
 * 切换密码显示/隐藏状态
 */
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

/**
 * 表单验证函数
 * @returns {boolean} 验证是否通过
 */
function validateForm(): boolean {
  // 重置错误信息
  errors.username = ''
  errors.password = ''
  let isValid = true

  // 验证用户名
  if (!formData.username.trim()) {
    errors.username = '请输入用户名'
    isValid = false
  }

  // 验证密码
  if (!formData.password) {
    errors.password = '请输入密码'
    isValid = false
  }
  else if (formData.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    isValid = false
  }

  return isValid
}

/**
 * 处理登录按钮点击事件
 */
function handleLogin() {
  // 执行表单验证
  if (!validateForm()) {
    return
  }

  // 模拟登录请求
  uni.showLoading({
    title: '登录中...',
  })

  setTimeout(() => {
    uni.hideLoading()
    // 模拟登录成功
    uni.showToast({
      title: '登录成功',
      icon: 'success',
    })
    console.log('Login data:', formData)

    // TODO: 登录成功后的跳转逻辑
    // uni.switchTab({ url: '/pages/index/index' })
  }, 1500)
}

/**
 * 处理忘记密码点击
 */
function handleForgotPassword() {
  uni.showToast({
    title: '点击了忘记密码',
    icon: 'none',
  })
}

/**
 * 切换语言（仅UI演示）
 */
function switchLanguage() {
  uni.showToast({
    title: 'Switch Language',
    icon: 'none',
  })
}

/**
 * 其他登录方式点击处理
 * @param method 登录方式
 */
function handleOtherLogin(method: string) {
  uni.showToast({
    title: `选择登录方式: ${method}`,
    icon: 'none',
  })
}
</script>

<template>
  <!-- 页面主容器：全屏，Flex布局 -->
  <view class="min-h-screen w-full flex bg-gray-50">
    <!-- 左侧插画区域：在大屏幕（md及以上）显示，小屏幕隐藏 -->
    <!-- 使用 bg-primary 设置主色调背景 -->
    <view class="relative hidden flex-1 flex-col items-center justify-center overflow-hidden bg-blue-600 p-10 text-white md:flex">
      <!-- 装饰性背景圆 -->
      <view class="absolute h-80 w-80 rounded-full bg-white/10 blur-3xl -left-20 -top-20" />
      <view class="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <!-- 插画容器 -->
      <view class="relative z-10 max-w-lg text-center">
        <!-- 这里使用一个简单的插画占位，实际项目中应替换为 SVG 或 Image -->
        <view class="i-carbon-dashboard mx-auto mb-8 text-9xl opacity-90" />
        <view class="mb-4 text-4xl font-bold">
          数字化管理平台
        </view>
        <view class="text-lg opacity-80">
          本平台为互联网非涉密平台，严禁处理、传输国家秘密
        </view>
      </view>

      <!-- 底部波浪装饰 -->
      <view class="absolute bottom-0 left-0 right-0 h-20 origin-bottom-left skew-y-3 transform bg-white/5" />
    </view>

    <!-- 右侧登录表单区域 -->
    <view class="relative flex flex-1 flex-col bg-white">
      <!-- 顶部右上角：语言切换 -->
      <view class="absolute right-6 top-6 flex cursor-pointer items-center gap-2 text-gray-500 hover:text-primary" @click="switchLanguage">
        <text class="text-sm">中文 / English</text>
      </view>

      <!-- 表单垂直居中容器 -->
      <view class="flex flex-1 flex-col items-center justify-center p-8 lg:p-24 sm:p-12">
        <view class="max-w-md w-full space-y-8">
          <!-- 标题区域 -->
          <view class="text-center">
            <view class="mx-auto mb-4 h-20 w-20 flex items-center justify-center rounded-full bg-blue-100">
              <view class="i-carbon-user-avatar-filled-alt text-5xl text-blue-600" />
            </view>
            <h2 class="text-3xl text-gray-900 font-bold tracking-tight">
              用户登录
            </h2>
            <text class="mt-2 block text-sm text-gray-500">欢迎回来，请登录您的账号</text>
          </view>

          <!-- 登录表单 -->
          <view class="mt-8 space-y-6">
            <!-- 用户名输入框 -->
            <view class="space-y-1">
              <label for="username" class="block text-sm text-gray-700 font-medium">用户名</label>
              <view
                class="relative flex items-center rounded-md px-3 py-3 shadow-sm ring-1 ring-gray-300 ring-inset focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-inset"
                :class="{ 'ring-red-500 focus-within:ring-red-500': errors.username }"
              >
                <view class="pointer-events-none mr-2 flex items-center">
                  <view class="i-carbon-user text-lg text-gray-400" />
                </view>
                <input
                  id="username"
                  v-model="formData.username"
                  type="text"
                  class="block w-full flex-1 border-0 bg-transparent p-0 text-gray-900 sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:outline-none"
                  placeholder="请输入用户名/手机号"
                >
              </view>
              <!-- 错误提示 -->
              <text v-if="errors.username" class="mt-1 text-xs text-red-500">{{ errors.username }}</text>
            </view>

            <!-- 密码输入框 -->
            <view class="space-y-1">
              <label for="password" class="block text-sm text-gray-700 font-medium">密码</label>
              <view
                class="relative flex items-center rounded-md px-3 py-3 shadow-sm ring-1 ring-gray-300 ring-inset focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-inset"
                :class="{ 'ring-red-500 focus-within:ring-red-500': errors.password }"
              >
                <view class="pointer-events-none mr-2 flex items-center">
                  <view class="i-carbon-password text-lg text-gray-400" />
                </view>
                <input
                  id="password"
                  v-model="formData.password"
                  type="text"
                  :password="!showPassword"
                  class="block w-full flex-1 border-0 bg-transparent p-0 text-gray-900 sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:outline-none"
                  placeholder="请输入密码"
                >
                <!-- 密码显示切换按钮 -->
                <view class="ml-2 flex cursor-pointer items-center" @click="togglePasswordVisibility">
                  <view :class="showPassword ? 'i-carbon-view-off' : 'i-carbon-view'" class="text-lg text-gray-400" />
                </view>
              </view>
              <!-- 错误提示 -->
              <text v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password }}</text>
            </view>

            <!-- 记住我和忘记密码 -->
            <view class="flex items-center justify-between">
              <view class="flex items-center" @click="formData.rememberMe = !formData.rememberMe">
                <!-- 自定义复选框样式 -->
                <view
                  class="h-4 w-4 flex items-center justify-center border rounded transition-colors"
                  :class="formData.rememberMe ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'"
                >
                  <view v-if="formData.rememberMe" class="i-carbon-checkmark text-xs text-white" />
                </view>
                <label class="ml-2 block cursor-pointer select-none text-sm text-gray-900">记住我</label>
              </view>

              <view class="text-sm">
                <text class="cursor-pointer text-blue-600 font-medium hover:text-blue-500" @click="handleForgotPassword">忘记密码?</text>
              </view>
            </view>

            <!-- 登录按钮 -->
            <view>
              <button
                class="w-full flex justify-center rounded-md bg-blue-600 px-3 py-3 text-sm text-white font-semibold leading-6 shadow-sm transition-colors active:scale-[0.98] hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 focus-visible:outline"
                @click="handleLogin"
              >
                登录
              </button>
            </view>

            <!-- 其他功能链接 -->
            <view class="mt-4 flex justify-center">
              <text class="cursor-pointer text-sm text-blue-600 hover:text-blue-500">注册新账号</text>
            </view>
          </view>

          <!-- 其他登录方式分割线 -->
          <view class="mt-10">
            <view class="relative">
              <view class="absolute inset-0 flex items-center" aria-hidden="true">
                <view class="w-full border-t border-gray-300" />
              </view>
              <view class="relative flex justify-center">
                <text class="bg-white px-2 text-sm text-gray-500">选择登录方式</text>
              </view>
            </view>

            <!-- 社交登录图标 -->
            <view class="mt-6 flex justify-center gap-8">
              <view class="group flex flex-col cursor-pointer items-center gap-1" @click="handleOtherLogin('wechat')">
                <view class="h-10 w-10 flex items-center justify-center rounded-full bg-green-50 text-green-600 transition-colors group-hover:bg-green-100">
                  <view class="i-carbon-logo-wechat text-xl" />
                </view>
                <text class="text-xs text-gray-500">微信</text>
              </view>

              <view class="group flex flex-col cursor-pointer items-center gap-1" @click="handleOtherLogin('scan')">
                <view class="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  <view class="i-carbon-qr-code text-xl" />
                </view>
                <text class="text-xs text-gray-500">扫码</text>
              </view>

              <view class="group flex flex-col cursor-pointer items-center gap-1" @click="handleOtherLogin('otp')">
                <view class="h-10 w-10 flex items-center justify-center rounded-full bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-100">
                  <view class="i-carbon-password text-xl" />
                </view>
                <text class="text-xs text-gray-500">动态口令</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
/* 使用 UnoCSS，此处仅保留少量可能需要的自定义样式 */
/* 如果需要针对 input 的 placeholder 修改颜色，可以使用 UnoCSS 的 placeholder:text-gray-400 */
</style>
