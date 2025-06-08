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
                            <button @click="" class="px-2 py-1.5 ml-2 bg-btnBlue text-white font-semibold text-xs rounded-md">재검사</button>
                        </div>
                    </div>
                    <button @click="questionInsert" :disabled="isDisabled" class="flex items-center self-center px-8 py-1.5 my-6 rounded-md bg-btnBlue text-white text-[12px]">
                        <img src="../assets/add_self.svg" alt="" class="mr-2 w-[14px] h-[14px]">질문 추가하기
                    </button>
                </div> 
            </div>
            <div class="w-1/4 flex flex-col justify-end relative">
                <button v-if="isDisabled" @click="isOpenInterview = true" id="save" class="absolute top-1 right-1 px-4 py-1 border mr-2 text-[11px] font-medium rounded-md text-white bg-linear-to-r from-[#4653E4] to-[#AB4DFE]">AI 코칭 보관함에 저장</button>
                <SelfIntroResult_interviewModal v-if="isOpenInterview" @close="isOpenInterview = false" />
                <div class="flex flex-col justify-between h-full mt-12 mx-2 text-start">
                    <p v-for="(feedback_item, index) in feedback_items" :key="feedback_item.id" 
                        :class="['p-4 shadow-sm border border-gray-200 bg-white font-semibold text-[11px] rounded-xl', feedbackCount[index] === 1 ? 'text-btnBlue' : 'text-[#4906e6]']">
                        {{ feedback_item.feedback_text }}
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {ref, reactive, onMounted} from 'vue'
    import {resumes, resume_items, resume_item_feedbacks } from '@/data/dummyData'
    import SelfIntroResult_interviewModal from './SelfIntroResult_interviewModal.vue'
    //import { useResumeStore } from '@/stores/resume';
    //onMounted(async () => {
    //    try {
    //        const response = await axios.get('https://api.example.com/users')
    //        feedback_items = response.data // 여기다 resume_item_feedbacks, (resumes, resume_items)를 받아내고 resume_item_feedbacks만 보내준거면 SelfIntro에서 마지막으로 작성한 자소서 내용을 긁어와야함
    //        const resume = reactive({...resumes})
    //        const items = reactive([...resume_items])  => 다 반환해줬다고 가정
    //        for(const item of items)
    //        document.getElementById(item.id).value = item.answer
    //    } catch (err) {
    //        console.error('API 오류:', err) 
    //    }
    //})
    //const resumeBackup = useResumeStore()
    const resume = reactive({...resumes})
    const items = reactive([...resume_items])
    // const resumeId = ref(resumeBackup.resumeId)
    // const items = reactive([...resumeBackup.resumeItems])
    const feedback_items = reactive([...resume_item_feedbacks])
    
    const nowText = reactive(Array(items.length).fill(''))
    const beforeText = reactive(Array(items.length).fill(''))
    const backupHeight = ref(0)
    const isBtOpen = reactive(Array(items.length).fill(false))
    const feedbackCount = reactive(Array(items.length).fill(1))

    const isOpenInterview = ref(false)
    const isDisabled = ref(true)

    onMounted(()=>{
        for(let i = 0;items.length;i++){
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
        feedbackCount.push(0)
    }
    
    function questionDelete(index){
        items.splice(index,1)
        nowText.splice(index,1)
        beforeText.splice(index,1)
        isBtOpen.splice(index,1)
        feedback_items.splice(index,1)
        feedbackCount.splice(index,1)
    }

    function copyResume(index){
        items[index].answer = nowText[index]
    }

    const feedbackResume = async (index) => { // (수정) 버튼 누르면 피드백 가져오기
        try {
            copyResume(index)
            await axios.post('https://api.example.com/users', items[index]) 
            const response = await axios.get('https://api.example.com/users')
            for (let i = 0; i < feedbackCount.length; i++) {
                feedbackCount[i] += 1
            }
            feedback_items[index] = response.data
        } catch (error) {
            console.error('에러 발생:', error)
        }
    }
    
</script>
<style>
    #save {
        background: linear-gradient(to right,  #4653e4 0%,#ab4dfe 100%);
        opacity: 80%;
    }
</style>