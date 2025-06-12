<!-- 면접 리포트(면접 분석 탭) : 면접 분석 내용 부분 -->
<template>
  <div>
    <!-- 총평 부분 -->
    <div 
        class="flex flex-col mb-12 gap-y-4 bg-white w-full py-10 px-8 rounded-2xl"
        style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);"
    >
        <span class="font-bold text-xl">AI 면접관의 총평</span>
        <span class="font-medium text-xl ">{{ interview?.overallAssessment }}</span>
    </div>
  
    <!-- 미완결 답변, 블라인드 위반 -->
    <div class="flex w-full mb-12 items-stretch justify-between items-start">
        <div class="w-1/2 py-1 flex gap-x-1 items-start">
            <span class="font-semibold text-xl items-start mr-4">미완결 답변</span>
            <div class="flex flex-1 flex-wrap gap-x-1 gap-y-1">
                <span class="inline-block px-2 font-medium rounded-lg bg-[#E5E5E5]">{{ interview?.notCompleteAnswer }}</span>
            </div>
        </div>
        <!-- 세로선 -->
        <div class="w-px bg-black self-stretch mr-4"></div>
        <div class="w-1/2 py-1 flex gap-x-1 items-start">
            <span class="font-semibold text-xl items-start ml-3 mr-5">블라인드 위반</span>
            <div class="flex flex-1 flex-wrap gap-x-1 gap-y-1">
                <span class="inline-block px-2 font-medium rounded-lg bg-[#E5E5E5]">{{ interview?.blindList }}</span>
            </div>
        </div>
    </div>

    <!-- 이전응시 비교 -->
    <div class="flex flex-col gap-y-4 w-full mb-12">
      <span class="font-semibold text-xl">이전응시 비교</span>
      <div class="flex bg-white w-full p-8 rounded-2xl">
        <span class="font-medium text-xl ">{{ interview?.comparisonWithPrevious }}</span> 
      </div> 
    </div>

     <!-- 답변 시간 -->
    <div class="flex flex-col gap-y-4 w-full mb-12">
      <span class="font-semibold text-xl">답변 시간</span>
      <div class="flex">
        <div class="flex bg-white w-3/4 h-96">
            <Line v-if="isChartReady" :data="chartData" :options="chartOptions" />
            <p v-else class="font-semibold text-center">그래프를 불러올 수 없습니다.</p>
        </div> 
        <div class="flex flex-col ml-12 text-xl w-1/3 mt-6">
            <div class="flex flex-col w-fit py-3 px-5 font-medium rounded-2xl text-white bg-[#A077FF]">
                답변 평균 시간
                <span class="mt-2">: {{ averageMinutes }}</span>
            </div>
            <div class="mt-8 w-full">
                <span class="block font-medium text-xl break-words whitespace-normal">
                    전체 질문에 대한 평균시간은 <br/>
                    {{ averageMinutes }}로 대부분의 답변들은 <br/>
                    평균시간보다 {{ ud }}니다.
                </span>
            </div>
        </div>    
      </div>
    </div>

    <!-- 어휘 및 문법 -->
    <div class="flex w-full mb-12 flex-col gap-y-4">
        <span class="font-semibold text-xl">어휘 및 문법</span>
        <div class="flex">
            <div class="flex flex-col bg-white w-fit p-8 rounded-2xl">
                <span class="flex font-semibold text-xl">어휘</span>
                <div
                    class="w-72 h-24 mx-16 mt-4 relative"
                    style="border-radius: 50%; background: radial-gradient(circle at center, rgba(104,198,249,0.4) 0%, rgba(169,231,240,0.4) 100%);"
                >
                    <span
                        v-for="(voca, index) in vocas"
                        :key="index"
                        class="absolute font-semibold text-xl"
                        :style="getPosition(index)"
                        >
                        {{ voca }}
                    </span>
                </div>
            </div>

            <div class="ml-12 flex items-center">
                <span class="font-semibold text-xl">
                {{ interview?.vocabularyEvaluation.repeatedWordsSummary }} <br/>
                
                </span>
            </div>
        </div>

    </div>

    <!-- 스타일 분석 -->
    <div class="flex flex-col gap-y-4 w-full mb-12">
        <span class="font-semibold text-xl">스타일 분석</span>
        <div class="flex flex-col gap-y-4 bg-white w-full p-8 rounded-2xl">
            <span class="font-semibold text-xl">업무 성향</span>
            <div class="flex flex-col gap-y-3 ml-3"> 
                <span class="font-medium text-xl">{{ interview?.workAttitude }}</span>

            </div>
        </div>
        <div class="flex flex-col gap-y-4 bg-white w-full p-8 rounded-2xl">
            <span class="font-semibold text-xl">개발자 스타일</span>
            <div class="flex flex-col gap-y-3 ml-3">
                <span class="font-medium text-xl">{{ interview?.developerStyle }}</span>
                
            
            </div>
        </div>
    </div>

    <!-- 강점과 약점 -->
    <div class="flex flex-col gap-y-4 w-full mb-6">
        <span class="font-semibold text-xl">강점 & 약점</span>
        <div class="flex flex-col gap-y-4 bg-white w-full p-8 rounded-2xl">
            <span class="font-semibold text-xl">강점</span>
            <div class="flex flex-col gap-y-3 ml-3"> 
                <span class="font-medium text-xl">{{ interview?.strengths }}</span>
            
            </div>
        </div>
        <div class="flex flex-col gap-y-4 bg-white w-full p-8 rounded-2xl">
            <span class="font-semibold text-xl">약점</span>
            <div class="flex flex-col gap-y-3 ml-3"> 
                <span class="font-medium text-xl">{{ interview?.weaknesses }}</span>
            
            </div>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { allItems, interview_sessions, interview_questions, interview_answers, interview_summary } from '@/data/dummyData'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import env from '@/api/env'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const props = defineProps({
  sessionId: String,
  applicationId: String
})
const interview = ref([]) // 면접 세션
const item = ref([]) // 공고

