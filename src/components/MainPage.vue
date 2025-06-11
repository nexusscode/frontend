<!-- 메인 화면 -->
<template>
    <div class="content flex flex-row w-full">
        <div class="w-1/2 pr-4 ml-32 flex flex-col justify-start items-start"> <!-- 왼쪽 영역 -->
            <span class="block text-5xl font-pretendard font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4A47D6] to-[#7E73D5]">
                AI가 자소서와 면접을
            </span>
            <span class="block text-5xl font-pretendard font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#413ED5] to-[#685FD6]">
                코칭해줍니다
            </span>
            <p class="text-xl mb-8 font-medium text-gray-600 mt-4">
                AI Resume & Interview Help
            </p>
            <button class="text-2xl px-8 py-3 mb-32 bg-gradient-to-r from-[#1F38B0] to-[#ABB9FB] text-white rounded-full"> <!-- 수정 필요 -->
                AI 분석 예시 보러가기
            </button>
        </div>

        <div class="w-1/2 pl-4"> <!-- 오른쪽 영역 -->
            <div class="bg-white ml-12 mr-32 bg-opacity-60 border border-white rounded-2xl p-8 shadow-xl shadow-rgba(118, 118, 118, 0.5)">
                <h2 class="text-left text-xl font-bold mb-4">회사 선택 후 코칭 시작</h2>

                <!-- 검색창과 드롭다운 -->
                <div class="relative flex-1">
                    <div class="flex items-center bg-white border border-btnBlue rounded-md px-4 py-3"> <!-- 검색창 -->
                        <img src="../assets/search_icon.svg" alt="" class="w-4 h-4 mr-2" />
                        <input
                            v-model="search"
                            type="text"
                            placeholder="AI 코칭을 받을 회사명을 입력하세요"
                            class="flex-1 bg-transparent outline-none text-sm text-[#767676]"
                            @keydown.enter="handleSearch"
                        />
                    </div>
                    <!-- 드롭 다운 -->
                    <ul
                    v-if="results.length && search"
                    class="absolute w-full max-h-32 text-sm overflow-y-auto z-10 mt-1 bg-white border border-[#D1D1D1] divide-y divide-[#D1D1D1] rounded-sm"
                    >
                        <li
                            v-for="(company, index) in results"
                            :key="index"
                            class="px-4 py-2 font-medium hover:bg-[#DFEAFC] cursor-pointer"
                            @click="selectCompany(company)"
                        >
                            <div class="flex justify-between w-full">
                                <span>{{ company.title }}</span>
                                <div class="flex justify-between w-2/3 text-right gap-2">
                                    <span class="w-1/3 truncate">{{ company.experienceLevel }}</span>
                                    <span class="w-2/3 truncate">{{ company.companyName }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="flex gap-3 justify-end">
                    <button class="mt-6 w-1/3 py-1.5 font-semibold bg-white border border-btnBlue rounded-xl text-btnBlue text-lg hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white">
                        예시보기 <!-- 기능 구현 필요, 수정 필요 -->
                    </button>

                    <button 
                        class="mt-6 w-1/3 py-1.5 font-semibold bg-btnBlue text-white rounded-xl text-lg hover:bg-hover active:bg-pressed"
                        @click="createApplication"
                    >
                        시작하기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { recruits } from '@/data/dummyData'
import env from '@/api/env'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter() 

// 더미 데이터
const companies = ref([...recruits])

// 검색 부분
const search = ref('') // 사용자 입력 값(검색어)
const results = ref([]) // 검색 결과들
const selectedRecruit = ref(null)
//const isLoading = ref(false) // 로딩 표시

async function handleSearch() { // 공고 검색 기능
    if (search.value.length < 2) return // 너무 짧으면 검색 안함
    try {
      const response = await env.get('/api/saramin', {
        params: {
          userId: parseInt(userStore.userId),
          keyword : search.value
        }
      })
      results.value = response.data.result
    } catch (err) {
      console.error('공고 상세 조회 실패:', err)
    }
}
function selectCompany(recruit) { // 공고 선택
    search.value = `${recruit.title} / ${recruit.experienceLevel} / ${recruit.companyName}`
    selectedRecruit.value = recruit
    results.value = []
    console.log("공고 선택 : " + selectedRecruit.value.saraminId)
}
async function createApplication() { // 공고 등록 기능
    const sRecruit = selectedRecruit.value
    console.log("공고 등록 : " + selectedRecruit.value.saraminId)
    if (!sRecruit) {
      // console.warn('회사 정보가 선택되지 않았습니다.')
      return
    }
    try {
      const saraminId = selectedRecruit.value.saraminId
      const response = await env.post('/api/application', {
        saraminJobId : saraminId,
        params: {
          userId: parseInt(userStore.userId)
        }
      })
      console.log('보내는 userId:', userStore.userId)
      console.log('보내는 saraminJobId:', saraminId)
      console.log('신규 공고 등록:', response.data.result)

      router.push({ name: 'Recruit'});
    } catch (error) {
      console.error('신규 공고 등록 실패:', error)
    }
  }





</script>