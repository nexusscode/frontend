<template>
    <div name="main" class="h-[650px] relative px-16 py-6 mx-[180px] mt-28 rounded-t-2xl text-sm font-semibold bg-white/50">
      <button @click="isOpen=true" class="h-[20px] px-3 border border-gray-300 bg-white text-[9px]/4 font-bold rounded-sm absolute bottom-14 left-14">탈퇴하기</button>
      <div name="container" class="h-full flex flex-col justify-evenly items-center">
        <div name="first_layer" class="flex w-full">
          <div class="w-2/3 flex justify-between">
            <div class="w-1/6 mr-6 ">
              <div class="flex justify-center items-center size-[100px] border rounded-full text-5xl font-normal bg-[#d9d9d9]">{{ discResult.discType }}</div>
            </div>
            <div class="w-5/6 flex flex-col text-start justify-around"> 
              <div class="flex items-center mb-1">
                <div class="text-lg font-bold">{{ userInfo.name }}님</div>
                <button @click="isOpenUpdate=true" class="px-2.5 py-0.5 border border-gray-300 mx-6 bg-white text-xs rounded-sm">수정</button>
                <MyPage_UpdateModal v-if = "isOpenUpdate" @close="isOpenUpdate = false"/>
              </div>
              <div class="flex items-center"><div class="w-1/6">희망분야</div><div class="w-1/5 pr-12">{{ userInfo.devType }}</div><div class="w-1/5">DISC 유형</div><router-link to="/discresult" class="w-auto text-btnBlue">{{ discResult.discType }}유형 </router-link><router-link to="/disctest" class="text-black text-[11px] ml-2 underline">(재검사하기)</router-link></div>
              <div class="flex items-center"><div class="w-1/6">경력</div><div class="w-1/5 pr-12">{{ userInfo.experienceLevel }}</div><div class="w-1/5">개발자 성향</div><router-link to="/devresult" class="w-auto text-btnBlue">{{ devResult.devType }} </router-link><router-link to="/devtest" class="text-black text-[11px] ml-2 underline">(재검사하기)</router-link></div>
            </div>
          </div>
          <div class="w-1/3 flex justify-end">
            <div class="w-3/4">
              <div class="mb-2 text-start">하루 검사 횟수</div>
              <div class="px-9 py-1.5 border-2 border-[#d9d9d9] self-end bg-white rounded-2xl text-sm/7"><div>AI 면접 검사 횟수&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp4번</div><div>AI 자소서 검사 횟수&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp8번</div></div>
            </div>
          </div>
        </div>
        <div name="second_layer" class="flex w-full text-start mt-4">
          <div class="w-1/2 mr-2">최근 검사한 자소서
            <div class="relative pr-2 pl-4 py-3 mt-2 bg-white rounded-lg text-xs shadow-[0_2px_4px_rgba(0,0,0,0.1)]">{{ recentResume.applicationTitle }} <span class="absolute top-50% right-4 font-normal">{{ recentResume.modifiedAt }}</span></div>     <!--추후 바인딩-->
          </div>
          <div class="w-1/2 ml-2">최근 검사한 면접
            <div class="relative pr-2 pl-4 py-3 mt-2 bg-white rounded-lg text-xs shadow-[0_2px_4px_rgba(0,0,0,0.1)]"> {{ recentInterview.title }} <span class="absolute top-50% right-4 font-normal">{{ recentInterview.createdAt }}</span></div>
          </div>
        </div>
        <div name="third_layer" class="w-full mt-4 text-start">자주 등장한 피드백 키워드
          <div class="flex justify-between w-full mt-2">
            <div class="w-1/3 px-2 py-3 bg-white rounded-2xl text-center">질문의 핵심을 잘못 짚음</div>    <!--추후수정/api---->
            <div class="w-1/3 px-2 py-3 mx-10 bg-white rounded-2xl text-center">중복 표현 사용</div>
            <div class="w-1/3 px-2 py-3 bg-white rounded-2xl text-center">질문의 핵심을 잘못 짚음</div>
          </div>
        </div>
        <div class="mt-36 self-end text-right text-lg/10 font-bold">
          지금까지 AI 자소서 검사를 총 
          <span class="bg-white p-2 ml-3 mr-1.5 border rounded-[9999px]">{{ feedbackCounts.resumeAiCount }}</span> 번 받았고 
          &nbsp&nbsp&nbspAi 면접 검사를 총
          <span class="bg-white p-2 ml-3 mr-1.5 border rounded-[9999px]">{{ feedbackCounts.interviewAiCount }}</span>번 받았습니다. <br>
          AI 분석을 <span class="text-btnBlue">{{ feedbackCounts.totalAiCount }}</span>번이나 진행했어요. 분명히 더 나아지고 있다는 증거죠!
        </div>
      </div>
      
    </div>
  </template>
  <script setup>
    import MyPage_UpdateModal from './MyPage_UpdateModal.vue'
    import {ref, reactive, onBeforeMount, onMounted} from 'vue'
    import env from '@/api/env'
    import { useUserStore } from "@/stores/user";

    const user = useUserStore()

    const isOpenUpdate = ref(false)
    const userInfo = reactive({})
    const discResult = reactive({

    })
    const devResult = reactive({})
    const recentResume = reactive({})
    const recentInterview = reactive({})
    const feedbackCounts = reactive({})

    function changeDayFormat(dayFormat){
      const isoString = dayFormat
      const date = new Date(isoString)

      const yyyy = date.getFullYear()
      const mm = String(date.getMonth() + 1).padStart(2, '0') // 0~11이므로 +1
      const dd = String(date.getDate()).padStart(2, '0')

      const formatted = `${yyyy}/${mm}/${dd}`
      return formatted
    }
    


    onMounted(async () => {

      const requests = []

      requests.push(env.get('/api/user')) // 항상 실행

      if (user.isDisced) {
        requests.push(env.get('/api/survey/disc/result'))
      }

      if (user.isDeved) {
        requests.push(env.get('/api/survey/dev/result'))
      }
      
      try {
    const res = await Promise.all(requests)

    Object.assign(userInfo, res[0].data.result)

    if (user.isDisced) {
         Object.assign(discResult, res[1].data.result)
      }

      if (user.isDeved) {
        Object.assign(devResult, res[2].data.result)
      }
  } catch (error) {
    console.error('데이터 로딩 에러:', error)
  }
})
/*
    onBeforeMount(async () => {
        try {
            
        } catch (err) {
            console.error('API 오류:', err)
        }
    })
    */
  </script>
