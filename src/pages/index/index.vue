<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useChatStore } from '@/store/chat'
import ChatInput from './components/ChatInput.vue'
import ChatMessage from './components/ChatMessage.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import Sidebar from './components/Sidebar.vue'

defineOptions({
  name: 'Home',
})
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'AI Chat',
  },
})

const chatStore = useChatStore()
const { messages, currentConversationId, isLoading } = storeToRefs(chatStore)
const paging = ref<any>(null)

// 侧边栏控制 (移动端)
const showSidebar = ref(false)
const showSettings = ref(false)

// 监听发送
function handleSend(content: string) {
  chatStore.sendMessage(content)
  // 滚动到底部
  setTimeout(() => {
    paging.value?.scrollToBottom()
  }, 100)
}

// 切换深色模式 (模拟)
const isDark = ref(false)
function toggleTheme() {
  isDark.value = !isDark.value
  // 这里应该调用 uni 相关的 API 或 document 设置 class
  // 简单模拟:
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
  else {
    document.documentElement.classList.remove('dark')
  }
}

// z-paging 数据加载 (此处直接使用 store 数据，仅利用 z-paging 的滚动和键盘处理)
function queryList(pageNo: number, pageSize: number) {
  // 实际项目中这里应该从服务器加载历史记录
  // 这里直接告诉 z-paging 加载成功，数据由 store 管理
  paging.value?.complete([])
}
</script>

<template>
  <view class="h-screen w-screen flex overflow-hidden bg-white text-gray-800 transition-colors dark:bg-gray-900 dark:text-gray-100">
    <!-- 左侧侧边栏 (桌面端可见) -->
    <view class="hidden h-full w-64 flex-shrink-0 md:block">
      <Sidebar />
    </view>

    <!-- 移动端侧边栏抽屉 (简单模拟) -->
    <view
      v-if="showSidebar"
      class="fixed inset-0 z-50 bg-black/50 md:hidden"
      @click="showSidebar = false"
    >
      <view class="h-full w-64 bg-white dark:bg-gray-900" @click.stop>
        <Sidebar />
      </view>
    </view>

    <!-- 中间聊天主区域 -->
    <view class="relative min-w-0 flex flex-1 flex-col">
      <!-- 顶部导航 (移动端/桌面端通用) -->
      <view class="z-10 h-14 flex items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
        <view class="flex items-center gap-3">
          <!-- 移动端菜单按钮 -->
          <button class="p-2 text-gray-500 -ml-2 md:hidden" @click="showSidebar = true">
            <view class="i-carbon-menu text-xl" />
          </button>
          <text class="text-lg font-bold">Gemini Pro</text>
          <view class="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            Beta
          </view>
        </view>

        <view class="flex items-center gap-2">
          <button class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" @click="toggleTheme">
            <view :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" class="text-lg" />
          </button>
          <button class="rounded-lg p-2 text-gray-500 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800" @click="showSettings = !showSettings">
            <view class="i-carbon-settings text-lg" />
          </button>
        </view>
      </view>

      <!-- 消息列表区域 -->
      <view class="relative flex-1">
        <z-paging
          ref="paging"
          v-model="messages"
          use-chat-record-mode
          safe-area-inset-bottom
          bottom-bg-color="#f9fafb"
          :auto-clean-list-when-reload="false"
          :style="{ height: '100%' }"
          @query="queryList"
        >
          <!-- 顶部加载更多提示 -->
          <template #top>
            <view class="h-4" />
          </template>

          <view class="pb-4">
            <ChatMessage
              v-for="msg in messages"
              :key="msg.id"
              :message="msg"
            />

            <!-- AI 正在思考 Loading -->
            <view v-if="isLoading" class="flex gap-4 px-4 py-4 md:px-6">
              <view class="h-8 w-8 flex items-center justify-center border border-gray-100 rounded-full bg-white shadow-sm md:h-10 md:w-10 dark:border-gray-600 dark:bg-gray-700">
                <view class="i-carbon-bot text-lg text-blue-600" />
              </view>
              <view class="flex items-center gap-1 border border-gray-100 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <view class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 0s" />
                <view class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 0.2s" />
                <view class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 0.4s" />
              </view>
            </view>
          </view>

          <!-- 底部输入框插槽 -->
          <template #bottom>
            <ChatInput @send="handleSend" />
          </template>
        </z-paging>
      </view>
    </view>

    <!-- 右侧功能面板 (大屏可见) -->
    <view class="hidden h-full w-72 flex-shrink-0 lg:block">
      <SettingsPanel />
    </view>

    <!-- 移动端设置抽屉 -->
    <view
      v-if="showSettings"
      class="fixed inset-0 z-50 bg-black/50 lg:hidden"
      @click="showSettings = false"
    >
      <view class="absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-900" @click.stop>
        <SettingsPanel />
      </view>
    </view>
  </view>
</template>

<style>
/* 确保页面高度占满 */
page {
  height: 100%;
  overflow: hidden;
}
</style>
