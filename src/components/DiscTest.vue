<template>
  <div class="max-w-3xl mx-auto flex flex-col p-8 rounded-xl bg-white shadow">
    <!-- 제목 -->
    <h2 class="text-xl font-semibold mb-4 text-start">DISC 검사</h2>

    <!-- 진행 바 -->
     <div class="flex justify-between items-baseline">
    <div class="w-11/12 bg-gray-200 h-3 rounded-[4px] overflow-hidden mb-1">
        <div
            class="bg-blue-500/80 h-full transition-all duration-300"
            :style="{ width: progressBarWidth }"
            >
        </div>
    </div>
    <div class="text-right text-sm font-semibold mb-4" >
      {{ answeredCount }}/{{ totalQuestions }}
    </div>
    </div>

    <!-- 질문 리스트 -->
    <div class="divide-y">
    <div
      v-for="(question, qIdx) in currentPageQuestions"
      :key="qIdx"
      class="py-3 flex justify-between font-semibold text-xs items-center"
    >
      <!-- 질문 -->
      <p class="w-2/3 text-start">
        {{ (currentPage - 1) * questionsPerPage + qIdx + 1 }}. &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ question }}
      </p>

      <!-- 선택지 버튼 -->
      <div class="flex justify-end space-x-2 w-1/3">
        <button
          v-for="n in 4"
          :key="n"
          @click="selectAnswer(qIdx, n)"
          :class="[
            'w-6 h-5 flex items-center justify-center rounded-lg text-sm font-medium',
            answers[(currentPage - 1) * questionsPerPage + qIdx] === n
              ? 'bg-btnBlue/80 text-white'
              : 'text-gray-700'
          ]"
        >
          {{ n }}
        </button>
      </div>
    </div>
    </div>

    <!-- 페이지 이동 버튼 -->
    <div class="flex justify-center mt-6">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="h-[30px] text-blue-500 font-medium text-xs px-6 py-0.5 rounded-lg border border-blue-300 mr-2 hover:bg-blue-50 disabled:opacity-50"
      >
        ← 이전질문
      </button>
      <button
        v-if="currentPage < totalPages"
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class=" h-[30px] text-white text-xs bg-blue-500 px-6 py-0.5 rounded-lg ml-2 disabled:opacity-50"
      >
        다음질문 →
      </button>
      <!-- 마지막 페이지일 때만 검사완료 버튼 표시 -->
    <button
      v-else
      @click="answersPost"
      class="h-[30px] text-white text-xs bg-green-500 px-8 py-0.5 rounded-lg ml-2 hover:bg-green-600"
    >
    검사완료
    </button>
    </div>
  </div>
</template>

<script setup>
import { discQuestions } from '../data/discQuestions'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from "@/stores/user";
import env from '../api/env'

const router = useRouter()
// 질문 데이터 (예시)
const allQuestions = reactive([...discQuestions])

const questionsPerPage = 5
const totalQuestions = allQuestions.length
const totalPages = Math.ceil(totalQuestions / questionsPerPage)

const currentPage = ref(1)
const answers = ref(Array(totalQuestions).fill(null))
const answersList = ref([])

// 현재 페이지의 질문 리스트
const currentPageQuestions = computed(() =>
  allQuestions.slice(
    (currentPage.value - 1) * questionsPerPage,
    currentPage.value * questionsPerPage
  )
)

// 응답된 수
const answeredCount = computed(() => answers.value.filter((a) => a !== null).length)

// 진행 바 너비 계산
const progressBarWidth = computed(() => `${(answeredCount.value / totalQuestions) * 100}%`)

// 답변 선택 처리
function selectAnswer(questionIndexOnPage, value) {
  const absoluteIndex = (currentPage.value - 1) * questionsPerPage + questionIndexOnPage
  answers.value[absoluteIndex] = value
}

// 페이지 이동
function nextPage() {
  if (currentPage.value < totalPages) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function beforePost(){
  const arr = Array.from({ length: 20 }, (_, i) => ({
  questionNo: i + 1,
  score: answers.value[i]
}))
  answersList.value = arr
}

/* disc 검사 전송
const answersPost = async () => { 
        try {
            beforePost()
            await env.put('/api/survey/disc', answersList.value)
            router.push({ name: 'DiscResult' })
        } catch (error) {
            console.error('에러 발생:', error)
        }
    }
        */
</script>
