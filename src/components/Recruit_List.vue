<template>
    <div class="ml-36 mr-36 flex flex-col justify-between flex-1 h-[calc(100vh-145px)]">
        <div>
            <!-- 맨 위 라인 -->
            <div class="flex flex-row space-x-2 mb-4 justify-between">
                <div class  ="flex justify-between space-x-2 items-center">
                    <!-- 검색창 -->
                    <input
                        v-model="search"
                        type="text"
                        placeholder="검색어를 입력하세요."
                        class="px-6 w-80 h-10 rounded-xl border border-[#D1D1D1] text-sm text-[#535353]"
                    />
                
                    <!-- 검색 버튼 -->
                    <button
                        @click="handleSearch"
                        class="px-4 h-10 bg-white text-sm font-semibold text-btnBlue border-btnBlue rounded-xl hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white"
                    >
                        검색
                    </button>
                </div>

                <div class="flex flex-col mt-4 justify-end text-sm">        
                    <span>{{'자소서 검사는 항목당 10번, 면접검사는 하루 5번 가능합니다 :)'}}</span>
                </div>
            </div>

            <!-- 목록 -->
            <div class="overflow-hidden">
                <!-- 헤더 -->
                <div class="font-medium grid grid-cols-[0.4fr_2fr_1.9fr_1fr_1.7fr_1.4fr_1.3fr_1.3fr] gap-6 items-center px-4 py-2.5 rounded-t-xl border-b border-b-[#AAAAAA] bg-white bg-opacity-40 text-[#434343]">
                    <div class="flex justify-center">
                        <input type="checkbox" class="scale-150" v-model="allChecked" @change="toggleAll"/>
                    </div>
                    <div class="text-left">기업명</div>
                    <div class="text-left">지원 직무</div>
                    <div class="text-left">경력</div>
                    <div class="text-left">생성 날짜</div>
                    <div class="text-left min-w-[70px]">자소서검사</div>
                    <div class="text-left min-w-[70px]">AI 면접</div>
                    <div class="text-left truncate">공고 상세보기</div>
                </div>

                <!-- 요소 10개 -->
                <div v-if="paginatedItems.length > 0" class="mb-8 divide-y divide-[#AAAAAA] overflow-x-auto">
                    <div 
                        v-for="(item, index) in paginatedItems" 
                        :key="item.id" 
                        class="grid grid-cols-[0.4fr_2fr_1.9fr_1fr_1.7fr_1.4fr_1.3fr_1.3fr] gap-6 items-center px-4 py-2.5 bg-white bg-opacity-80 font-medium"
                    >
                        <div class="contents">
                            <div class="flex justify-center"> <!-- 체크 박스 -->
                                <input type="checkbox" class="scale-150" v-model="checkedItems[index]" />
                            </div>
                            <div class="text-left truncate">{{ item.company }}</div>
                            <div class="text-left truncate">{{ item.position }}</div>
                            <div class="text-left truncate">{{ item.career }}</div>
                            <div class="text-left truncate">{{ item.createdAt }}</div>
                            <div class="text-left min-w-[70px]">
                                <button 
                                    :class="[
                                        'bg-state px-2 py-1 rounded-full text-sm',
                                        getstateColor(item.stateCoverletter)
                                    ]"
                                >
                                    <router-link to="/coverletter">{{ getstateText(item.stateCoverletter, 0) }}</router-link>
                                </button>
                            </div>
                            <div class="text-left min-w-[70px]">
                                <button 
                                    :class="[
                                        'bg-state px-2 py-1 rounded-full text-sm',
                                        getstateColor(item.stateInterview, 1)
                                    ]"
                                >
                                    <router-link to="/interview">{{ getstateText(item.stateInterview) }}</router-link>
                                </button>
                            </div>
                            <div class="text-left cursor-pointer truncate"> <!-- 수정 필요(라우팅 수정 필요, 결과 없으면 클릭막기) -->
                                <router-link to="/">공고 상세보기</router-link>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div v-else class="text-center font-medium text-xl py-40 mb-4">
                    AI 검사를 받아보세요
                </div>
            </div>
        </div>
        <!-- 맨 아래 라인 -->
        <div class="relative h-10 flex items-end w-full">
            <div>
                <button class="bg-white h-10 px-4 py-1.5 rounded-xl text-btnBlue text-sm font-semibold border border-btnBlue hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white"> <!-- 수정 필요 -->
                    보관함에 저장
                </button>
                <button class="bg-white h-10 px-4 py-1.5 rounded-xl text-delRed text-sm font-semibold ml-2 hover:bg-delRed_hover"> <!-- 수정 필요 -->
                    삭제
                </button>
            </div>

            <!-- 페이지네이션 -->
            <div class="absolute left-1/2 transform -translate-x-1/2 flex">
                <button
                    v-if="currentPageSet > 0"
                    @click="goToPrevious"
                    class="h-10 px-2.5 py-1.5 text-[#434343] text-sm font-medium"
                >
                    이전
                </button>

                <button
                    v-for="page in pageNumbersToShow"
                    :key="page"
                    @click="currentPage = page; checkedItems = Array(items.length).fill(false); allChecked = false"
                    :class="['h-10 w-9 rounded-lg text-[#434343] text-sm font-medium', 
                        currentPage === page? 'bg-white' : '' ]"
                > <!-- bg-opacity-50 -> 이건 배경 때문에 거의 안 보여서 임의 수정함 -->
                    {{ page }}
                </button>

                <button
                    v-if="(currentPageSet + 1) * paginationSize < Pages"
                    @click="goToNext"
                    class="h-10 px-2.5 py-1.5 text-[#434343] text-sm font-medium"
                >
                    다음
                </button>
            </div>

            <div class="flex ml-auto items-center justify-center">
                <!-- 공고 등록 버튼 -->
                <button @click="isOpen = true"
                    class="flex items-center h-10 px-7 py-2 bg-btnBlue text-white font-semibold text-sm rounded-xl hover:bg-hover active:bg-pressed"
                >
                    <img src="../assets/add_icon.svg" alt="+" class="w-4 h-4 mr-2" /> 공고 등록
                </button>
                <addModal v-if="isOpen" @close="isOpen = false" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { ref, computed } from 'vue'
    import addModal from './Recruit_List_addModal.vue'
    import { allItems } from '@/data/dummyData'
  
    const items = ref([...allItems])

    const allChecked = ref(false) // 헤더 체크박스 체크 여부 false
    const checkedItems = ref(Array(items.length).fill(false)) // 각 항목의 체크 상태
    function toggleAll() { // 전부 선택/해제
        if (checkedItems.value.length !== items.value.length) {
            checkedItems.value = Array(items.value.length).fill(false)
        }
        for (let i = 0; i < checkedItems.value.length; i++) {
            checkedItems.value[i] = allChecked.value
        }
    }

    const isOpen = ref(false) // 모달 오픈여부 false

    const currentPage = ref(1) // 현재 페이지
    const itemsPerPage = 8 // 페이지 별 요소 수 MAX : 8개
    const paginationSize = 5 // 페이지네이션 사이즈 : 5
    const Pages = computed(() => // 전체 페이지 수 계산
        Math.ceil(items.value.length / itemsPerPage)
    )
    const currentPageSet = computed(() => // 페이지 번호 셋
        Math.floor((currentPage.value - 1) / paginationSize)
    )
    const pageNumbersToShow = computed(() => { // 페이지 번호 셋 보이기
        const start = currentPageSet.value * paginationSize + 1
        const end = Math.min(start + paginationSize - 1, Pages.value)
        return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    })
    
    const paginatedItems = computed(() => { // 페이지네이션된 아이템으로 슬라이싱
        const start = (currentPage.value - 1) * itemsPerPage
        return items.value.slice(start, start + itemsPerPage)
    })


    function goToNext() { // 다음
        const nextPage = (currentPageSet.value + 1) * paginationSize + 1
        if (nextPage <= Pages.value) {
            currentPage.value = nextPage
        }
        checkedItems.value = Array(items.length).fill(false)
        allChecked.value = false
    }
    function goToPrevious() { // 이전
        const prevPage = (currentPageSet.value - 1) * paginationSize + 1
        if (prevPage > 0) {
            currentPage.value = prevPage
        }
        checkedItems.value = Array(items.length).fill(false)
        allChecked.value = false
    }


    function getstateColor(state) {
        switch (state) {
            case 0:
            return 'bg-state'
            case 1:
            return 'bg-stateIng'
            case 2:
            return 'bg-stateComplete'
            case 3:
            return 'bg-stateError'
        }
    }
    function getstateText(state, type) {
        switch (state) {
            case 0:
                if (type==0) return '검사 하기'
                else return '면접 보기'
            case 1:
            return '검사중'
            case 2:
            return '완료'
            case 3:
            return '오류'
        }
    }

    // 검색 부분
    const search = ref('') // 사용자 입력 값(검색어)
    const results = ref([]) // 검색 결과들
    //const isLoading = ref(false) // 로딩 표시

    function handleSearch() {
        const keyword = search.value.trim().toLowerCase()
        if (keyword === '') {
            items.value = allItems // 검색어 없으면 전체 다시 보여줌
        } else {
            items.value = allItems.filter(c =>
                c.company.toLowerCase().includes(keyword) ||
                c.position.toLowerCase().includes(keyword) ||
                c.career.toLowerCase().includes(keyword)
            )
        }
        currentPage.value = 1 // 검색 시 첫 페이지로 초기화
        checkedItems.value = Array(items.length).fill(false)
        allChecked.value = false
    }

</script>