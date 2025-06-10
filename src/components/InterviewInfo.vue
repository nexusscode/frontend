<template>
    <div class="absolute top-28">
        <div name="main_box" class="flex flex-col px-4 py-6 border border-white mx-[180px] text-xs rounded-3xl bg-white/30 ">
            <div class="flex justify-between items-baseline mb-4 font-bold text-xl">
                <span class="pl-3">실제면접 기록하기</span>
                <button href="#" id="save" class="self-end px-5 py-0.5 border mr-2 text-base font-medium rounded-lg text-white bg-linear-to-r from-[#4653E4] to-[#AB4DFE]">AI 코칭받기</button>
            </div>
            <div class="flex">
                <div class="flex flex-col w-3/4 px-10 py-10 border-2 rounded-2xl bg-white">
                    <div class="flex justify-between pb-4 font-semibold text-sm">
                        <span>(주) 유비케어</span>
                        <span>직무: 웹프론트개발자</span>
                        <span>날짜: 2025.03.24</span>
                    </div>
                    <div v-for="(item, index) in items" :key="item.id" class="flex flex-col text-start">
                        <div class="flex mb-2 justify-between items-baseline">
                            <p class="w-11/12 mr-2 text-sm font-bold">{{ index+1 }}. {{ item.question }}</p>
                            <button @click="questionDelete(index)" class="size-[14px] m-2">
                                <img src="../assets/carbon_trash-can.svg" alt="" class="size-full">
                            </button>
                        </div>
                        <div class="relative rounded-md mb-2">
                            <textarea :id="index" @click="modifyAndBackup(key, index)" @input="resize($event, index)" spellcheck="false"
                                class="w-full h-px px-3 py-3 rounded-md text-[11px] resize-none overflow-y-hidden min-h-[40px] border border-gray-200 focus:outline outline-btnBlue" 
                                ></textarea>
                            <div class="absolute bottom-[16px] right-2 text-[10px]">{{ nowText[index].length }} / 3000</div> 
                        </div>
                        <div v-if="isBtOpen[index]" class="self-end mt-2 mb-6">
                            <button @click="cancel(key, index)" class="px-2 py-1.5 border bg-[#f0f0f0] text-xs font-normal rounded-md">취소</button>
                            <button @click="modifyDone(index)" class="px-2 py-1.5 ml-2 bg-btnBlue text-white text-xs rounded-md">수정완료</button>
                        </div>
                    </div>
                    <button @click="questionInsert" class="self-center px-6 py-1.5 border mt-6 text-md bg-[#4f89fd] rounded-lg text-white">
                        질문 추가하기
                    </button>
                </div>
                <div class="w-1/4 relative mx-6">
                    <div class="flex flex-col justify-between  mt-2  text-start font-bold absolute top-4 w-full">
                        <div class="">
                            <span>그때의 기억들</span>
                            <textarea spellcheck="false" ref="intro" @input="resize2" class="w-full p-2 mt-2 rounded-md text-[10px] border border-gray-200 resize-none overflow-y-hidden min-h-[48px]"> </textarea>
                        </div>
                        <div class="mt-6">
                            면접 시간
                            <div class="mt-2 font-medium">
                                시작 시각
                                <select required class="w-[100px] border pl-3 ml-6 rounded-[4px] font-normal appearance-none">
                                     <option disabled hidden selected value="">14:00</option>
                                    <option value="">예시1</option>
                                    <option value="">예시2</option>
                                </select>
                            </div>
                            <div class="mt-2 font-medium">
                                도착 시각
                                <select required class="w-[100px] border pl-3 ml-6 rounded-[4px] font-normal appearance-none">
                                    <option disabled hidden selected value="">14:00</option>
                                    <option value="">예시1</option>
                                    <option value="">예시2</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-6">
                            회사 분위기
                            <div class="flex mt-2 font-medium">
                                <div class="p-1.5 bg-white rounded-full">나쁨</div>
                                <div class="p-1.5 mx-2 bg-white rounded-full">보통</div>
                                <div class="p-1.5 bg-white rounded-full">좋음</div>
                            </div>
                        </div>
                        <div class="w-full mt-6">
                            면접관 수
                            <div class="flex mt-2 font-medium text-[10px] w-full">
                                <div class="px-4 py-1.5 bg-white rounded-full">1</div>
                                <div class="px-4 py-1.5 mx-2 bg-white rounded-full">2</div>
                                <div class="px-4 py-1.5 bg-white rounded-full">3</div>
                                <div class="px-4 py-1.5 mx-2 bg-white rounded-full">4</div>
                                <div class="px-4 py-1.5 bg-white rounded-full">5</div>
                            </div>
                        </div>
                        <div class="mt-6">
                            스스로 평가
                            <div class="flex items-baseline mt-1">
                                <div class="w-[1200px] h-[15px] bg-btnBlue mr-2"></div> <span>6/10</span>
                            </div>
                        </div>
                        <div class="mt-2">
                            면접 난이도
                            <div class="flex items-baseline mt-1">
                                <div class="w-[1200px] h-[15px] bg-btnBlue mr-2"></div> <span>6/10</span>
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
    import { resumeItems } from '@/data/dummyData'

    const items = reactive([...resumeItems])
    const questionCount = ref(items.length)
    
    const nowText = reactive(Array(questionCount.value).fill(''))
    const beforeText = reactive(Array(questionCount.value).fill(''))
    const backupHeight = ref(0)
    const isOpenAdd = ref(false)
    const isOpenEval = ref(false)
    const isBtOpen = reactive(Array(questionCount.value).fill(false))

    function resize(event, index){
        nowText[index] = event.target.value
        event.target.style.height = '1px'
        event.target.style.height = event.target.scrollHeight + 'px'
 
    }

    function modifyAndBackup(id, index){ // 수정/취소 버튼 open
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
        items.push({
            id: 5, // api
            resume_id: 1,
            question: '블라블라', // 수정
            answer: '',
            seq:  5,
        })
        nowText.push('')
        beforeText.push('')
        isBtOpen.push(false)
    }
    
    function questionDelete(index){
        items.splice(index,1)
    }
</script>
<style>
    #save {
        background: linear-gradient(to right,  #4653e4 0%,#ab4dfe 100%);
        opacity: 80%;
    }
    select:required:invalid {
        color: #909090;
        background-image: url(../assets/select_arrow.svg);
        background-repeat: no-repeat;
        background-position: right 10px top 50%;
        background-size: 8px;
    }
</style>
