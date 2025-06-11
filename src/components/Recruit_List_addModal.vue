<!-- 공고 등록 모달창 -->
<template> <!-- 모달창, z-index : 50-->
    <div class="fixed px-2 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="relative bg-white py-6 px-14 rounded-2xl ml-72 mr-72 w-full">
        <h2 class="py-2 text-2xl text-left font-semibold mb-5 mt-2">공고 등록하기</h2>
        <div class="flex items-center">
          <label class="w-18 shrink-0 font-medium text-lg text-[#212121]">회사이름</label>
          <div class="relative flex-1 ml-5"> <!-- 검색창과 드롭 다운 부분 -->
            <input 
              v-model="search"
              type="text"
              placeholder="회사이름을 작성해주세요"
              class="w-full rounded-lg px-6 py-3 font-regular text-lg border border-[#ADADAD] text-[#767676]"
              @keydown.enter="handleSearch"
            />

            <!-- 드롭 다운 -->
            <ul
              v-if="results.length && search"
              class="absolute w-full max-h-40 overflow-y-auto z-10 mt-1 bg-white border border-[#D1D1D1] divide-y divide-[#D1D1D1] rounded-sm"
            >
              <li
                v-for="(company, index) in results"
                :key="index"
                class="px-4 py-2 font-medium hover:bg-[#DFEAFC] cursor-pointer"
                @click="selectCompany(company)"
              >
                <div class="flex justify-between w-full">
                  <span>{{ company?.title }}</span>
                  <div class="flex justify-between w-1/2 text-right space-x-4 mr-8 gap-12">
                    <span class="w-1/2 truncate">{{ company?.experienceLevel }}</span>
                    <span class="w-1/2 truncate">{{ company?.companyName }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex items-center justify-end mt-7 mb-4 gap-2">
          <button 
            class="px-12 h-12 bg-white text-lg font-semibold text-btnBlue border-btnBlue rounded-xl hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white"
            @click="close"
          >
            취소하기
          </button>
          <button 
            class="px-12 h-12 bg-btnBlue text-lg font-semibold text-white rounded-xl hover:bg-hover active:bg-pressed"
            @click="createApplication"
          >
            등록하기 <!-- 수정 필요 -->
          </button> 
        </div>
          




      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { allItems, recruits } from '@/data/dummyData'
  import env from '@/api/env'
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()
  
  // 더미 데이터
  const Items = ref([...allItems])
  const companies = ref([...recruits])

  const selectedRecruit = ref(null)

  const emit = defineEmits(['close', 'recruit-added']) 
  const close = () => emit('close')

  const search = ref('') // 사용자 입력 값(검색어)
  const results = ref([]) // 검색 결과들
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
    // results.value = companies.value.filter(c =>
    //   c.company_name.toLowerCase().includes(keyword)
    // )
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

      emit('recruit-added') 
      emit('close')
    } catch (error) {
      console.error('신규 공고 등록 실패:', error)
    }
  }

  /*
  function formatDate() { // 날짜 포맷 맞추기
    const date = new Date()
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}/${m}/${d}`
  }

  function addRecruit() { // 공고 등록 기능
    const sRecruit = selectedRecruit.value
    if (!sRecruit) {
      // console.warn('회사 정보가 선택되지 않았습니다.')
      return
    }
    const newItem = {
      id: Math.max(...Items.value.map(item => item.id), 0) + 1, 
      company_name: sRecruit.company_name, 
      position: sRecruit.position, 
      experience_level: sRecruit.experience_level, 
      created_at: formatDate(), 
      stateCoverletter: 0, 
      stateInterview: 0,
    }
    // console.log('dummyData Update : ', newItem)
    // allItems.push(newItem)
    
    emit('close')
  }
  */

  </script>
  