<!-- 공고 상세보기 -->
<template>
    <div class="bg-white ml-48 mr-48 bg-opacity-40 rounded-3xl border border-white p-6 mt-20">
        <div class="ml-12 mr-12">
            <div class="flex items-center justify-between space-x-2 mb-5">
                <span class="font-semibold text-2xl truncate">{{ saramin?.company_name }}&nbsp;&nbsp;-&nbsp;&nbsp;{{ saramin?.title }}</span>
                <span class="font-medium text-xl truncate">공고 등록일 : {{ saramin?.created_at }}</span>
            </div>
            <div class="bg-white b rounded-2xl border border-[#D1D1D1] p-8">
                <!-- 위의 정보 -->
                <div class="flex w-full">
                    <div class="grid grid-cols-1 gap-y-2 text-left w-2/5">
                        <div class="grid grid-cols-[1fr_2fr]">
                            <span class="font-semibold truncate">마감날짜</span>
                            <span class="truncate">{{ saramin?.end_date }}</span>
                        </div>
                        <div class="grid grid-cols-[1fr_2fr]">
                            <span class="font-semibold truncate">근무형태</span>
                            <span class="truncate">{{ saramin?.job_type }}</span>
                        </div>
                        <div class="grid grid-cols-[1fr_2fr]">
                            <span class="font-semibold truncate">경력</span>
                            <span class="truncate">{{ saramin?.experience_level }}</span>
                        </div>
                        <div class="grid grid-cols-[1fr_2fr]">
                            <span class="font-semibold truncate">학력</span>
                            <span class="truncate">{{ saramin?.required_education_level }}</span>
                        </div>
                        <div class="grid grid-cols-[1fr_2fr]">
                            <span class="font-semibold truncate">근무지역</span>
                            <span class="truncate">{{ saramin?.location }}</span>
                        </div>
                        <div class="grid grid-cols-[1fr_2fr]">
                            <span class="font-semibold truncate">연봉</span>
                            <span class="truncate">{{ saramin?.salary }}</span>
                        </div>

                        <!-- 직업 태그 -->
                        <div class="flex flex-wrap items-center gap-2 mt-2"> 
                            <div
                                v-for="(tag, index) in jobCodes"
                                :key="index"
                                class="px-2 py-1 bg-[#EFEFEF] rounded-full text-sm font-medium"
                            >
                                {{ tag }}
                            </div>
                        </div>
                    </div>


                    <!-- 세로선 -->
                    <div class="w-px bg-[#D1D1D1] h-auto mr-4"></div>

                    <div class="flex flex-col ml-2 w-3/5">
                        <div class="flex justify-between mb-2 items-center w-full">
                            <div class="flex items-center gap-x-3">
                                <span class="font-semibold">나의 자소서와 면접</span>
                                <span class="text-xs text-[#434343]">해당 공고의 기록을 확인할 수 있습니다</span>
                            </div>
                             <!-- 최근 자소서 버튼 -->
                            <button class="py-1.5 px-3 bg-white border border-btnBlue rounded-lg font-semibold text-btnBlue text-sm hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white">
                                최근 자소서 보기 <!-- 기능 구현 필요, 수정 필요 -->
                            </button>
                        </div>
                        
                        <!-- 자소서와 면접 목록 -->
                        <div class="w-full mb-3 border border-[#AAAAAA] rounded-md overflow-hidden">
                            <div class="flex flex-col w-full font-medium px-5 py-3 gap-y-1">
                                <div class="flex">
                                    <div class="w-3/5 flex">
                                        <span class="mr-2">최초 자소서 검사일 : </span>
                                        <span>25/04/23</span>
                                    </div>
                                    <div class="w-2/5 flex">
                                        <span class="mr-2">AI 자소서 검사 횟수 : </span>
                                        <span>3번</span>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="w-3/5 flex">
                                        <span class="mr-2">자소서 마지막 수정일 : </span>
                                        <span>25/04/23</span>
                                    </div>
                                    <div class="w-2/5 flex">
                                        <span class="mr-2">AI 면접 검사 횟수 : </span>
                                        <span>3번</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- <div
                                v-for="(r, index) in resume.slice(-5).reverse()"
                                :key="r.id"
                                class="py-2.5 min-h-10 items-center"
                                :class="{ 'border-b border-[#AAAAAA]': index < resume.slice(-5).length - 1 }"
                            >
                                <div class="grid grid-cols-[3fr_1fr_2fr_2.2fr_2fr] text-[15px] font-medium gap-x-2 text-left ml-2">
                                    <span class="truncate"><{{ r.title || '-' }}></span>
                                    <span class="truncate">{{ saramin?.experience_level || '-' }}</span>
                                    <span class="truncate">{{ r.created_at || '-' }}</span>
                                    <span @click="gotoSelfIntroResult(r.id)" class="text-aiBlue cursor-pointer truncate">자소서 결과보기</span>
                                    <span @click="gotoInterviewResult(r.id)" class="text-aiBlue cursor-pointer truncate">면접 결과보기</span>
                                </div>   면접 부분 수정 필요 -> r.id -->
                            <!-- </div> -->
                        </div>

                        <div class="flex flex-col">
                            <span class="flex text-sm w-full font-medium text-black mb-2">진행한 면접 내역</span>
                            <div class="flex w-full gap-x-2">
                                <div class="relative shadow-md flex justify-center w-1/3 border border-btnBlue rounded-xl">
                                    <div
                                        class="w-32 h-12 flex my-7 mx-2 blur-sm"
                                        style="border-radius: 50%; background: radial-gradient(circle at center, #A5C7FF 0%, #FFFFFF 100%);"
                                    >
                                    </div>
                                    <span class="w-full px-3 text-left text-sm font-medium top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                                        "차분한 태도, 강점이 될 수 있어요"
                                    </span>
                                </div>
                                <!-- 여기 수정 필요 -> for로 3개로 만들고, goto 필요? -->
                                <!-- 더미 DB 가져오기 -->
                                
                                


                                
                            </div>

                        </div>

                    </div>
                </div>
                
                <!-- 메모 -->
                <div class="w-full flex flex-col gap-y-2 mt-8">
                    <label for="memo" class="text-lg font-medium text-left">메모</label>
                    <textarea
                        id="memo"
                        v-model="memo"
                        rows="2"
                        class="w-full py-3 px-6 text-lg font-medium border border-[#D1D1D1] rounded-xl focus:ring-1 focus:ring-aiBlue focus:outline-none resize-none"
                    ></textarea>

                    
                    <button
                        @click="submitMemo"
                        class="self-end px-8 py-1.5 bg-white text-sm text-btnBlue font-semibold border border-btnBlue rounded-xl hover:bg-hover hover:text-white active:bg-pressed"
                    >
                        저장하기
                    </button>
                </div>
            
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { allItems, recruits, resumes } from '@/data/dummyData'

const route = useRoute()
const router = useRouter() 

const memo = ref('')

const id = Number(route.params.id) // 공고 id값
const item = computed(() => allItems.find(i => i.id === id)) // 공고

const saramin = computed(() => { // 사람인 공고
  const saraminId = item.value?.saramin_job_id
  return recruits.find(r => r.id === saraminId)
})

const resume = computed(() => { // 자소서
  return resumes.filter(r => r.application_id === id)
})

const jobCodes = computed(() => { // 사람인 직업 코드 split
  return saramin.value?.job_code?.split(',').map(tag => tag.trim()) || []
})

// 메모 저장
const submitMemo = () => {
  console.log('sumitMemo:', memo.value)
  // TODO: axios.post('/api/memo', { content: memo.value })
}

function gotoSelfIntroResult(resumeId) {
    router.push(`/coverletter/result/${resumeId}`)
}
function gotoInterviewResult(interviewSessionId) {
    router.push(`/interview/result/${interviewSessionId}`)
}


</script>