<template>
        <div name="all_box" class="pt-[84px] px-[120px] flex flex-col justify-between items-center w-auto">
            <div name="first_box" class="w-2/3 px-16  h-48 flex flex-col justify-evenly items-center rounded-3xl bg-white/50">
                <div class="flex w-full py-4 rounded-lg font-semibold text-lg">
                    자기소개서 <div class="inline-block mt-1.5 ml-4 pb-2 text-xs font-semibold">자기소개서 문서 첨부 및 직접 작성으로 AI 분석을 받아보세요</div>
                </div>
                <a class="flex justify-center w-full py-3 border-[#576edf] border-2 rounded-xl text-center font-semibold text-lg" href="#">
                    <img src="./ima.svg" alt="" class="w-4 h-4 mr-4">
                    자기소개서 문서 추가 
                </a>
                <a class="self-end px-4 py-2 border my-4 text-sm bg-[#4f89fd] rounded-lg text-white" href="#">
                    AI 검사 받기
                </a>
            </div>
            <div name="type_area" class="flex flex-col w-full h-full px-8 py-3 border-2 my-2 rounded-xl bg-white">
                <div class="py-2 mb-2 self-start font-bold">(주)리더스시스템 - 개발자 신입 및 경력 모집</div>
                <div v-for="(item, index) in items" :key="item.question" class="flex flex-col text-start">
                    <div class="flex justify-between items-baseline mb-2 ">
                        <p class="w-11/12 mr-2 text-sm font-bold break-all">{{ index+1 }}. {{ item.question }}</p>
                        <button @click="questionDelete(index)" class="size-[16px] m-2">
                            <img src="../assets/carbon_trash-can.svg" alt="" class="size-full">
                        </button>
                    </div>
                    <div class="relative rounded-md mb-2">
                        <textarea :id="item.question" @click="backup(item.question, index)" @input="resize($event, index)" spellcheck="false"
                            class="w-full h-px px-3 py-3 rounded-md text-[11px] resize-none overflow-y-hidden min-h-[40px] border border-gray-200 focus:outline outline-btnBlue" 
                            ></textarea>
                        <div class="absolute bottom-[18px] right-2 text-[10px]">{{ nowText[index].length }} / 3000</div> 
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
                    <div class="flex flex-col px-8 pt-10 border-2 mt-4 rounded-xl bg-white">
                        <p class="mb-4 text-[13px] font-semibold">1. 입사하고 싶은 이유와 준비 과정을 구체적으로 적어주세요.</p>
                        <textarea ref="textArea" @input="resize" class="p-3 mb-4 rounded-md text-[11px] border border-gray-200 resize-vertical overflow-y-hidden min-h-[48px]"> 
                        <p class="mb-4 text-[13px] font-semibold">1. 입사하고 싶은 이유와 준비 과정을 구체적으로 적어주세요.</p>
                        <textarea ref="textArea" @input = "resize" class="p-3 mb-4 rounded-md text-[11px] border border-gray-200 resize-none overflow-y-hidden min-h-[48px]"> </textarea>
                        <p class="mb-4 text-[13px] font-semibold">1. 입사하고 싶은 이유와 준비 과정을 구체적으로 적어주세요.</p>
                        <textarea ref="textArea" @input = "resize" class="p-3 mb-4 rounded-md text-[11px] border border-gray-200 resize-none overflow-y-hidden min-h-[48px]"> </textarea>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
    import {ref, reactive, onMounted} from 'vue'
    import SelfIntro_fileModal from './SelfIntro_fileModal.vue'
    import SelfIntro_evalModal from './SelfIntro_evalModal.vue'
    import { resumeItems } from '../data/defaultQuestions'
    import env from '../api/env'

    // const applicationId = ref(0) -> '검사하기' 버튼을 누르면 자기소개서에 해당하는 공고ID(application_id) 가 필요함
/*
    onMounted(async () => {
        try {
            const response = await env.get(`/api/application/${applicationId}/resume`)
            resumeId.value = response.data.result.resumeId
        } catch (err) {
            console.error('API 오류:', err)
        }
    })
*/
    //const resumeId = ref(0)  // 여기다 복사
    const items = reactive([...resumeItems]) // 이건 그대로 사용
    
    const nowText = reactive(Array(items.length).fill(''))
    const beforeText = reactive(Array(items.length).fill(''))
    const isBtOpen = reactive(Array(items.length).fill(false))

    const addQuestion = ref('')
    const backupHeight = ref(0)
    const isOpenFile = ref(false)
    const isOpenEval = ref(false)
    const isOpenAdd = ref(false)
    

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
    
    /*
    const axiosFirstResume = async (resume) => { // 어떤걸 보낼지 체크
        try {
            for(let i = 0;i<items.length;i++) {
                items[i].answer = nowText[i]
            }
            const res = await env.post(`/api/resume/${resumeId.value}`, items)
            copyResumeAndItems(resumeId.value, res.data.result)
            router.push('/coverletter/result') --> 라우팅 변경
        } catch (error) {
            console.error('에러 발생:', error)
        }
    }
</script>
