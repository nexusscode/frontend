<!-- AI 검사 탭 : 공고들 목록 -->
<template>
    <div class="h-screen-minus-84 flex mt-10 ml-20 mr-20 px-8"> <!-- relative mt-8 top-10 min-h-[calc(100vh-84px)] -->
    <div class="ml-36 mr-36 flex-1 flex flex-col justify-between h-[calc(100vh-145px)]">
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

                <!-- 요소 -->
                <div v-if="paginatedItems.length > 0" class="mb-8 divide-y divide-[#AAAAAA] overflow-x-auto">
                    <div 
                        v-for="(item, index) in paginatedItems" 
                        :key="item.id" 
                        class="grid grid-cols-[0.4fr_2fr_1.9fr_1fr_1.7fr_1.4fr_1.3fr_1.3fr] gap-6 items-center px-4 py-2.5 bg-white bg-opacity-80 font-medium"
                    >
                        <div class="contents">
                            <div class="flex justify-center"> <!-- 체크 박스 -->
                                <input 
                                    type="checkbox" 
                                    class="scale-150" 
                                    :value="item.id" 
                                    v-model="selectedIds"
                                /> <!-- @change="checkbox_console_test(item.id)" -->
                            </div>
                            <div class="text-left truncate">{{ item.company_name }}</div>
                            <div class="text-left truncate">{{ item.position }}</div>
                            <div class="text-left truncate">{{ item.experience_level }}</div>
                            <div class="text-left truncate">{{ item.created_at }}</div>
                            <div class="text-left min-w-[70px]">
                                <button 
                                    :class="[
                                        'bg-state px-2 py-1 rounded-full text-sm',
                                        getstateConfig(item.stateCoverletter, 0).color
                                    ]"
                                    :disabled="getstateConfig(item.stateCoverletter, 0).disabled"
                                    @click="handleChipClick(getstateConfig(item.stateCoverletter, 0).action, item)"
                                >
                                    {{ getstateConfig(item.stateCoverletter, 0).text }}
                                </button>
                            </div>
                            <div class="text-left min-w-[70px]">
                                <button 
                                    :class="[
                                        'bg-state px-2 py-1 rounded-full text-sm',
                                        getstateConfig(item.stateInterview, 1).color
                                    ]"
                                    :disabled="getstateConfig(item.stateInterview, 1).disabled"
                                    @click="handleChipClick(getstateConfig(item.stateInterview, 1).action, item)"
                                >
                                    {{ getstateConfig(item.stateInterview, 1).text }}
                                </button>
                                <interviewModal v-if="isOpenInterviewModal" :Info="selectedItem" @close="isOpenInterviewModal = false" />
                            </div>
                            <!-- <div class="text-left cursor-pointer truncate">  -->
                                <span @click="gotoRecruitInfo(item.id)" class="text-left cursor-pointer truncate">공고 상세보기</span>
                                <!-- <router-link to="/recruitinfo">공고 상세보기</router-link> -->
                            <!-- </div> -->
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
            <!-- 페이지네이션 -->
            <div class="absolute left-1/2 transform -translate-x-1/2 flex">
                <button
                    v-if="currentPageSet > 0"
                    @click="gotoPrevious"
                    class="h-10 px-2.5 py-1.5 text-[#434343] text-sm font-medium"
                >
                    이전
                </button>

                <button
                    v-for="page in pageNumbersToShow"
                    :key="page"
                    @click="currentPage = page; checkedItems = Array(items.length).fill(false); allChecked = false; selectedIds = []"
                    :class="['h-10 w-9 rounded-lg text-[#434343] text-sm font-medium', 
                        currentPage === page? 'bg-white' : '' ]"
                > <!-- bg-opacity-50 -> 이건 배경 때문에 거의 안 보여서 임의 변경함 -->
                    {{ page }}
                </button>

                <button
                    v-if="(currentPageSet + 1) * paginationSize < Pages"
                    @click="gotoNext"
                    class="h-10 px-2.5 py-1.5 text-[#434343] text-sm font-medium"
                >
                    다음
                </button>
            </div>

            <div class="flex ml-auto items-center justify-center gap-2">
                <div>
                    <button class="bg-white h-10 px-4 py-1.5 rounded-xl text-delRed text-sm font-semibold ml-2 hover:bg-delRed_hover"> <!-- 수정 필요 -->
                        삭제
                    </button>
                </div>
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
    </div>
</template>
  
