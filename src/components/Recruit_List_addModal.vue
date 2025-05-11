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
              @input="handleSearch"
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
                  <span>{{ company.position }}</span>
                  <div class="flex justify-between w-1/2 text-right space-x-4 mr-8 gap-12">
                    <span class="w-1/2 truncate">{{ company.career }}</span>
                    <span class="w-1/2 truncate">{{ company.company }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex items-center justify-end mt-7 mb-4 gap-2">
          <button 
            class="px-12 h-12 bg-white text-base font-semibold text-btnBlue border-btnBlue rounded-xl hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white"
            @click.self="close"
          >
            취소하기
          </button>
          <button class="px-12 h-12 bg-btnBlue text-lg font-semibold text-white rounded-xl hover:bg-hover active:bg-pressed">
            등록하기 <!-- 수정 필요 -->
          </button> 
        </div>
          




      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { allItems } from '@/data/dummyData'
  
  // 더미 데이터
  const companies = ref([...allItems])

  const emit = defineEmits(['close']) // 모달 창 오픈 여부 결정
  const close = () => emit('close')

  const search = ref('') // 사용자 입력 값(검색어)
  const results = ref([]) // 검색 결과들
  //const isLoading = ref(false) // 로딩 표시

  function handleSearch() {
    const keyword = search.value.toLowerCase()
    results.value = companies.value.filter(c =>
      c.company.toLowerCase().includes(keyword)
    )
  }
  function selectCompany(company) {
    search.value = `${company.position} / ${company.career} / ${company.company}`
    results.value = []
  }

  </script>
  