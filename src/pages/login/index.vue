<script setup lang="ts">
// 引入必要的 Vue 组合式 API
import { reactive, ref } from 'vue'
import { useToast } from 'wot-design-uni'
import { useUserStore } from '@/store/user'

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
// 登录加载状态
const loading = ref(false)
// Toast 实例
const toast = useToast()
// User Store
const userStore = useUserStore()

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

  // 设置加载状态
  loading.value = true

  setTimeout(() => {
    loading.value = false

    // 模拟后端返回的用户信息
    const mockUser = {
      userId: 12345,
      username: formData.username,
      nickname: 'AI 体验官',
      avatar: '', // 使用默认头像
    }

    // 保存用户信息到全局 Store
    userStore.setUserInfo(mockUser)

    // 模拟登录成功
    toast.success('登录成功')

    // 登录成功后的跳转逻辑
    setTimeout(() => {
      // 跳转到首页 (TabBar 页面)
      uni.switchTab({
        url: '/pages/index/index',
        fail: (err) => {
          console.error('switchTab failed, trying redirectTo:', err)
          // 容错处理：如果不是 TabBar 页面，尝试使用 redirectTo
          uni.redirectTo({ url: '/pages/index/index' })
        },
      })
    }, 500)
  }, 1500)
}

/**
 * 处理忘记密码点击
 */
function handleForgotPassword() {
  toast.info('点击了忘记密码')
}

/**
 * 切换语言（仅UI演示）
 */
function switchLanguage() {
  toast.info('Switch Language')
}

/**
 * 其他登录方式点击处理
 * @param method 登录方式
 */
function handleOtherLogin(method: string) {
  toast.info(`选择登录方式: ${method}`)
}
</script>

<template>
  <!-- 页面主容器 -->
  <view class="login-container">
    <wd-toast />
    <!-- 左侧插画区域：在大屏幕（md及以上）显示，小屏幕隐藏 -->
    <view class="illustration-section">
      <!-- 装饰性背景圆 -->
      <view class="bg-circle-1" />
      <view class="bg-circle-2" />

      <!-- 插画容器 -->
      <view class="content-wrapper">
        <view class="i-carbon-dashboard icon-dashboard" />
        <view class="title">
          数字化管理平台
        </view>
        <view class="subtitle">
          本平台为互联网非涉密平台，严禁处理、传输国家秘密
        </view>
      </view>

      <!-- 底部波浪装饰 -->
      <view class="wave-decoration" />
    </view>

    <!-- 右侧登录表单区域 -->
    <view class="form-section">
      <!-- 顶部右上角：语言切换 -->
      <view class="language-switch" @click="switchLanguage">
        <text class="text-sm">
          中文 / English
        </text>
      </view>

      <!-- 表单垂直居中容器 -->
      <view class="form-wrapper">
        <view class="form-content">
          <!-- 标题区域 -->
          <view class="header-section">
            <view class="avatar-wrapper">
              <view class="i-carbon-user-avatar-filled-alt avatar-icon" />
            </view>
            <h2 class="form-title">
              用户登录
            </h2>
            <text class="form-subtitle">欢迎回来，请登录您的账号</text>
          </view>

          <!-- 登录表单 -->
          <view class="form-body">
            <!-- 用户名输入框 -->
            <view class="input-wrapper">
              <wd-input
                v-model="formData.username"
                label="用户名"
                label-width="80px"
                placeholder="请输入用户名/手机号"
                clearable
                :error-message="errors.username"
                use-prefix-slot
                no-border
              >
                <template #prefix>
                  <view class="i-carbon-user input-icon" />
                </template>
              </wd-input>
            </view>

            <!-- 密码输入框 -->
            <view class="input-wrapper">
              <wd-input
                v-model="formData.password"
                label="密码"
                label-width="80px"
                placeholder="请输入密码"
                show-password
                clearable
                :error-message="errors.password"
                use-prefix-slot
                no-border
              >
                <template #prefix>
                  <view class="i-carbon-password input-icon" />
                </template>
              </wd-input>
            </view>

            <!-- 记住我和忘记密码 -->
            <view class="form-actions">
              <view class="remember-me">
                <wd-checkbox v-model="formData.rememberMe">
                  记住我
                </wd-checkbox>
              </view>

              <view class="forgot-password">
                <text class="link-text" @click="handleForgotPassword">忘记密码?</text>
              </view>
            </view>

            <!-- 登录按钮 -->
            <view class="submit-btn-wrapper">
              <wd-button block size="large" :loading="loading" @click="handleLogin">
                登录
              </wd-button>
            </view>

            <!-- 注册链接 -->
            <view class="register-link">
              <text class="link-text">注册新账号</text>
            </view>
          </view>

          <!-- 其他登录方式分割线 -->
          <view class="divider-section">
            <wd-divider>选择登录方式</wd-divider>

            <!-- 社交登录图标 -->
            <view class="social-login">
              <view class="social-item group" @click="handleOtherLogin('wechat')">
                <view class="social-icon-bg social-icon-bg--wechat">
                  <view class="i-carbon-logo-wechat social-icon" />
                </view>
                <text class="social-text">微信</text>
              </view>

              <view class="social-item group" @click="handleOtherLogin('scan')">
                <view class="social-icon-bg social-icon-bg--scan">
                  <view class="i-carbon-qr-code social-icon" />
                </view>
                <text class="social-text">扫码</text>
              </view>

              <view class="social-item group" @click="handleOtherLogin('otp')">
                <view class="social-icon-bg social-icon-bg--otp">
                  <view class="i-carbon-password social-icon" />
                </view>
                <text class="social-text">动态口令</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-container {
  @apply min-h-screen w-full flex bg-gray-50;
}

