<template>
    <div name="main" class="flex flex-col justify-between items-center h-[500px] p-6 mx-[260px] mt-[60px] rounded-2xl text-sm font-semibold bg-white">
        <div class="text-lg">DISC와 개발자 특화 검사결과</div>
        <div class="flex w-full">
            <div class="flex flex-col w-1/2 h-80 px-4 py-5 mr-2 text-start bg-[#f6f9fe] rounded-lg">
                <span class="text-sm pb-5 font-bold">DISC 검사</span>
                <div class="flex justify-between w-full h-2/3">
                    <div class="h-full w-1/2">
                        <div class="w-[120px] p-2 bg-[#909090]/30 rounded-xl text-center font-bold">{{ discType }} : Dominance</div>
                        <p class="my-4 text-xs">당신은 <span class="text-btnBlue">주도형({{ discType }})</span> 입니다</p>
                        <p class="text-[10px]/3">{{ discDescription }}</p>
                    </div>
                    <div class="h-full w-1/2 mr-4">
                        <div class="ml-8 max-w-[150px] h-full rounded-md">
                            <!-- 상단 수치: 한 줄에 수평 정렬 -->
                            <div class="flex flex-1 justify-between text-[10px] text-black font-medium mb-1 px-1">
                                <div
                                    v-for="(item, index) in discChartData"
                                    :key="'top-label-' + index"
                                    class="flex-1 text-center"
                                >
                                {{ item.value }}%
                                </div>
                            </div>

                            <!-- 막대 + 하단 레이블 묶어서 수직정렬 -->
                            <div class="flex flex-1 justify-between items-end h-36 px-1">
                                <div
                                    v-for="(item, index) in discChartData"
                                    :key="'bar-' + index"
                                    class="flex flex-col items-center flex-1"
                                >
                                    <!-- 막대 -->
                                    <div
                                        class="w-6 bg-green-300"
                                        :style="{ height: item.value * 1.2 + 'px' }"
                                    ></div>

                                    <!-- 하단 레이블 -->
                                    <div class="text-sm font-semibold text-black mt-2">
                                        {{ item.label }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div >
                    키워드
                    <div class="flex justify-start mt-2">
                        <div v-for="item in discKeywords" :key="index" class="bg-[#909090]/10 p-1.5 mr-3 rounded-2xl text-xs">{{ item }}</div>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-col w-1/2 h-80 px-4 py-5 ml-2 text-start bg-[#f6f9fe] rounded-lg">
                <span class="text-sm font-bold">개발자 특화 검사</span>
                <div class="flex justify-between w-full h-2/3">
                    <div class="w-1/2 mr-8">
                        <div class="flex items-center my-4 text-[10px]">당신은 <p class="inline-block px-2 mx-1.5 text-white text-[10px] font-medium bg-btnBlue rounded-2xl">{{ devType }}</p> 입니다</div>
                        <p class="text-[10px]/3">{{ devDescription }}</p>
                    </div>
                    <div class="h-full w-1/2 mr-4">
                        <div class="ml-8 max-w-[150px] h-full rounded-md">
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
        <span class="self-start">이 결과는 향후 AI 자기소개서 분석의 면접 스타일 추천에 활용됩니다.</span>
        <button class="px-6 py-1 bg-btnBlue text-white rounded-lg">
            <router-link to="">홈으로가기</router-link>
        </button>
    </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue';

/*
onMounted(async () => { // 어떤걸 보낼지 체크
    try {
        const res = await env.get('/api/survey/result')
        init(res)
    } catch (error) {
        console.error('에러 발생:', error)
    }
})

const discChartData = reactive([
  { label: 'D형', value: 0 },
  { label: 'I형', value: 0 },
  { label: 'S형', value: 0 },
  { label: 'C형', value: 0 },
])

const devChartData = reactive([
  { label: '개발 \n접근방식', value: 0 },
  { label: '팀 협업', value: 0 },
  { label: '문제해결 \n스타일', value: 0 },
  { label: `개발\n 가치관`, value: 0 },
])
const discType = ref('')
const discDescription = ref('')
const devType = ref('')
const devDescription = ref('')

const discKeywords = ref([])
const devKeywords = ref([])

function init(res){
    const result = res.data.result
    discChartData[0].value = result.dominanceScore
    discChartData[1].value = result.influenceScore
    discChartData[2].value = result.steadinessScore
    discChartData[3].value = result.conscientiousnessScore

    devChartData[0].value = result.developmentApproachScore
    devChartData[1].value = result.teamCollaborationScore
    devChartData[2].value = result.problemSolvingScore
    devChartData[3].value = result.developmentValuesScore

    discType.value = result.discType
    discDescription.value = result.discDescription
    devType.value = result.devType
    devDescription.value = result.devDescription

    discKeywords.value = result.discKeywords
    devKeywords.value = result.devKeywords
}
*/

</script>