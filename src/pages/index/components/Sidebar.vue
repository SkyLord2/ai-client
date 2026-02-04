<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/store/chat'

const chatStore = useChatStore()
const { conversations, currentConversationId } = storeToRefs(chatStore)

function handleSelect(id: string) {
  chatStore.switchConversation(id)
}

function handleCreate() {
  chatStore.createConversation()
}
</script>

<template>
  <view class="sidebar h-full flex flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
    <!-- 新建会话按钮 -->
    <view class="p-4">
      <button
        class="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-white shadow-sm transition-colors hover:bg-blue-700"
        @click="handleCreate"
      >
        <view class="i-carbon-add text-lg" />
        <text class="text-sm font-medium">新建对话</text>
      </button>
    </view>

    <!-- 会话列表 -->
    <scroll-view scroll-y class="flex-1 px-2">
      <view class="pb-4 space-y-1">
        <view class="px-3 py-2 text-xs text-gray-500 font-medium">
          最近对话
        </view>

        <view
          v-for="conv in conversations"
          :key="conv.id"
          class="group relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition-all hover:bg-gray-200 dark:hover:bg-gray-800"
          :class="[currentConversationId === conv.id ? 'bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700' : 'border border-transparent']"
          @click="handleSelect(conv.id)"
        >
          <view class="i-carbon-chat text-gray-400 dark:text-gray-500 group-hover:text-gray-600" />
          <view class="min-w-0 flex-1">
            <view class="truncate text-sm text-gray-700 dark:text-gray-200">
              {{ conv.title }}
            </view>
            <view class="mt-0.5 truncate text-xs text-gray-400">
              {{ conv.lastMessage || '新对话' }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部用户信息/设置 -->
    <view class="border-t border-gray-200 p-4 dark:border-gray-800">
      <view class="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800">
        <view class="h-8 w-8 flex items-center justify-center rounded-full from-blue-500 to-purple-500 bg-gradient-to-tr text-xs text-white font-bold">
          U
        </view>
        <view class="min-w-0 flex-1">
          <view class="text-sm text-gray-700 font-medium dark:text-gray-200">
            User
          </view>
          <view class="text-xs text-gray-400">
            Pro Plan
          </view>
        </view>
        <view class="i-carbon-settings text-gray-400" />
      </view>
    </view>
  </view>
</template>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
