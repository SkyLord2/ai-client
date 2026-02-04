import type { Conversation, Message } from '@/types/chat'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const conversations = ref<Conversation[]>([
    {
      id: '1',
      title: '新对话',
      lastMessage: '你好，我是 AI 助手',
      timestamp: Date.now(),
    },
  ])

  const currentConversationId = ref<string | null>('1')

  const messages = ref<Message[]>([
    {
      id: 'msg_1',
      role: 'ai',
      content: '你好！我是你的 AI 助手，有什么可以帮你的吗？',
      status: 'success',
      timestamp: Date.now(),
    },
  ])

  const isLoading = ref(false)
  // 接收消息
  const receiveMessage = (content: string) => {
    const aiMsg: Message = {
      id: `msg_${Date.now()}_ai`,
      role: 'ai',
      content,
      status: 'success',
      timestamp: Date.now(),
    }
    messages.value.push(aiMsg)
    isLoading.value = false
  }
  // 发送消息
  const sendMessage = async (content: string) => {
    if (!content.trim())
      return

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      status: 'sending',
      timestamp: Date.now(),
    }

    messages.value.push(userMsg)
    isLoading.value = true

    // 模拟 AI 回复
    setTimeout(() => {
      userMsg.status = 'success'
      receiveMessage(`我收到了你的消息：${content}`)
    }, 1000)
  }

  // 切换会话
  const switchConversation = (id: string) => {
    currentConversationId.value = id
    // 这里应该加载对应会话的消息，演示简单清空或模拟
    messages.value = [
      {
        id: `msg_${Date.now()}_ai`,
        role: 'ai',
        content: `已切换到会话 ${id}，请问有什么问题？`,
        status: 'success',
        timestamp: Date.now(),
      },
    ]
  }

  // 新建会话
  const createConversation = () => {
    const newId = `conv_${Date.now()}`
    const newConv: Conversation = {
      id: newId,
      title: '新对话',
      timestamp: Date.now(),
    }
    conversations.value.unshift(newConv)
    switchConversation(newId)
  }

  return {
    conversations,
    currentConversationId,
    messages,
    isLoading,
    sendMessage,
    switchConversation,
    createConversation,
  }
})
