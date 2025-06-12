<!-- 면접 리포트(면접 내용 기록 탭) : 면접 내용 기록 내용 부분 -->
<template>
    <div class="flex flex-col">
        <div class="mb-8">
        <div
            v-for="(question, index) in interview?.questions"
            :key="question.questionId"
            class="mb-8"
        >
            <div class="w-full mb-2 rounded-lg px-3 py-1.5 border border-[#D1D1D1] bg-white">
                <span class="font-medium text-black">질문 {{ index + 1 }}.</span>
                <span class="font-medium ml-4 text-black">{{ question?.questionText }}</span>
            </div>
            <div class="ml-4 mr-4 flex gap-x-8">
                <span class="w-[60px] text-black">답변 내용</span>
                <div class="flex-1">
                    <!-- 답변 내용 -->
                    <span class="text-black">
                        {{ question?.transcript }}
                    </span>
                    <!-- 아랫줄 -->
                    <div class="flex justify-between items-center h-8 mt-2">
                        <div class="flex gap-x-6">  
                            <div class="flex items-center justify-center">
                                <span class="flex items-center mr-2">컨닝 의심</span>
                                <div class="flex h-5 items-center w-fit px-2.5 text-sm rounded-full bg-white text-[#434343] border border-[#434343]">
                                    {{ question?.cheated ? '의심됨' : '안전' }}
                                </div>
                            </div>
                            <div class="flex items-center justify-center">
                                <span class="flex items-center mr-2">미완결 답변</span>
                                <div class="flex h-5 items-center w-fit px-2.5 text-sm rounded-full bg-white text-[#434343] border border-[#434343]">
                                    {{ question?.completeAnswer ? '없음' : '있음' }}
                                </div>
                            </div>
                            <div class="flex items-center justify-center">
                                <span class="flex items-center mr-2">답변 내용</span>
                                <div class="flex h-5 items-center w-fit px-2.5 text-sm rounded-full bg-white text-[#434343] border border-[#434343]">
                                    {{ question?.questionFulfilled ? '충족' : '미충족' }}
                                </div>
                            </div>
                        </div>
                        <!-- 답변 시간 -->
                        <span class="text-black">{{ question?.second }}초</span> <!-- 여기 수정 필요 -->
                    </div>
                </div>
            </div>
            <hr class="ml-4 mr-4 my-2 border-black" />
            <div class="flex flex-col gap-y-2 pt-1">
                <!-- <div class="ml-4 mr-4 flex gap-x-8">
                    <span class="w-[60px] text-black">답변 요약</span>
                    <div class="flex-1">
                        <span class="text-black"> 
                            백엔드 개발자로서 효율성과 안정성을 중시하며, 성능 개선 경험을 바탕으로 확장성 있는 시스템 구축에 기여하고 싶습니다.    
                        </span>
                    </div>
                </div> -->
                <div class="ml-4 mr-4 flex gap-x-8">
                    <span class="w-[60px] text-black font-medium">AI 분석</span>
                    <div class="flex-1">
                        <!-- AI 분석 내용 -->
                        <span class="text-black font-medium">
                            {{ question?.feedback }} 
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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
  } catch (err) {
    console.error('데이터 불러오기 실패:', err)
  }
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

</script>
