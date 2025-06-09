<template>
    <div class="absolute top-32 mx-36">
        <div name="main_box" class="flex w-11/12 px-3 py-6 border mx-auto rounded-3xl bg-white/30">
            <div class="w-3/4">
                <div class="h-8 flex justify-between text-xs">
                    <div>
                        <p class="pl-4 text-lg font-semibold inline">자소서 분석 결과</p>
                        <span v-if="!isDisabled" class="inline text-lg font-semibold text-[#6c40c2]"> - 수정중</span>
                    </div>
                    <button v-if="isDisabled" @click="isDisabled = false" class="px-4  border text-[12px] font-medium rounded-lg bg-[#4f89fd] text-white">수정하기</button>
                    <button v-else @click="isDisabled = true" class="px-4 py-2 border text-[13px] font-medium rounded-lg bg-[#4f89fd] text-white">수정완료</button>
                </div>
                <div class="flex flex-col h-auto px-6 py-6 border-2 mt-4 rounded-2xl text-start bg-white">
                    <div v-for="(item, index) in items" :key="item.question" class="flex flex-col text-start">
                        <div class="flex justify-between items-baseline mb-2">
                            <p class="w-full pl-1 text-sm font-semibold">{{ index+1 }}. {{ item.question }}</p>
                            <button @click="questionDelete(index)" :disabled="isDisabled" class="size-[14px] m-2">
                                <img src="../assets/carbon_trash-can.svg" alt="" class="size-full">
                            </button>
                        </div>
                        <div class="relative rounded-md mb-2">
                            <textarea :id="item.question" @click="modifyAndBackup(item.question, index)" @input="resize($event, index)" spellcheck="false" :disabled = isDisabled
                                class="w-full h-px px-3 py-3 rounded-md text-[11px] resize-none overflow-y-hidden min-h-[40px] border border-gray-200 focus:outline outline-btnBlue disabled:bg-white disabled:text-black disabled:opacity-100" 
                                >
                            </textarea>
                            <div class="absolute bottom-[18px] right-2 text-[10px]">{{ nowText[index].length }} / 3000</div> 
                        </div>
                        <div v-if="isBtOpen[index]" class="self-end mt-2 mb-6">
                            <button @click="cancel(item.question, index)" class="px-2 py-1.5 border bg-[#f0f0f0] text-xs font-semibold rounded-md">취소</button>
                            <button @click="modifyDone(index)" class="px-2 py-1.5 ml-2 bg-[#f0f0f0] font-semibold text-xs rounded-md">수정완료</button>
                            <button @click="feedbackResumeItem(index)" class="px-2 py-1.5 ml-2 bg-btnBlue text-white font-semibold text-xs rounded-md">재검사</button>
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
                    <button v-if="!isDisabled" @click="isOpenAdd = true" :disabled="isDisabled" class="flex items-center self-center px-8 py-1.5 my-6 rounded-md bg-btnBlue text-white text-[12px]">
                        <img src="../assets/add_self.svg" alt="" class="mr-2 w-[14px] h-[14px]">질문 추가하기
                    </button>
                </div> 
            </div>
            <div class="w-1/4 flex flex-col justify-end relative">
                <button v-if="isDisabled" @click="isOpenInterview = true" id="save" class="absolute top-1 right-1 px-4 py-1 border mr-2 text-[11px] font-medium rounded-md text-white bg-linear-to-r from-[#4653E4] to-[#AB4DFE]">AI 코칭 보관함에 저장</button>
                <SelfIntroResult_interviewModal v-if="isOpenInterview" @close="isOpenInterview = false" />
                <div class="flex flex-col justify-between h-full mt-12 mx-2 text-start">
                    <p v-for="(feedback_text, index) in feedback_texts" :key="'feedback'+index" 
                        :class="['p-4 shadow-sm border border-gray-200 bg-white font-semibold text-[11px] rounded-xl', feedbackCount[index] === 1 ? 'text-btnBlue' : 'text-[#4906e6]']">
                        {{ feedback_text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {ref, reactive, onMounted} from 'vue'
    import {resume_item_feedbacks } from '@/data/dummyData'
    import {resume_items} from '@/data/defaultResumeQuestions'
    import SelfIntroResult_interviewModal from './SelfIntroResult_interviewModal.vue'
    //import { useResumeStore } from '@/stores/resume';

    //const resume = useResumeStore()
    //const items = reactive([...resume.resumeItems]) // 대체
    //const item = reactive({
    //    question: '',
    //    answer: '',
    //})
    const items = reactive([...resume_items])
    // const resumeId = ref(resume.resumeId)
    // const feedback_items = reactive(Array(items.length).fill('')) //대체
    const feedback_texts = reactive([...resume_item_feedbacks])
    /*
    onMounted(async () => {
        try {
            for(const item of items){
                const res = await env.get(`/api/resume/feedback/${item.resumeItemId}`)
                feedback_texts.push(res.data.result.feedbackText)
            }   
        } catch (err) {
            console.error('API 오류:', err) 
        }
    })
    */
    
    const nowText = reactive(Array(items.length).fill(''))
    const beforeText = reactive(Array(items.length).fill(''))
    const addQuestion = ref('')
    const backupHeight = ref(0)
    const isBtOpen = reactive(Array(items.length).fill(false))
    const feedbackCount = reactive(Array(items.length).fill(1))

    const isOpenInterview = ref(false)
    const isOpenAdd = ref(false)
    const isDisabled = ref(true)

    onMounted(()=>{
        for(let i = 0;i<items.length;i++){
            const el = document.getElementById(items[i].question)
            nowText[i] = el.value = items[i].answer
            el.style.height = '1px'
            el.style.height = el.scrollHeight + 'px'
        }
    })

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

    function modifyAndBackup(id, index){ // 완료/취소 버튼 open
        backupHeight.value = document.getElementById(id).style.height
        beforeText[index] = nowText[index]
        isBtOpen[index] = true
    }

    function cancel(id, index){ // 취소 버튼
        /*
        await env.delete(`/api/resume/item/${items[index].resumeItemId}`)
        */
        document.getElementById(id).value = nowText[index] = beforeText[index]
        document.getElementById(id).style.height = backupHeight.value
        isBtOpen[index] = false
    }
    
    function modifyDone(index){ // 완료 버튼
        /*
        await env.put(`/api/resume/item/${items[index].resumeItemId}`)
        */
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
    
    function questionDelete(index){
        items.splice(index,1)
        nowText.splice(index,1)
        beforeText.splice(index,1)
        isBtOpen.splice(index,1)
        feedback_texts.splice(index,1)
    }

    function copyResume(index){
        items[index].answer = nowText[index]
    }

    const feedbackResumeItem = (index)=> {
        feedback_texts[index] = '우히히히닣닣미히닌히히히시'
    }
    /*
    async (index) => { // (검사) 버튼 누르면 피드백 가져오기
        try {
            if(items.length > feedback_texts.length) feedback_texts.push('')
            item.question = items[index].question
            item.answer = nowText[index]
            const res = await axios.post(`/api/resume/feedback/${items[index].resumeItemId}`, item) 
            feedback_texts[index] = res.data.result.feedbackText // 하루 횟수 제한도 고려해보자
        } catch (error) {
            console.error('에러 발생:', error)
        }
    }
    */
</script>
<style>
    #save {
        background: linear-gradient(to right,  #4653e4 0%,#ab4dfe 100%);
        opacity: 80%;
    }
</style>