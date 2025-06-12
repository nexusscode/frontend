<template>
       <!-- 로딩 중이면 로딩 스피너 -->
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <!-- SVG 또는 로딩 컴포넌트 -->
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
        <g fill="currentColor">
            <circle cx="12" cy="3.5" r="1.5">
                <animateTransform attributeName="transform" calcMode="discrete" dur="2.4s" repeatCount="indefinite" type="rotate" values="0 12 12;90 12 12;180 12 12;270 12 12"/>
                <animate attributeName="opacity" dur="0.6s" repeatCount="indefinite" values="1;1;0"/>
            </circle>
            <circle cx="12" cy="3.5" r="1.5" transform="rotate(30 12 12)">
                <animateTransform attributeName="transform" begin="0.2s" calcMode="discrete" dur="2.4s" repeatCount="indefinite" type="rotate" values="30 12 12;120 12 12;210 12 12;300 12 12"/>
                <animate attributeName="opacity" begin="0.2s" dur="0.6s" repeatCount="indefinite" values="1;1;0"/>
            </circle>
            <circle cx="12" cy="3.5" r="1.5" transform="rotate(60 12 12)">
                <animateTransform attributeName="transform" begin="0.4s" calcMode="discrete" dur="2.4s" repeatCount="indefinite" type="rotate" values="60 12 12;150 12 12;240 12 12;330 12 12"/>
                <animate attributeName="opacity" begin="0.4s" dur="0.6s" repeatCount="indefinite" values="1;1;0"/>
            </circle>
        </g>
    </svg>
    </div>
    <div class="h-screen-minus-84 mt-28 mx-36">
        <div name="main_box" class="flex w-11/12 px-3 py-6 border mx-auto rounded-t-3xl bg-white/30">
            <div class="w-3/4 mr-7">
                <div class="h-8 flex justify-between text-xs">
                    <div>
                        <p class="pl-4 text-lg font-semibold inline">자소서 분석 결과</p>
                        <span v-if="!isDisabled" class="inline text-lg font-semibold text-[#6c40c2]"> - 수정중</span>
                    </div>
                    <button v-if="isDisabled" @click="modifyMode" class="px-4  border text-[12px] font-medium rounded-lg bg-[#4f89fd] text-white">수정하기</button>
                    <button v-else @click="isDisabled = true" class="px-4 py-2 border text-[13px] font-medium rounded-lg bg-[#4f89fd] text-white">수정완료</button>
                </div>
                <div class="flex flex-col h-auto px-6 py-6 border-2 mt-4 rounded-2xl text-start bg-white">
                    <div v-for="(item, index) in items" :key="item.resumeItemId" class="flex flex-col text-start">
                        <div class="flex justify-between items-baseline mb-2">
                            <p class="w-full pl-1 text-sm font-semibold">{{ index+1 }}. {{ item.question }}</p>
                            <button @click="questionDelete(index)" :disabled="isDisabled" class="size-[16px] mx-2">
                                <img src="../assets/carbon_trash-can.svg" alt="" class="size-full">
                            </button>
                        </div>
                        <div class="relative rounded-md mb-2">
                            <textarea 
                                :key="item.resumeItemId"
                                :ref="el => sourceRefs[index] = el" 
                                :id="item.resumeItemId" 
                                @click="backup(item.resumeItemId, index)" 
                                @input="resize($event, index)" spellcheck="false" :disabled = isDisabled
                                class="w-full h-px px-3 py-3 rounded-md text-[11px] resize-none overflow-y-hidden min-h-[40px] border border-gray-200 focus:outline outline-btnBlue disabled:bg-white disabled:text-black disabled:opacity-100" 
                                ></textarea>
                            <div class="absolute bottom-[18px] right-2 text-[10px]">{{ nowText[index]?.length }} / 3000</div> 
                        </div>
                        <div v-if="isBtOpen[index]" class="self-end mt-2 mb-6">
                            <button @click="cancel(item.resumeItemId, index)" class="px-2 py-1.5 border bg-[#f0f0f0] text-xs font-semibold rounded-md">취소</button>
                            <button @click="modifyDone(index)" class="px-2 py-1.5 ml-2 bg-[#f0f0f0] font-semibold text-xs rounded-md">수정완료</button>
                            <button @click="feedback(index)" class="px-2 py-1.5 ml-2 bg-btnBlue text-white font-semibold text-xs rounded-md">검사</button>
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
                <button v-if="isDisabled" @click="saveResume" id="save" class="absolute top-1 right-1 px-4 py-1 border mr-2 text-[11px] font-medium rounded-md text-white bg-linear-to-r from-[#4653E4] to-[#AB4DFE]">AI 코칭 보관함에 저장</button>
                <Recruit_List_interviewModal v-if="isOpenInterview" @close="getBackToMain" :Info="selectedItem"/>
                <div class="flex flex-col justify-between h-full mt-12 mx-2 text-start">
                    <p v-for="(feedbackItem, index) in feedbackItems"
                        :key="feedbackItem.feedbackId"
                        :ref="el => targetRefs[index] = el"
                        :class="['p-4 shadow-sm border border-gray-200 font-semibold text-[11px] rounded-xl', feedbackCount[index] < 1 ? 'bg-none border-none shadow-none' : (feedbackCount[index] > 1 ? 'text-[#4906e6] bg-white' : 'text-btnBlue bg-white')]">
                        {{ feedbackItem.feedbackText }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {ref, reactive, onMounted, nextTick, onBeforeUnmount, onUpdated} from 'vue'
    import { useRoute } from 'vue-router'
    import { useRouter } from 'vue-router'
    import LeaderLine from 'leader-line-new'
    import {resumeItemFeedbacks, resumeItems } from '@/data/dummyData'
    import Recruit_List_interviewModal from '@/components/Recruit_List_interviewModal.vue'
    import env from '../api/env'
    import { useUserStore } from '../stores/user'

    const user = useUserStore()

    const route = useRoute()
    const router = useRouter()

    const getBackToMain = () => {
        isOpenInterview.value = false
        router.push('/')
    }
    
    const saveResume = async () => {

        try{
            await env.put(`/api/application/resume/${resumeId}/save`)
            const res = await env.get(`/api/application/${applicationId}`)
            const temp = res.data.result
            selectedItem.value = {
                companyName : temp.companyName,
                position : temp.position,
                experienceLevel : temp.experienceLevel,
                createdAt : temp.createdAt,
            }
            await nextTick()
            isOpenInterview.value = true
        } catch (error) {
            console.error('에러 발생:', error)
        }
    }
    const selectedItem = ref(null)
    const applicationId = route.params.applicationId
    
    const resumeId = route.params.resumeId 

    const sourceRefs = ref([])
    const targetRefs = ref([])
    const lines = reactive([])

    /* pinia 방식으로 SelfIntro에서 끌어오기
    import { useResumeStore } from '@/stores/resume';

    const resume = useResumeStore()
    const items = reactive([...resume.resumeItems]) 
    const item = reactive({
        question: '',
        answer: '',
    })
     const resumeId = ref(resume.resumeId)
     const feedbackItems = reactive(Array(items.length).fill('')) //대체
    */

    /* dummy
    const items = reactive([...resumeItems])
    
    const feedbackItems = reactive([...resumeItemFeedbacks])
    */
    const items = reactive([])
    const feedbackItems = reactive([])

    const fetchedFeedbacks = []
    onMounted(async () => {
        try {
            // 초기 자소서 작성본 가져오기
            
            const res1 = await env.get(`/api/resume/${resumeId}`)
            items.splice(0, items.length, ...res1.data.result)
            nowText.splice(0, nowText.length, ...Array(items.length).fill(''))
            beforeText.splice(0, beforeText.length, ...Array(items.length).fill(''))
            isBtOpen.splice(0, isBtOpen.length, ...Array(items.length).fill(false))
            feedbackCount.splice(0, feedbackCount.length, ...Array(items.length).fill(1))
           
            // 초기 피드백 가져오기
            for(const item of items){
                const res = await env.get(`/api/resume/feedback/${item.resumeItemId}`)
                fetchedFeedbacks.push(res.data.result)
            }
            feedbackItems.splice(0, feedbackItems.length, ...fetchedFeedbacks)
            await nextTick()
               for(let i = 0;i<items.length;i++){
                const el = document.getElementById(items[i].resumeItemId)
                if(el){
                nowText[i] = el.value = items[i].answer
                el.style.height = '1px'
                el.style.height = el.scrollHeight + 'px'
                }
            }
            // DOM 크기 변경까지 대기
            await nextTick()
            // 선 그리기
            for (let i = 0; i < feedbackItems.length; i++) {
                const source = sourceRefs.value[i]
                const target = targetRefs.value[i]
                if (source && target) {
                    const line = new LeaderLine(source, target, {
                      color: 'gray',
                      path: 'grid',
                      endPlug: 'arrow3',
                      size: 1,
                    })
                    lines.push(line)
            }
        }
        } catch (err) {
            console.error('API 오류:', err) 
        }
    })
    
    
    const nowText = reactive([])
    const beforeText = reactive([])
    const addQuestion = ref('')
    const backupHeight = ref(0)
    const isBtOpen = reactive([])
    const feedbackCount = reactive([])

    const isOpenInterview = ref(false)
    const isOpenAdd = ref(false)
    const isDisabled = ref(true)
    const isFirstFeedback = ref(false)
    const isLoading = ref(false)
    
    // DOM 뭔가 크기가 바뀔때마다 항상 선 위치 조정
    onUpdated(async () => {
         await nextTick()
        updateLinePosition()
    })

    function updateLinePosition(){
        lines.forEach(line => {
            if (line) line.position() // LeaderLine의 위치 재계산
        })
    }

    // 끝나면 선 반납(삭제)
    onBeforeUnmount(()=>{
        for (let i = 0; i < feedbackItems.length; i++) {
            lines[i].remove()
        }
    })

    function modifyMode(){
        isDisabled.value = false
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

    function backup(id, index){ // 이전 정보 백업
        backupHeight.value = document.getElementById(id).style.height
        beforeText[index] = nowText[index]
        isBtOpen[index] = true
    }

    function cancel(id, index) { // 취소 버튼
        document.getElementById(id).value = nowText[index] = beforeText[index]
        document.getElementById(id).style.height = backupHeight.value
        isBtOpen[index] = false
    }
    
    const modifyDone = async (index) => { // 완료 버튼 (수정)
        try{
        const item = {
            question: items[index].question,
            answer: nowText[index],
        }
        await env.put(`/api/resume/item/${items[index].resumeItemId}`, item)
        
        isBtOpen[index] = false
    }catch(error) {
         console.error('에러 발생:', error)
    }
    }
    
    const questionInsert = async()=>{
        isLoading.value = true
        try{
        if(!addQuestion.value) return
        const item = {
            question: addQuestion.value, 
            answer: '',
        }
        const res = await env.post(`/api/resume/${resumeId}/item`, item)
        items.push(res.data.result)
        nowText.push('')
        beforeText.push('')
        isBtOpen.push(false)
        feedbackCount.push(0)
        sourceRefs.value.push(null)
        targetRefs.value.push(null)
        isOpenAdd.value = false
        addQuestion.value = ''

    } catch (error) {
         console.error('에러 발생:', error)
    } finally {
        isLoading.value = false
    }
    }

    function questionInsertCancel(){
        isOpenAdd.value = false
        addQuestion.value = ''
    }

    const questionDelete = async (index) => {
        console.log('삭제할 resumeItemId:', items[index]?.resumeItemId)
        try{
            console.log('삭제 인덱스:', index)
            console.log('items:', items)
            console.log('nowText:', nowText)
            console.log('lines:', lines)
        await env.delete(`/api/resume/item/${items[index].resumeItemId}`)
        if (lines[index]) {
            lines[index].remove()
        }
        lines.splice(index, 1)
        sourceRefs.value.splice(index,1)
        targetRefs.value.splice(index,1)
        feedbackItems.splice(index,1)
        items.splice(index,1)
        nowText.splice(index,1)
        beforeText.splice(index,1)
        isBtOpen.splice(index,1)
        feedbackCount.splice(index,1)
        await nextTick()
        updateLinePosition()
        } catch(error) {
            console.error('에러 발생:', error) 
        }
    }

    function copyResume(index){
        items[index].answer = nowText[index]
    }

    let it = 0

    const beforeFeedback = (index) => {
        if(items[index] && !feedbackItems[index])  {
            for(let i = 0; i< items.length - feedbackItems.length; i++) {feedbackItems.push({
                feedbackId: it - 1,
                resumeItemId : it - 2,
                feedbackText : '',
            })
            it--
        }
    }
    }

    const feedback = async (index) => {
        isLoading.value = true
        try{
        beforeFeedback(index)

        const item = {
            question: items[index].question,
            answer: nowText[index]
        }
        const res = await env.post(`/api/resume/feedback/${items[index].resumeItemId}`, item)
        feedbackItems[index] = res.data.result
        
        feedbackCount[index]++

        await nextTick()
        await nextTick()
        await nextTick()

        if (lines[index]) {
            lines[index].remove()
            lines[index] = null;   // 참조 해제
        }
        if (sourceRefs.value[index] && targetRefs.value[index]) {
  lines[index] = new LeaderLine(
    sourceRefs.value[index],
    targetRefs.value[index],
    {
      color: 'gray',
      path: 'grid',
      endPlug: 'arrow3',
      size: 1,
    }
  );
}
        } catch(error){
        console.error('에러 발생:', error)
    } finally {
        isLoading.value = false
    }
    }
    /*
    const feedbackResumeItem = async (index) => { // (검사) 버튼 누르면 피드백 가져오기
        try {
            if(items.length > feedbackItemss.length) feedbackItemss.push('') 
            item.question = items[index].question
            item.answer = nowText[index]
            const res = await env.post(`/api/resume/feedback/${items[index].resumeItemId}`, item) 
            feedbackItemss[index] = res.data.result.feedbackText // 하루 횟수 제한도 고려

            const line = new LeaderLine(
                sourceRefs.value[index],
                targetRefs.value[index],
                {
                    color: 'gray',
                    path: 'grid',   
                    endPlug: 'arrow3',
                    size: 1,
                }
            )
            lines.push(line)
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
