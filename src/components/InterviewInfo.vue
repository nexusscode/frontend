<template>
    <div class="mt-24">
        <div name="main_box" class="flex flex-col px-4 py-6 border border-white mx-[180px] text-xs rounded-3xl bg-white/30 ">
            <div class="flex justify-between items-baseline mb-4 font-semibold text-xl">
                <span class="pl-3 ">실제면접 기록하기</span>
                <button href="#" id="save" class="self-end px-5 py-0.5 border mr-2 text-base font-medium rounded-lg text-white bg-linear-to-r from-[#4653E4] to-[#AB4DFE]">AI 코칭받기</button>
            </div>
            <div class="flex">
                <div class="flex flex-col w-3/4 px-10 py-10 border-2 rounded-2xl bg-white">
                    <div class="flex justify-between pb-4 font-semibold text-sm">
                        <span>(주) 유비케어</span>
                        <span>직무: 웹프론트개발자</span>
                        <span>날짜: 2025.03.24</span>
                    </div>
                    <div v-for="(item, index) in items" :key="item.question" class="flex flex-col text-start">
                        <div class="flex mb-2 justify-between items-baseline">
                            <p class="w-11/12 mr-2 text-sm font-bold">{{ index+1 }}. {{ item.question }}</p>
                            <button @click="questionDelete(index)" class="size-[16px] m-2">
                                <img src="../assets/carbon_trash-can.svg" alt="" class="size-full">
                            </button>
                        </div>
                        <div class="relative rounded-md mb-2">
                            <textarea :id="item.question" @click="backup(item.question, index)" @input="resize($event, index)" spellcheck="false"
                                class="w-full h-px px-3 py-3 rounded-md text-[11px] resize-none overflow-y-hidden min-h-[40px] border border-gray-200 focus:outline outline-btnBlue" 
                                ></textarea>
                            <div class="absolute bottom-[16px] right-2 text-[10px]">{{ nowText[index].length }} / 3000</div> 
                        </div>
                        <div v-if="isBtOpen[index]" class="self-end mt-2 mb-6">
                            <button @click="cancel(item.question, index)" class="px-2 py-1.5 border bg-[#f0f0f0] text-xs font-normal rounded-md">취소</button>
                            <button @click="modifyDone(index)" class="px-2 py-1.5 ml-2 bg-btnBlue text-white text-xs rounded-md">수정완료</button>
                        </div>
                    </div>
                    <div v-if="isOpenAdd" class="mt-2">
                    <div class="flex justify-between items-baseline mb-2">
                        <p class="mr-2 text-sm font-bold">질문을 입력해주세요.</p>
                        <div>
                            <button @click="questionInsertCancel" class="px-2 py-1.5 border bg-[#f0f0f0] text-xs font-normal rounded-md">취소</button>
                            <button @click="questionInsert" class="px-2 py-1.5 ml-2 bg-btnBlue text-white text-xs rounded-md">추가</button>
                        </div>
                    </div>
                    <textarea
                        @input="resize2($event)" 
                        spellcheck="false"
                        class="w-full h-px px-3 py-2 rounded-md text-[11px] resize-none overflow-y-hidden min-h-[30px] border border-gray-200 focus:outline outline-btnBlue"
                    ></textarea>
                </div>
                    <button @click="isOpenAdd = true" class="self-center px-6 py-1.5 border mt-6 text-md bg-[#4f89fd] rounded-lg text-white">
                        질문 추가하기
                    </button>
                </div>
                <div class="w-1/4 relative mx-6">
                    <div class="flex flex-col space-y-4 text-start font-bold absolute top-2 w-full">
                        <div class="">
                            <span>그때의 기억들</span>
                            <textarea spellcheck="false" @input="resize3" class="w-full p-2 mt-2 rounded-md text-[10px] border border-gray-200 resize-none overflow-y-hidden min-h-[48px]"> </textarea>
                        </div>
                        <div class="mt-6">
                            면접 시간
                            <div class="mt-2 font-medium">
                                시작 시각
                                <select v-model="startTime" required class="w-[80px] border pl-3 ml-6 rounded-[4px] font-normal appearance-none">
                                    <option disabled hidden selected value="">14:00</option>
                                    <option value="예시1">예시1</option>
                                    <option value="예시2">예시2</option>
                                </select>
                            </div>
                            <div class="mt-2 font-medium">
                                도착 시각
                                <select v-model="endTime" required class="w-[80px] border pl-3 ml-6 rounded-[4px] font-normal appearance-none">
                                    <option disabled hidden selected value="">15:00</option>
                                    <option value="예시1">예시1</option>
                                    <option value="예시2">예시2</option>
                                </select>
                            </div>
                        </div>
                        <!-- 회사 분위기 -->
                        <div>
                            <p class="font-bold mb-2">회사 분위기</p>
                            <div class="flex gap-2">
                                <button
                                    v-for="option in atmosphereOptions"
                                    :key="option"
                                    @click="selectedAtmosphere = option"
                                    :class="[
                                        'px-2 py-1 rounded-full border transition text-xs font-medium',
                                        selectedAtmosphere === option
                                        ? 'bg-white border-blue-500'
                                        : 'bg-white text-gray-700 hover:bg-gray-200'
                                    ]"
                                >
                                {{ option }}
                                </button>
                            </div>
                        </div>
                       <!-- 면접관 수 -->
                        <div>
                            <p class="font-bold mb-2">면접관 수</p>
                            <div class="flex gap-2">
                                <button
                                    v-for="count in 5"
                                    :key="count"
                                    @click="interviewerCount = count"
                                    :class="[
                                        'w-8 py-1 rounded-full border transition text-center text-xs font-medium',
                                        interviewerCount === count
                                        ? 'bg-white border-blue-500'
                                        : 'bg-white text-gray-700 hover:bg-gray-200'
                                    ]"
                                >
                                {{ count }}
                                </button>
                            </div>
                        </div>
                        <!-- 스스로 평가 -->
                        <div class="">
                            <p class="font-bold mb-2">스스로 평가</p>
                            <div class="flex justify-between items-center">
                                <div
                                    class="relative w-5/6 h-4 bg-gray-200 cursor-pointer"
                                    @click="selfHandleClick"
                                    ref="selfBarRef"
                                >
                                    <div
                                        class="absolute top-0 left-0 h-4 bg-blue-500"
                                        :style="{ width: (selfRating / 10) * 100 + '%' }"
                                    ></div>
                                </div>
                                <div class="w-1/12 mr-2 text-sm text-gray-700 font-medium">
                                    {{ selfRating }}/10
                                </div>
                            </div>
                        </div>
                        <!-- 면접 난이도 -->
                        <div class="">
                            <p class="font-bold mb-2">면접 난이도</p>
                            <div class="flex justify-between items-center">
                                <div
                                    class="relative w-5/6 h-4 bg-gray-200 cursor-pointer"
                                    @click="diffHandleClick"
                                    ref="diffBarRef"
                                >
                                    <div
                                        class="absolute top-0 left-0 h-4 bg-blue-500"
                                        :style="{ width: (diffRating / 10) * 100 + '%' }"
                                    ></div>
                                </div>
                                <div class="w-1/12 mr-2 text-sm text-gray-700 font-medium">
                                    {{ diffRating }}/10
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
   </div>
