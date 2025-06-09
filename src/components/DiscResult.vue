<template>
    <div name="main" class="flex  justify-center items-center  text-sm font-semibold ">
        <div class="flex flex-col justify-between items-center w-[480px] h-[560px] p-6 mt-[60px] rounded-2xl bg-white">
        <div class="w-full text-lg">DISC 검사결과
            <div class="flex flex-col w-full h-[360px] px-4 py-5 mt-4 text-start bg-[#f6f9fe] rounded-lg">
                <span class="text-sm font-bold">DISC 검사</span>
                <div class="flex w-full h-2/3">
                    <div class="w-1/2 h-full mt-4">
                        <div class="w-[140px] p-2 bg-[#909090]/30 rounded-xl text-center font-bold">{{ discType }} : Dominance</div>
                        <p class="my-4 text-xs">당신은 <span class="text-btnBlue font-semibold">주도형({{ discType }})</span> 입니다</p>
                        <p class="text-[10px]/3 break-all">{{ discDescription }}</p>
                    </div>
                    <div class="flex justify-center items-center w-1/2">
                        <div class="max-w-[150px] w-full rounded-md">
                            <!-- 상단 수치: 한 줄에 수평 정렬 -->
                            <div class="flex justify-between text-[10px] text-black font-medium mb-1 px-1">
                                <div
                                    v-for="(item, index) in discChartData"
                                    :key="'top-label-' + index"
                                    class="flex-1 text-center"
                                >
                                {{ item.value }}%
                                </div>
                            </div>

                            <!-- 막대 + 하단 레이블 묶어서 수직정렬 --> 
                            <div class="flex justify-between items-end h-36 px-1">
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
                        <div v-for="item in discKeywords" :key="index" class="bg-[#909090]/10 p-1.5 mr-3 rounded-2xl text-xs">{{ item }}</div>
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
        const res = await env.get('/api/survey/disc/result')
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

const discType = ref('')
const discDescription = ref('')

const discKeywords = ref([])

function init(res){
    const result = res.data.result
    discChartData[0].value = result.dominanceScore
    discChartData[1].value = result.influenceScore
    discChartData[2].value = result.steadinessScore
    discChartData[3].value = result.conscientiousnessScore


    discType.value = result.discType
    discDescription.value = result.discDescription

    discKeywords.value = result.discKeywords
}
*/
</script>