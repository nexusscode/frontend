<!-- 보관함 탭 : 보관된 면접 -->
<template>
    <div class="h-screen-minus-84 ml-64 mr-64 flex"> <!-- h-screen -->
        <div class="flex flex-col flex-1 justify-between h-[calc(100vh-145px)]">
            <div>
                <div class="flex space-x-2 items-center">
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

                <div v-if="!userStore.userId" class="text-center font-medium text-xl py-52 mb-4">로그인을 해주세요</div>
                <div v-else-if="isLoading" class="text-center font-medium text-xl py-52 mb-4">로딩 중...</div>
                <div v-else>
                    <div v-if="titles.length > 0" class="mt-10 flex-grow grid grid-cols-5 gap-y-14 justify-items-start">
                        <div 
                            v-for="(item, idx) in titles" 
                            :key="idx"
                            class="flex flex-col w-full h-full justify-center items-center"
                        >
                            <button 
                                @click="gotoResult(item.sessionId)"
                                class="flex flex-col bg-white rounded-xl p-4 w-fit border border-[#D1D1D1]"
                            >
                                <img src="../assets/saved_icon.svg" alt="PDF" class="w-28" />
                            </button>
                            <span 
                                class="w-full truncate px-6 font-semibold mt-1 text-center"
                                :title="item?.title "
                            >
                                {{ item?.title }}
                            </span>
                        </div>
                    </div>
                    <div v-else class="text-center font-medium text-xl py-52 mb-4">
                        보관된 면접 기록이 없습니다.
                    </div>
                </div>
            </div>
            
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
                        @click="currentPage = page; isLoading = true; fetchSInterview(page)"
                        :class="['h-10 w-9 rounded-lg text-[#434343] text-sm font-medium', 
                            currentPage === page? 'bg-white' : '' ]"
                    >
                        {{ page }}
                    </button>
                    <button
                        v-if="(currentPageSet + 1) * paginationSize < totalPages"
                        @click="gotoNext"
                        class="h-10 px-2.5 py-1.5 text-[#434343] text-sm font-medium"
                    >
                        다음
                    </button>

                </div>
            </div>
        </div>
    </div>

</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import env from '@/api/env'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const totalPages = ref(1)
const pages = ref([])
const titles = ref([])
const isLoading = ref(true) // 로딩

async function fetchSInterview(page = 1) { // 보관된 면접 전체 조회
    try {
        const response = await env.get('/api/storage/interview/storage/getall', {
            params: {
                userId: parseInt(userStore.userId),
                page: page, 
                size: itemsPerPage,
            }
        })
        
        titles.value = response.data.result.content
        totalPages.value = response.data.result.totalPages;
        pages.value = Array.from({ length: totalPages.value }, (_, i) => i + 1); // 페이지 개수
        isLoading.value = false
        console.log("보관된 면접 전체 조회:" + titles.value)
        // console.log("item 길이 : " + items.value.length)
        // console.log("items : " + items.value)

    } catch (err) {
        console.error('데이터 불러오기 실패:', err)
    }
}
onMounted(fetchSInterview);

function gotoResult(sessionId) {
    router.push({ name: 'InterviewResult', params: { id : sessionId } });
}

// 페이지네이션
const currentPage = ref(1) // 현재 페이지
const itemsPerPage = 10 // 페이지 별 요소 수 MAX : 10개
const paginationSize = 5 // 페이지네이션 사이즈 : 5
const currentPageSet = computed(() => // 페이지 번호 셋의 idx
    Math.floor((currentPage.value - 1) / paginationSize)
)
const pageNumbersToShow = computed(() => { // 페이지 번호 셋 보이기
    const start = currentPageSet.value * paginationSize + 1
    const end = Math.min(start + paginationSize - 1, totalPages.value)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
function gotoNext() { // 다음
    const nextPage = (currentPageSet.value + 1) * paginationSize + 1
    if (nextPage <= totalPages.value) {
        currentPage.value = nextPage
    }
}
function gotoPrevious() { // 이전
    const prevPage = (currentPageSet.value - 1) * paginationSize + 1
    if (prevPage > 0) {
        currentPage.value = prevPage
    }
}

// 검색 기능
const search = ref('') // 사용자 입력 값(검색어)

async function handleSearch() {
    const keyword = search.value
    if (keyword === '') {
        fetchSInterview()
    } else {    
        try {
            const response = await env.get('/api/storage/interview/storage/getall', {
                params: {
                    userId: parseInt(userStore.userId),
                    searchWord: keyword,
                    page: 1, 
                    size: itemsPerPage,
                }
            })
            titles.value = response.data.result.content
            totalPages.value = response.data.result.totalPages;
            pages.value = Array.from({ length: totalPages.value }, (_, i) => i + 1); // 페이지 개수
            isLoading.value = false

        } catch (err) {
            console.error('데이터 불러오기 실패:', err)
        }
    }
    currentPage.value = 1 // 검색 시 첫 페이지로 초기화
}

</script>