<script setup>
    import { ref, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import addModal from './Recruit_List_addModal.vue'
    import interviewModal from './Recruit_List_interviewModal.vue'
    import { allItems } from '@/data/dummyData'
  
    const router = useRouter() 
    const items = ref([...allItems])

    // 체크 박스
    const allChecked = ref(false) // 헤더 체크박스 체크 여부 false
    const checkedItems = ref(Array(items.length).fill(false)) // 각 항목의 체크 상태
    const selectedIds = ref([]); // 체크한 요소 id값들 저장

    function toggleAll() { // 전부 선택/해제
        if (checkedItems.value.length !== items.value.length) {
            checkedItems.value = Array(items.value.length).fill(false)
        }

        paginatedItems.value.forEach(item => {
            const index = items.value.findIndex(i => i.id === item.id);
            checkedItems.value[index] = allChecked.value;

            if (allChecked.value) {
                if (!selectedIds.value.includes(item.id)) {
                    selectedIds.value.push(item.id);
                }
            } else {
                 selectedIds.value = [];
            }
        });

        console.log("toggleAll : ", selectedIds.value);
    }

    // 공고 등록 모달창 
    const isOpen = ref(false) // 공고등록 모달 오픈여부 false
    const isOpenInterviewModal = ref(false) // 면접 모달 오픈여부 false

    const selectedItem = ref(null)


    // 페이지네이션
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

    function gotoNext() { // 다음
        const nextPage = (currentPageSet.value + 1) * paginationSize + 1
        if (nextPage <= Pages.value) {
            currentPage.value = nextPage
        }
        checkedItems.value = Array(items.length).fill(false)
        allChecked.value = false
        selectedIds.value = []
    }
    function gotoPrevious() { // 이전
        const prevPage = (currentPageSet.value - 1) * paginationSize + 1
        if (prevPage > 0) {
            currentPage.value = prevPage
        }
        checkedItems.value = Array(items.length).fill(false)
        allChecked.value = false
        selectedIds.value = []
    }

    // state 칩 
    function getstateConfig(state, type) {
        switch (state) {
            case 0:
                return{
                    text: type===0 ? '검사 하기' : '면접 보기',
                    color: 'bg-state',
                    action: type===0 ? 'gotoCoverLetter' : 'interviewModal',
                    disabled: false,
                }
            case 1:
                return {
                    text: '검사중',
                    color: 'bg-stateIng',
                    action: null,
                    disabled: true,
                }
            case 2:
                return {
                    text: '완료',
                    color: 'bg-stateComplete',
                    action: type===0 ? 'gotoCLResult' : 'gotoInResult',
                    disabled: false,
                }
            // case 3:
            //     return {
            //         text: '오류',
            //         color: 'bg-stateError',
            //         action: null,
            //         disabled: true,
            //     }
        }
    }
    function handleChipClick(action, item) {
        if (action === 'gotoCoverLetter') {
            // router.push(`/coverletter/${item.id}`)
            const resumeId = 'resume0'; // 임시로 지정해둠 여기 수정 -> 면접 세션 어떻게 할건지?
            router.push({ name: 'SelfIntro', params: { id : resumeId } });
        } else if (action === 'interviewModal') {
            selectedItem.value = {
                company_name: item.company_name,
                position: item.position,
                experience_level: item.experience_level,
                created_at: item.created_at,
            }
            isOpenInterviewModal.value = true
        } else if (action === 'gotoCLResult') {
            //router.push(`/coverletter/result/${item.id}`) // 수정 필요 -> 자소서 아이디로 변경하기
            const resumeId = 'resume0'; // 임시로 지정해둠 여기 수정 -> 면접 세션 어떻게 할건지?
            router.push({ name: 'SelfIntroResult', params: { id : resumeId } });
        } else if (action === 'gotoInResult') {
            // router.push(`/analysisrecord/${item.id}`)
            const sessionId = 'interviewSession0'; // 임시로 지정해둠 여기 수정 -> 면접 세션 어떻게 할건지?
            router.push({ name: 'InterviewResult', params: { id : sessionId } });

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
                c.company_name.toLowerCase().includes(keyword) ||
                c.position.toLowerCase().includes(keyword) ||
                c.experience_level.toLowerCase().includes(keyword)
            )
        }
        currentPage.value = 1 // 검색 시 첫 페이지로 초기화
        checkedItems.value = Array(items.length).fill(false)
        allChecked.value = false
    }

    function gotoRecruitInfo(id) {
        router.push({ name: 'RecruitInfo', params: { id } });
    }









    // 테스트용 코드(checked)
    const checkbox_console_test = (id) => {
        console.log("현재 선택된 ID 목록:", [...selectedIds.value]);
        console.log(
            selectedIds.value.includes(id)
            ? `선택됨: ${id}`
            : `해제됨: ${id}`
        );
    };

</script>