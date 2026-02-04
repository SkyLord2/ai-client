<script setup lang="ts">
// 模拟设置面板
</script>

<template>
  <view class="settings-panel h-full flex flex-col border-l border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
    <view class="mb-4 text-sm text-gray-800 font-bold dark:text-gray-100">
      模型设置
    </view>

    <view class="space-y-4">
      <view class="space-y-2">
        <view class="text-xs text-gray-500">
          模型选择
        </view>
        <view class="border border-gray-200 rounded-lg bg-gray-50 p-2 text-sm dark:border-gray-700 dark:bg-gray-800">
          Gemini-Pro
        </view>
      </view>

      <view class="space-y-2">
        <view class="text-xs text-gray-500">
          创意程度
        </view>
        <view class="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <view class="h-full w-2/3 bg-blue-600" />
        </view>
        <view class="flex justify-between text-xs text-gray-400">
          <text>严谨</text>
          <text>创意</text>
        </view>
      </view>
    </view>
  </view>
</template>
