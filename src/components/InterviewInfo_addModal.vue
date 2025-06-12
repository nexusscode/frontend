<template>
  <div class="fixed top-80 inset-0 z-40 flex items-center justify-center bg-gray-200/50">
    <div class="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl text-start">
      <h2 class="text-xl font-semibold mb-4">실제 면접 기록하기</h2>

      <div class="space-y-4">
        <!-- 회사 이름 -->
        <div>
          <label class="block text-sm font-medium mb-1">회사 이름</label>
          <input
            @input = "inputCompany"
            type="text"
            class="w-full border rounded px-3 py-2"
            placeholder="예: 카카오"
          />
        </div>

        <!-- 직무 -->
        <div>
          <label class="block text-sm font-medium mb-1">직무</label>
          <input
            @input="inputPosition"
            type="text"
            class="w-full border rounded px-3 py-2"
            placeholder="예: 백엔드 개발자"
          />
        </div>

        <!-- 면접 날짜 -->
        <div>
          <label class="block text-sm font-medium mb-1">면접 날짜</label>
          <input
            v-model="form.date"
            type="date"
            class="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <!-- 버튼 -->
      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="onCancel"
          class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          취소
        </button>
        <button
          @click="onSubmit"
          class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const emit = defineEmits(['close'])

const form = reactive({
  company: '',
  position: '',
  date: ''
})

const inputCompany = (event) => {
    form.company = event.target.value
}

const inputPosition = (event) => {
    form.position = event.target.value
}

const onCancel = () => {
  emit('close')
}

const onSubmit = () => {
  if (!form.company || !form.position || !form.date) {
    alert('모든 항목을 입력해주세요.')
    return
  }

  user.backupForm(form)
  router.push('/interviewinfo')
  emit('close')
}
</script>
