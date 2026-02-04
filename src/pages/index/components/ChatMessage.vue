<script setup lang="ts">
import type { Message } from '@/types/chat'
import { computed } from 'vue'

const props = defineProps<{
  message: Message
}>()

const isUser = computed(() => props.message.role === 'user')
</script>

<template>
  <view
    class="message-item w-full flex gap-4 p-4 transition-colors hover:bg-gray-50/50 md:p-6 dark:hover:bg-gray-800/30"
    :class="[isUser ? 'flex-row-reverse' : 'flex-row']"
  >
    <!-- 头像 -->
    <view
      class="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-full text-sm shadow-sm md:h-10 md:w-10"
      :class="[
        isUser
          ? 'bg-blue-600 text-white'
          : 'bg-white dark:bg-gray-700 text-blue-600 border border-gray-100 dark:border-gray-600',
      ]"
    >
      <view :class="isUser ? 'i-carbon-user' : 'i-carbon-bot'" class="text-lg" />
    </view>

    <!-- 消息内容 -->
    <view class="max-w-[85%] flex flex-col md:max-w-[75%]" :class="[isUser ? 'items-end' : 'items-start']">
      <!-- 名字与时间 -->
      <view class="mb-1 flex items-center gap-2 text-xs text-gray-400">
        <text class="font-medium">{{ isUser ? '你' : 'AI 助手' }}</text>
        <text>{{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</text>
      </view>

      <!-- 气泡 -->
      <view
        class="relative break-words rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm md:text-base"
        :class="[
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tl-sm',
        ]"
      >
        <text class="whitespace-pre-wrap">{{ message.content }}</text>

        <!-- 状态指示 -->
        <view v-if="message.status === 'sending'" class="absolute bottom-2 -left-6">
          <view class="i-carbon-circle-dash animate-spin text-gray-400" />
        </view>
        <view v-if="message.status === 'error'" class="absolute bottom-2 -left-6">
          <view class="i-carbon-warning-filled text-red-500" />
        </view>
      </view>
    </view>
  </view>
</template>
