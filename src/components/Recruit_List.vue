<template>
    <!-- 맨 위 라인 -->
    <div class="flex ml-36 mr-36 items-center space-x-2 py-4 justify-between items-center">
        <div class  ="flex justify-between items-center space-x-2">
            <!-- 검색창 -->
            <input
                type="text"
                placeholder="검색어를 입력하세요."
                class="px-6 w-80 h-10 rounded-xl border border-[#D1D1D1] text-sm text-[#535353]"
            />
        
            <!-- 검색 버튼 -->
            <button
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
    <div class="overflow-hidden ml-36 mr-36">
        <!-- 헤더 -->
        <div class="font-medium grid grid-cols-[0.4fr_2fr_1.9fr_1fr_1.7fr_1.4fr_1.3fr_1.3fr] gap-6 items-center px-4 py-2.5 rounded-t-xl border-b border-b-[#AAAAAA] bg-white bg-opacity-40 text-[#434343]">
            <div class="flex justify-center">
                <input type="checkbox" class="scale-150" v-model="allChecked" @change="toggleAll"/>
            </div>
            <div class="text-left">기업명</div>
            <div class="text-left">지원 직무</div>
            <div class="text-left">경력</div>
            <div class="text-left">생성 날짜</div>
            <div class="text-left">자소서검사</div>
            <div class="text-left">AI 면접</div>
            <div class="text-left">공고 상세보기</div>
        </div>

        <!-- 요소 10개 -->
        <div v-if="paginatedItems.length > 0" class="mb-10 divide-y divide-[#AAAAAA] text-sm overflow-x-auto">
            <div 
                v-for="(item, index) in paginatedItems" 
                :key="item.id" 
                class="grid grid-cols-[0.4fr_2fr_1.9fr_1fr_1.7fr_1.4fr_1.3fr_1.3fr] gap-6 items-center px-4 py-2.5 text-base bg-white bg-opacity-80 font-semibold"
            >
                <div class="contents">
                    <div class="flex justify-center"> <!-- 체크 박스 -->
                        <input type="checkbox" class="scale-150" v-model="checkedItems[index]" />
                    </div>
                    <div class="text-left">{{ item.company }}</div>
                    <div class="text-left">{{ item.position }}</div>
                    <div class="text-left">{{ item.career }}</div>
                    <div class="text-left">{{ item.createdAt }}</div>
                    <div class="text-left">
                        <button class="bg-state px-2 py-1 rounded-full text-sm"> <!-- 수정 필요(완료표시 내는 거) -->
                            <router-link to="/coverletter">검사 하기</router-link>
                        </button>
                    </div>
                    <div class="text-left">
                        <button class="bg-state px-2 py-1 rounded-full text-sm"> <!-- 수정 필요(완료표시 내는 거) -->
                            <router-link to="/interview">면접 보기</router-link>
                        </button>
                    </div>
                    <div class="text-left cursor-pointer"> <!-- 수정 필요(라우팅 수정 필요, 결과 없으면 클릭막기) -->
                        <router-link to="/">공고 상세보기</router-link>
                    </div>
                </div>
                
            </div>
        </div>
        <div v-else class="text-center font-medium text-xl py-40 mb-6">
            AI 검사를 받아보세요
        </div>

        <!-- 맨 아래 라인 -->
        <div class="relative h-10 mb-16 flex items-center w-full">
            <div>
                <button class="bg-white h-10 px-4 py-1.5 rounded-xl text-btnBlue text-sm font-semibold border border-btnBlue hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white"> <!-- 수정 필요 -->
                    보관함에 저장
                </button>
                <button class="bg-white h-10 px-4 py-1.5 rounded-xl text-deleteRed text-sm font-semibold ml-2 hover:bg-[#78AAFF] active:bg-[#2D64C8]"> <!-- 수정 필요 + hover 수정 필요 -->
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
                    @click="currentPage = page"
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

            <div class="flex ml-auto space-x-2 items-center justify-center">
                <!-- 공고 등록 버튼 ------------------------ 수정 예정임-->
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
    
    const items = ref(Array.from({ length: 70 }, (_, i) => ({ // 목록 더미데이터(임시로 80개, 0개)
        id: i,
        company: `(주)리더스시스템즈 ${i + 1}`,
        position: "Full Stack 개발자",
        career: "경력/무관",
        createdAt: "2025/04/02",
    })));

    const allChecked = ref(false) // 헤더 체크박스 체크 여부 false
    const checkedItems = ref(Array(items.length).fill(false)) // 각 항목의 체크 상태
    function toggleAll() { // 전부 선택/해제
        checkedItems.value = checkedItems.value.map(() => allChecked.value)
    }

    const isOpen = ref(false) // 모달 오픈여부 false

    const currentPage = ref(1) // 현재 페이지
    const itemsPerPage = 10 // 페이지 별 요소 수 MAX : 10개
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
    }
    function goToPrevious() { // 이전
    const prevPage = (currentPageSet.value - 1) * paginationSize + 1
        if (prevPage > 0) {
            currentPage.value = prevPage
        }
    }
</script>