async function fetchInterview() { // 면접 세션 정보 가져오기
  try {
    const response = await env.get(`/api/interview/${props.sessionId}/detail`)
    interview.value = response.data.result
    seconds.value = response.data.result.questions.map(q => parseInt(q.second))
    totalSeconds.value = parseInt(interview.value.countSeconds)
    totalCount.value = parseInt(interview.value.totalCount)
    console.log("답변 초들 : " + seconds.value, "타입 확인:", seconds.value.map(s => typeof s))
    console.log("interview : " + interview.value.title) 
    console.log("totalSeconds : ", totalSeconds.value, "type:", typeof totalSeconds.value)
    console.log("totalCount : ", totalCount.value, "type:", typeof totalCount.value)
  } catch (err) {
    console.error('데이터 불러오기 실패:', err)
  }
  calculateAverageTime()
}
onMounted(fetchInterview);

async function fetchApp() { // 공고 가져오기 
    try {
        const response = await env.get(`/api/application/${props.applicationId}`);
        item.value = response.data.result;
        console.log("item : " + item.value.companyName)
    } catch (err) {
        console.error('공고 상세 조회 실패:', err)
    }
}
onMounted(fetchApp);


// 답변 관련 임시 데이터들 -> 나중에 수정
const seconds = ref([])
// const seconds = [60, 85, 160, 50, 35, 70, 25, 55, 60, 40]
const vocas = ['조금', '그리고', '그리고', '약간', '그러니까']

function getPosition(index) {
  switch (index) {
    case 0:
      return 'top: 20px; left: 20px; transform: translate(-50%, -50%);'
    case 1:
      return 'top: 20px; right: 20px; transform: translate(50%, -50%);'
    case 2:
      return 'top: 50%; left: 50%; transform: translate(-50%, -50%);'
    case 3:
      return 'bottom: 20px; left: 20px; transform: translate(-50%, 50%);'
    case 4:
      return 'bottom: 20px; right: 20px; transform: translate(50%, 50%);'
    default:
      return ''
  }s
}

