<!-- 면접 리포트(탭 부분과 헤더 정도) : 면접 탭 부분 + 제목 -->
<template>
    <div class="ml-44 mr-44 text-left mb-4 mt-24">
      <div class="flex flex-col w-full p-7 bg-[#F4F6FA] border border-white rounded-3xl">
        <!-- 맨 윗줄 -->
        <div class="ml-4 mr-4 10 flex h-10 justify-between">
          <!-- 탭 버튼 -->
          <div class="w-1/3">
            <button
              @click="selected = 0"
              :class="[
                'px-6 h-10 font-semibold border items-center justify-center transition-all rounded-none rounded-l-xl',
                selected === 0
                  ? 'bg-btnBlue text-white border-btnBlue'
                  : 'bg-white border-[#D1D1D1] hover:bg-hover hover:text-white active:bg-pressed'
              ]"
            >
              면접 분석
            </button>
            <button
              @click="selected = 1"
              :class="[
                'px-6 h-10 font-semibold border items-center justify-center transition-all rounded-none rounded-r-xl',
                selected === 1
                  ? 'bg-btnBlue text-white border-btnBlue'
                  : 'bg-white border-[#D1D1D1] hover:bg-hover hover:text-white active:bg-pressed'
              ]"
            >
              면접 내용 기록
            </button>
          </div>

          <div class="flex h-10 gap-x-3 justify-end w-3/5">
            <!-- <div class="flex items-center px-6 w-1/2 bg-white border border-[#D1D1D1] rounded-xl"> -->
              <!-- <input
                v-model="search"
                type="text"
                placeholder="검색어를 입력하세요."
                class="flex-1 h-10 bg-transparent outline-none text-sm text-[#535353]"
                @input="handleSearch"
              /> -->
            <!-- </div> -->
             <!-- 여기 수정 -> 보관함에 넣기 -->
            <button class="flex h-10 px-6 bg-white font-semibold text-btnBlue items-center border border-btnBlue rounded-xl hover:bg-hover2_bg hover:text-hover2_txt active:text-white active:bg-pressed">
              보관함에 저장
            </button>
          </div>
        </div>

        <!-- 본문 -->
        <div class="ml-4 mr-4 mt-6 rounded-b-xl">
          <!-- 본문의 맨 윗줄 -->
          <div class="flex justify-start mb-10"> <!-- justify-between -->
            <span class="text-3xl font-bold">{{ item?.companyName }} {{ item?.jobTitle }}</span>
            <!-- <span>면접 날짜/시간 : {{ interviewSession?.started_at }}  /  {{  }}</span> -->
          </div>
          <div v-if="item">
            <InterviewAnalysis v-if="selected === 0" :sessionId="sessionId" :applicationId="applicationId"/> 
            <InterviewRecord v-else :sessionId="sessionId" :applicationId="applicationId"/>
          </div>
        </div>
      </div>
    </div>
    
  </template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { allItems, interview_sessions, interview_summary } from '@/data/dummyData'
import { useRoute } from 'vue-router'
import InterviewAnalysis from './InterviewAnalysis.vue';
import InterviewRecord from './InterviewRecord.vue';
import env from '@/api/env'
import { useUserStore } from '@/stores/user'

const selected = ref(0) 
const route = useRoute()
const sessionId = route.params.id // 면접 세션 ID
const applicationId = route.params.applicationId // 공고 ID
const userStore = useUserStore()
const interview = ref([]) // 면접 세션
const item = ref([]) // 공고



// const interviewSession = computed(() => interview_sessions.find(i => i.id === sessionId)) // 면접 세션
// const item = computed(() => { // 공고
//   const itemId = interviewSession.value?.application_id
//   return allItems.find(i => i.id === itemId)
// })
// const interviewSum = computed(() => { // 면접 요약
//   return interview_summary.find(i => i.session_id === sessionId)
// })

// console.log(sessionId)



async function fetchInterview() { // 면접 세션 정보 가져오기
  try {
    const response = await env.get(`/api/interview/${sessionId}/detail`, {
      params: {
        sessionId: sessionId,
        userId: parseInt(userStore.userId)
      }
    })
    interview.value = response.data.result

  } catch (err) {
    console.error('데이터 불러오기 실패:', err)
  }
}
onMounted(fetchInterview);

async function fetchApp() { // 공고 가져오기 
    try {
        const response = await env.get(`/api/application/${applicationId}`, {
            params: {
                userId: parseInt(userStore.userId),
                applicationId : applicationId
            }
        });
        item.value = response.data.result;
    } catch (err) {
        console.error('공고 상세 조회 실패:', err)
    }
}
onMounted(fetchApp);

</script>