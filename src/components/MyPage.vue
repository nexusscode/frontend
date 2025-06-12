<template>
    <div name="main" class="h-[650px] relative px-16 py-6 mx-[180px] mt-28 rounded-t-2xl text-sm font-semibold bg-white/50">
      <button @click="isOpen=true" class="h-[20px] px-3 border border-gray-300 bg-white text-[9px]/4 font-bold rounded-sm absolute bottom-14 left-14">탈퇴하기</button>
      <div name="container" class="h-full flex flex-col justify-evenly items-center">
        <div name="first_layer" class="flex w-full">
          <div class="w-2/3 flex justify-between">
            <div class="w-1/6 mr-6 ">
              <div class="flex justify-center items-center size-[100px] border rounded-full text-5xl font-normal bg-[#d9d9d9]">{{ a }}</div>
            </div>
            <div class="w-5/6 flex flex-col text-start justify-around"> 
              <div class="flex items-center mb-1">
                <div class="text-lg font-bold">{{ userInfo.name }}님</div>
                <button @click="isOpenUpdate=true" class="px-2.5 py-0.5 border border-gray-300 mx-6 bg-white text-xs rounded-sm">수정</button>
                <MyPage_UpdateModal v-if = "isOpenUpdate" @close="isOpenUpdate = false"/>
              </div>
              <div class="flex items-center"><div class="w-1/6">희망분야</div><div class="w-1/5 pr-12">{{ userInfo.devType }}</div><div class="w-1/5">DISC 유형</div><button @click="handleAction1" class="w-auto text-btnBlue">{{ a }}유형 </button><button @click="handleAction3" class="text-black text-[11px] ml-8 underline">(재검사하기)</button></div>
              <div class="flex items-center"><div class="w-1/6">경력</div><div class="w-1/5 pr-12">{{ userInfo.experienceLevel }}</div><div class="w-1/5">개발자 성향</div><button @click="handleAction2" class="w-auto text-btnBlue">{{ devResult.devType }} </button><button @click="handleAction4" class="text-black text-[11px] ml-2 underline">(재검사하기)</button></div>
              <MyPage_NotSurveyModal v-if = isOpenSurvey @close="isOpenSurvey = false" />
            </div>
          </div>
          <div class="w-1/3 flex justify-end">
            <div class="w-3/4">
              <div class="mb-2 text-start">하루 검사 횟수</div>
              <div class="px-9 py-1.5 border-2 border-[#d9d9d9] self-end bg-white rounded-2xl text-sm/7"><div>AI 면접 검사 횟수&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ todayInterview }}번</div><div>AI 자소서 검사 횟수&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ todayResume }}번</div></div>
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
            <div class="w-1/3 px-2 py-3 bg-white rounded-2xl text-center">질문 의도 파악 미흡</div>    <!--추후수정/api---->
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
    import {ref, computed, onBeforeMount, onMounted} from 'vue'
    import { useRouter } from 'vue-router';
    import env from '@/api/env'
    import { useUserStore } from "@/stores/user";
    import MyPage_NotSurveyModal from './MyPage_NotSurveyModal.vue';

    const router = useRouter()
    const user = useUserStore()

    const isOpenUpdate = ref(false)
    const isOpenSurvey = ref(false)
    const userInfo = ref({
      name: ''
    })
    const discResult = ref({
      discType: '',
    })
    const a = ref('')
    const devResult = ref({
      devType: '',
    })
    const recentResume = ref({})
    const recentInterview = ref({})
    const feedbackCounts = ref({
      resumeAiCount: 0,
      interviewAiCount: 0,
      totalAiCount: 0,
    })
    const todayResume = ref(0)
    const todayInterview = ref(0)

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
      const requests = [
        env.get('/api/user'), // 항상 실행
        env.get('/api/application/resume/recent'),
        env.get('/api/interview/recent'),
        env.get('/api/user/feedback-count'),
        env.get('/api/survey/disc/result'),
        env.get('/api/survey/dev/result'),
        env.get(`/api/resume/feedback/remaining`)
      ];

  try {
    const results = await Promise.allSettled(requests);

    if (results[0].status === 'fulfilled') {
      userInfo.value = results[0].value.data.result;
    }

    if (results[1].status === 'fulfilled') {
      recentResume.value = results[1].value.data.result;
      recentResume.value.modifiedAt = changeDayFormat(recentResume.value.modifiedAt)
    } else {
      recentResume.value =  
      {
        applicationTitle: '자기소개서 AI피드백을 받아보세요.',
        modifiedAt: 'xxxx-xx-xx',
        resumeId: 0,
      }
    }

    if (results[2].status === 'fulfilled') {
      recentInterview.value = results[2].value.data.result;
      recentInterview.value.createdAt = changeDayFormat(recentInterview.value.createdAt);
    } else {
      recentInterview.value = {
        sessionId: 0,
        title: '모의면접 AI피드백을 받아보세요.',
        createdAt: 'xxxx-xx-xx'
      };
    }

    if (results[3].status === 'fulfilled') {
      feedbackCounts.value = results[3].value.data.result;
    }

    if (results[4].status === 'fulfilled') {
      discResult.value = results[4].value.data.result;
    } else if (results[4].reason?.response?.status === 404) {
      console.log('DISC 검사 없음')
    }

    if (results[5].status === 'fulfilled') {
      devResult.value = results[5].value.data.result;
    } else if (results[5].reason?.response?.status === 404) {
      console.log('개발자 검사 없음')
    }

    if (results[6].status === 'fulfilled') {
      todayResume.value = results[6].value.data.result
    }


    
    const str = discResult.value.discType
    a.value = str.at(-2)
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

    const handleAction1 = () => {
  if (discResult.value.discType == '') {
    isOpenSurvey.value = true // 모달 띄움
  } else {
    router.push('/surveyfirstresult') // 페이지 이동
  }
}
const handleAction2 = () => {
  if (discResult.value.discType == '') {
    isOpenSurvey.value = true // 모달 띄움
  } else {
    router.push('/devresult') // 페이지 이동
  }
}
const handleAction3 = () => {
  if (discResult.value.discType == '') {
    isOpenSurvey.value = true // 모달 띄움
  } else {
    router.push('/disctest') // 페이지 이동
  }
}
const handleAction4 = () => {
  if (discResult.value.discType == '') {
    isOpenSurvey.value = true // 모달 띄움
  } else {
    router.push('/devtest') // 페이지 이동
  }
}
  </script>
