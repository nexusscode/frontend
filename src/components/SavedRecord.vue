<!-- 보관함 탭 : 보관된 자소서 및 면접들 -->
<template>
    <div class="h-screen-minus-84 mt-10 ml-64 mr-64 flex"> <!-- h-screen -->
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

                <div v-if="paginatedItems.length > 0" class="mt-10 flex-grow grid grid-cols-5 gap-y-14 justify-items-start">
                    <div 
                        v-for="(entry, idx) in paginatedItems" 
                        :key="idx"
                        class="flex flex-col w-full h-full justify-center items-center"
                    >
                        <button 
                            @click="gotoResult(entry)"
                            class="flex flex-col bg-white rounded-xl p-4 w-fit border border-[#D1D1D1]"
                        >
                            <img src="../assets/pdf_icon.svg" alt="PDF" class="w-28" />
                        </button>
                        <span 
                            class="w-full truncate px-6 font-semibold mt-1 text-center"
                            :title="entry.company_name + ' - ' + entry.title"
                        >
                            {{ entry.company_name }} - {{ entry.title }}
                        </span>
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
                        @click="currentPage = page;"
                        :class="['h-10 w-9 rounded-lg text-[#434343] text-sm font-medium', 
                            currentPage === page? 'bg-white' : '' ]"
                    >
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
            </div>
        </div>
    </div>
    
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { allItems, resumes, interview_sessions } from '@/data/dummyData' // 여기 수정 -> 보관함에 들어가있는 걸 가져오기

const router = useRouter()

// const resumeTitles = resumes.map(r => r.title)
// const sessionTitles = interview_sessions.map(is => is.title) 
// const allTitles = [...resumeTitles, ...sessionTitles]
const allTitles = computed(() => { // 여기 수정 -> 보관함에 들어가있는 걸 가져오기
    const mappedResumes = resumes.map(resume => {
        const matchedItem = allItems.find(item => item.id === resume.application_id)
        return {
            id : resume.id,
            route : '/coverletter/result/',
            icon : '', // 여기 수정 -> 아이콘 경로
            title : resume.title,
            company_name : matchedItem?.company_name || '알 수 없음',
            type : 'resume'
        }
    })

    const mappedSessions = interview_sessions.map(session => {
        const matchedItem = allItems.find(item => item.id === session.application_id)
        return {
            id : session.id,
            route : '/interview/result/',
            icon : '', // 여기 수정 -> 아이콘 경로
            title : session.title,
            company_name : matchedItem?.company_name || '알 수 없음',
            type : 'interview'
        }
    })

    return [...mappedResumes, ...mappedSessions]
})
const titles = ref([...allTitles.value])
//console.log("items : " + items.value[0].title)

function gotoResult(entry) {
  const fullRoute = `${entry.route}${entry.id}`
  router.push(fullRoute)
}

// 페이지네이션
const currentPage = ref(1) // 현재 페이지
const itemsPerPage = 10 // 페이지 별 요소 수 MAX : 10개
const paginationSize = 5 // 페이지네이션 사이즈 : 5
const Pages = computed(() => // 전체 페이지 수 계산
    Math.ceil(titles.value.length / itemsPerPage)
)
const currentPageSet = computed(() => // 페이지 번호 셋
    Math.floor((currentPage.value - 1) / paginationSize)
)
const pageNumbersToShow = computed(() => { // 페이지 번호 셋 보이기
    const start = currentPageSet.value * paginationSize + 1
    const end = Math.min(start + paginationSize - 1, Pages.value)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
// console.log("페이지 수 : " + pageNumbersToShow.value)
const paginatedItems = computed(() => { // 페이지네이션된 아이템으로 슬라이싱
    const start = (currentPage.value - 1) * itemsPerPage
    return titles.value.slice(start, start + itemsPerPage)
})
function gotoNext() { // 다음
    const nextPage = (currentPageSet.value + 1) * paginationSize + 1
    if (nextPage <= Pages.value) {
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

function handleSearch() {
    const keyword = search.value.trim().toLowerCase()
    if (keyword === '') {
        titles.value = allTitles.value // 검색어 없으면 전체 보여줌
    } else {
        titles.value = allTitles.value.filter(t =>
            t.company_name.toLowerCase().includes(keyword) ||
            t.title.toLowerCase().includes(keyword)
        )
    }
    currentPage.value = 1 // 검색 시 첫 페이지로 초기화
}

</script>