const interviewSession = computed(() => interview_sessions.find(i => i.id === props.sessionId)) // 면접 세션
// const item = computed(() => { // 공고
//   const itemId = interviewSession.value?.application_id
//   return allItems.find(i => i.id === itemId)
// })
const interviewSum = computed(() => { // 면접 요약
  return interview_summary.find(i => i.session_id === props.sessionId)
})
const questions = computed(() => { // 질문들
  return interview_questions.filter(i => i.session_id === props.sessionId)
}) 
const answers = computed(() => { // 사용자의 답변들
  return interview_answers.filter(answer =>
    questions.value.some(question => question.id === answer.question_id)
  );
});
const Sessions = computed(() => { // 같은 공고의 면접 세션들
  return interview_sessions.filter(i => i.application_id === item.value.id)
}) // 이거 필요한가? -> 수정 필요?

// console.log("답변들 : " + answers.value[0].transcript)
// console.log("질문들 : " + questions.value[0].question_text)
// console.log("같은 공고의 면접 세션들 : " + Sessions.value[0].id)




// 답변 초를 분으로 변경
const minutes = seconds.value.map(sec =>  parseFloat((sec / 60).toFixed(1)))
// console.log(minutes)
// const totalSeconds = seconds.reduce((sum, sec) => sum + sec, 0); 
// const totalSeconds = interview.value.countSeconds
const totalSeconds = ref(1)
const totalCount = ref(1)
const avgSeconds = ref(0)
const avgMinutes = ref(0)
const avgRemainingSeconds = ref(0)
const averageMinutes = ref('')
// const avgSeconds = totalSeconds / seconds.length; // 평균 초
function calculateAverageTime() {
  avgSeconds.value = totalSeconds.value / totalCount.value; // 평균 초
  avgMinutes.value = Math.floor(avgSeconds.value / 60); // 평균 분
  avgRemainingSeconds.value = Math.round(avgSeconds.value % 60); // 평균_나머지 초

  averageMinutes.value = avgMinutes.value >= 1
    ? `${avgMinutes.value}분 ${avgRemainingSeconds.value}초`
    : `${avgRemainingSeconds.value}초`;

    console.log("averageMinutes : " + averageMinutes.value)
}
// const criteria = 1 // 판단 기준 
const ud = // 20초보다 작으면 낮다, 40초보다 크면 높다로 설정함
  avgSeconds.value < 20 ? '낮습' :
  avgSeconds.value > 40 ? '높습' :
  '비슷합';

// 그래프
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)


const isChartReady = ref(false)
const chartData = computed(() => {
  return {
  labels: Array.from({ length: totalCount }, (_, i) => i + 1),
  datasets: [
    {
      label: '',
      data: seconds.value,
      //answers.value.map(answer => new Number(answer.created_at)), // 수정 필요 -> 응답 시간 부분
      borderColor: 'rgba(80, 137, 252, 1)', // btnBlue
      backgroundColor: 'rgba(255, 255, 255, 1)',
      pointRadius: 0, 
    }
  ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 180,
      grid: {
        // color: 'black',
        // drawBorder: true,
        // borderColor: 'black',
      },
      ticks: {
        align: 'center',
        stepSize: 30,
        font: {
          size: 20,
          weight: '600',
        }
      },
    },
    x: {
      offset: true,
      grid: {
        drawOnChartArea: false,
        // drawBorder: true,
        // borderColor: 'black',
      },
      ticks: {
        align: 'center',
        font: {
          size: 20,
          weight: '600',
        }
      }
    }
  }
}
onMounted(() => {
  watchEffect(() => {
    if (totalCount.value > 0 && seconds.value.length > 0) {
      isChartReady.value = true
    }
  })
})

// console.log(interviewSum.value.id)
// console.log('세션 ID:', props.sessionId)
// console.log('회사 이름 : ', item.value.company_name)
</script>