.illustration-section {
  @apply relative hidden flex-1 flex-col items-center justify-center overflow-hidden bg-blue-600 p-10 text-white md:flex;

  .bg-circle-1 {
    @apply absolute h-80 w-80 rounded-full bg-white/10 blur-3xl -left-20 -top-20;
  }

  .bg-circle-2 {
    @apply absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl;
  }

  .content-wrapper {
    @apply relative z-10 max-w-lg text-center;

    .icon-dashboard {
      @apply mx-auto mb-8 text-9xl opacity-90;
    }

    .title {
      @apply mb-4 text-4xl font-bold;
    }

    .subtitle {
      @apply text-lg opacity-80;
    }
  }

  .wave-decoration {
    @apply absolute bottom-0 left-0 right-0 h-20 origin-bottom-left skew-y-3 transform bg-white/5;
  }
}

.form-section {
  @apply relative flex flex-1 flex-col bg-white;

  .language-switch {
    @apply absolute right-6 top-6 flex cursor-pointer items-center gap-2 text-gray-500 hover:text-primary;
  }

  .form-wrapper {
    @apply flex flex-1 flex-col items-center justify-center p-8 lg:p-24 sm:p-12;

    .form-content {
      @apply max-w-md w-full space-y-8;
    }
  }
}

.header-section {
  @apply text-center;

  .avatar-wrapper {
    @apply mx-auto mb-4 h-20 w-20 flex items-center justify-center rounded-full bg-blue-100;

    .avatar-icon {
      @apply text-5xl text-blue-600;
    }
  }

  .form-title {
    @apply text-3xl text-gray-900 font-bold tracking-tight;
  }

  .form-subtitle {
    @apply mt-2 block text-sm text-gray-500;
  }
}

.form-body {
  @apply mt-8 space-y-6;

  .input-icon {
    @apply text-lg text-gray-400 mr-2;
  }

  .form-actions {
    @apply flex items-center justify-between;

    .remember-me {
      @apply flex items-center;
    }

    .forgot-password {
      @apply text-sm;
    }
  }

  .submit-btn-wrapper {
    @apply mt-6;
  }

  .register-link {
    @apply mt-4 flex justify-center;
  }

  .link-text {
    @apply cursor-pointer text-sm text-blue-600 hover:text-blue-500 font-medium;
  }
}

.input-wrapper {
  /* 显式设置边框和背景，确保可见性 */
  border: 1px solid #9ca3af; /* gray-400 */
  border-radius: 0.5rem;
  background-color: #ffffff;
  @apply transition-colors overflow-hidden;

  &:focus-within {
    border-color: #3b82f6; /* blue-500 */
    @apply ring-2 ring-blue-100;
  }
}

.divider-section {
  @apply mt-10;

  .social-login {
    @apply mt-6 flex justify-center gap-8;

    .social-item {
      @apply flex flex-col cursor-pointer items-center gap-1;

      .social-icon-bg {
        @apply h-10 w-10 flex items-center justify-center rounded-full transition-colors;

        &--wechat {
          @apply bg-green-50 text-green-600 group-hover:bg-green-100;
        }

        &--scan {
          @apply bg-blue-50 text-blue-600 group-hover:bg-blue-100;
        }

        &--otp {
          @apply bg-purple-50 text-purple-600 group-hover:bg-purple-100;
        }
      }

      .social-icon {
        @apply text-xl;
      }

      .social-text {
        @apply text-xs text-gray-500;
      }
    }
  }
}
</style>
