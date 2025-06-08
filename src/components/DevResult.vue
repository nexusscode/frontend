<template>
    <div name="main" class="flex  justify-center items-center  text-sm font-semibold ">
        <div class="flex flex-col justify-between items-center w-[480px] h-[560px] p-6 mt-[60px] rounded-2xl bg-white">
        <div class="w-full text-lg">개발자 특화 검사결과
            <div class="flex flex-col w-full h-[360px] px-4 py-5 mt-4 text-start bg-[#f6f9fe] rounded-lg">
                <span class="text-sm font-bold">개발자 특화 검사</span>
                <div class="flex w-full h-2/3">
                    <div class="w-1/2 h-full">
                        <div class="flex items-center my-4 text-[11px]">당신은 <p class="inline-block px-2 mx-1.5 text-white text-[10px] font-medium bg-btnBlue rounded-2xl">{{ devType }}</p> 입니다</div>
                        <p class="text-[10px]/3 break-all">{{ devDescription }}</p>
                    </div>
                    <div class="flex justify-center items-center w-1/2">
                        <div class="max-w-[150px] w-full rounded-md">
                            <!-- 상단 수치: 한 줄에 수평 정렬 -->
                            <div class="flex justify-between text-[10px] text-black font-medium mb-1 px-1">
                                <div
                                    v-for="(item, index) in devChartData"
                                    :key="'top-label-' + index"
                                    class="flex-1 text-center"
                                >
                                {{ item.value }}%
                                </div>
                            </div>

                            <!-- 막대 + 하단 레이블 묶어서 수직정렬 --> 
                            <div class="flex justify-between items-end h-36 px-1">
                                <div
                                    v-for="(item, index) in devChartData"
                                    :key="'bar-' + index"
                                    class="flex flex-col items-center flex-1"
                                >
                                    <!-- 막대 -->
                                    <div
                                        class="w-6 bg-green-300"
                                        :style="{ height: item.value * 1.2 + 'px' }"
                                    ></div>

                                    <!-- 하단 레이블 -->
                                    <p class="text-[10px]/3 h-4 font-semibold text-black mt-2 text-center whitespace-pre">
                                        {{ item.label }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    키워드
                    <div class="flex justify-start mt-2">
                        <div v-for="item in devKeywords" :key="index" class="bg-[#909090]/10 p-1.5 mr-3 rounded-2xl text-xs">{{ item }}</div>
                    </div>
                </div>
            </div>
        </div>
        <span class="self-start text-xs">이 결과는 향후 AI 자기소개서 분석과 면접 스타일 추천에 활용됩니다.</span>
        <button class="px-6 py-1 mb-2 bg-btnBlue text-white rounded-lg">
            <router-link to="/mypage">확인</router-link>
        </button>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue';

/*
onMounted(async () => { // 어떤걸 보낼지 체크
    try {
        const res = await env.get('/api/survey/dev/result')
        init(res)
    } catch (error) {
        console.error('에러 발생:', error)
    }
})

const devChartData = reactive([
  { label: '개발 \n접근방식', value: 0 },
  { label: '팀 협업', value: 0 },
  { label: '문제해결 \n스타일', value: 0 },
  { label: `개발\n 가치관`, value: 0 },
])

const devType = ref('')
const devDescription = ref('')

const devKeywords = ref([])

function init(res){
    const result = res.data.result

    devChartData[0].value = result.developmentApproachScore
    devChartData[1].value = result.teamCollaborationScore
    devChartData[2].value = result.problemSolvingScore
    devChartData[3].value = result.developmentValuesScore

    devType.value = result.devType
    devDescription.value = result.devDescription

    devKeywords.value = result.devKeywords
}
*/
</script>