</template>
<script setup>
    import {ref, reactive} from 'vue'
    import { resumeItems } from '../data/defaultQuestions'

    const items = reactive([...resumeItems])
    const questionCount = ref(items.length)
    
    const nowText = reactive(Array(questionCount.value).fill(''))
    const beforeText = reactive(Array(questionCount.value).fill(''))
    const isBtOpen = reactive(Array(questionCount.value).fill(false))

    const addQuestion = ref('')
    const backupHeight = ref(0)
    const isOpenAdd = ref(false)
    const isOpenEval = ref(false)
    
    const memories = ref('')
    const startTime = ref('')
    const endTime = ref('')
    const atmosphereOptions = ['나쁨', '보통', '좋음']
    const selectedAtmosphere = ref('')
    const interviewerCount = ref(0)
    const selfRating = ref(6)
    const diffRating = ref(6)
    const selfBarRef = ref(null)
    const diffBarRef = ref(null)

    const selfHandleClick = (event) => {
        const bar = selfBarRef.value
        const rect = bar.getBoundingClientRect()
        const clickX = event.clientX - rect.left
        const percent = clickX / rect.width
        const newRating = Math.ceil(percent * 10)
        selfRating.value = Math.min(10, Math.max(1, newRating))
    }

    const diffHandleClick = (event) => {
        const bar = diffBarRef.value
        const rect = bar.getBoundingClientRect()
        const clickX = event.clientX - rect.left
        const percent = clickX / rect.width
        const newRating = Math.ceil(percent * 10)
        diffRating.value = Math.min(10, Math.max(1, newRating))
    }

    function resize(event, index){
        nowText[index] = event.target.value
        event.target.style.height = '1px'
        event.target.style.height = event.target.scrollHeight + 'px'
    }

    function resize2(event){
        addQuestion.value = event.target.value
        event.target.style.height = '1px'
        event.target.style.height = event.target.scrollHeight + 'px'
    }

    function resize3(event){
        memories.value = event.target.value
        event.target.style.height = '1px'
        event.target.style.height = event.target.scrollHeight + 'px'
    }

    function backup(id, index){ // 수정/취소 버튼 open
        backupHeight.value = document.getElementById(id).style.height
        beforeText[index] = nowText[index]
        isBtOpen[index] = true
    }

    function cancel(id, index){
        document.getElementById(id).value = nowText[index] = beforeText[index]
        document.getElementById(id).style.height = backupHeight.value
        isBtOpen[index] = false
    }
    
    function modifyDone(index){
        isBtOpen[index] = false
    }
    
    function questionInsert(){
        if(!addQuestion.value) return
        items.push({
            question: addQuestion.value, 
            answer: '',
        })
        nowText.push('')
        beforeText.push('')
        isBtOpen.push(false)
        isOpenAdd.value = false
        addQuestion.value = ''
    }
    
    function questionInsertCancel(){
        isOpenAdd.value = false
        addQuestion.value = ''
    }

    function questionDelete(index){
        items.splice(index,1)
        nowText.splice(index,1)
        beforeText.splice(index,1)
        isBtOpen.splice(index,1)
    }
</script>
<style>
    #save {
        background: linear-gradient(to right,  #4653e4 0%,#ab4dfe 100%);
        opacity: 80%;
    }
    select:required:invalid {
        color: #909090;
        background-image: url(..//assets/select_arrow.svg);
        background-repeat: no-repeat;
        background-position: right 10px top 50%;
        background-size: 6px;
    }
</style>
