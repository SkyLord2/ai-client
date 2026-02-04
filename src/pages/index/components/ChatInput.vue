<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'send', content: string): void
}>()

const inputValue = ref('')

function handleSend() {
  const content = inputValue.value.trim()
  if (!content)
    return

  emit('send', content)
  inputValue.value = ''
}

function handleKeydown(e: KeyboardEvent) {
  // PC端 Ctrl+Enter 发送
  // 注意：uniapp 中 input/textarea 事件对象可能不同，这里主要适配 H5/PC
  // #ifdef H5
  if (e.ctrlKey && e.key === 'Enter') {
    handleSend()
  }
  // #endif
}
</script>

<template>
  <view class="mx-auto max-w-4xl w-full p-4">
    <view class="relative border border-gray-200 rounded-xl bg-white shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30">
      <textarea
        v-model="inputValue"
        class="max-h-[150px] min-h-[50px] w-full resize-none bg-transparent p-4 pr-12 text-base text-gray-800 dark:text-gray-100 focus:outline-none placeholder-gray-400"
        placeholder="发送消息，Ctrl + Enter 发送"
        auto-height
        :maxlength="-1"
        @keydown.ctrl.enter="handleSend"
      />

      <!-- 发送按钮 -->
      <view class="absolute bottom-2 right-2">
        <button
          class="h-8 w-8 flex items-center justify-center rounded-lg transition-colors"
          :class="[
            inputValue.trim()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700',
          ]"
          :disabled="!inputValue.trim()"
          @click="handleSend"
        >
          <view class="i-carbon-send-alt-filled" />
        </button>
      </view>
    </view>

    <view class="mt-2 flex justify-center text-xs text-gray-400">
      <text>内容由 AI 生成，请仔细甄别</text>
    </view>
  </view>
</template>
