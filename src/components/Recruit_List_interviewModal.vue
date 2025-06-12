<!-- 면접 시작 모달창 : 면접관 선택 -->
<template> <!-- 모달창, z-index : 50-->
    <div class="fixed px-10 inset-0 bg-black/10 flex items-center justify-center z-50">
        <div class="relative bg-white py-6 px-14 rounded-2xl ml-80 mr-80 w-full">
            <h2 class="py-2 text-lg text-left font-semibold mb-5 mt-2">AI 면접관 선택</h2>
        
            <!-- 면접관 선택 -->
            <div class="flex justify-between mb-10">
                <div
                    v-for="image in Images"
                    :key="image.key"
                    class="flex flex-col items-center cursor-pointer"
                    @click="selectImage(image.key)"
                >
                    <img
                        :src="image.src"
                        :alt="image.alt"
                        class="w-50 h-50 rounded-full border-2 transition"
                        :class="{
                            'border-[#5089FC] shadow-lg shadow-black/20': selectedImage === image.key,
                            'border-transparent': selectedImage !== image.key
                        }"
                    />
                    <p class="mt-2 text-base font-medium">{{ image.alt }}</p>
                </div>
            </div>
            
            <!-- 정보들 -->
            <div class="grid grid-cols-2 gap-y-2 text-lg mb-10">
                <div class="flex mr-12">
                    <span class="w-28 text-[#212121]">기업명</span>
                    <span class="font-semibold">{{ Info.companyName }}</span>
                </div>
                <div class="flex ml-12">
                    <span class="w-28 text-[#212121]">공고명</span>
                    <span class="font-semibold">{{ Info.jobTitle }}</span>
                </div>

                <div class="flex mr-12">
                    <span class="w-28 text-[#212121]">경력</span>
                    <span class="font-semibold">{{ Info.experienceLevel }}</span>
                </div>
                <div class="flex ml-12">
                    <span class="w-28 text-[#212121]">공고생성날짜</span>
                    <span class="font-semibold">{{ formatDate(Info.createdAt) }}</span>
                </div>
            </div>

            <!-- 공지 텍스트 -->
            <div class="grid grid-cols-2 mt-4 mb-6">
                <div>
                    <p class="text-lg">해당 정보로 AI 면접을 시작하시겠습니까?</p>
                    <p class="text-lg">하루에 AI 면접은 최대 5번 받을 수 있습니다.</p>
                </div>
                <div></div>
            </div>

            <!-- 맨 마지막 라인 버튼 두 개 -->
            <div class="flex items-center justify-center mt-7 mb-4 gap-2">
                <button 
                    class="px-12 h-12 bg-white text-lg font-semibold border-btnBlue rounded-xl hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white"
                    @click="close"
                >
                    취소하기
                </button>
                <button 
                    class="px-12 h-12 bg-btnBlue text-lg font-semibold text-white rounded-xl hover:bg-hover active:bg-pressed"
                    @click="gotoInterview()"
                >
                    면접 보기
                </button> 
            </div>

        </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import interviewerIMG1 from '@/assets/interviewerKind.svg'
import interviewerIMG2 from '@/assets/interviewerPleasant.svg'
import interviewerIMG3 from '@/assets/interviewerCool.svg'
import env from '@/api/env'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const Props = defineProps({
    Info: {
        type: Object,
        required: true
    }
})

const Images = [
    { key: 'ALLOY', src: interviewerIMG1, alt: '친절하고 따뜻한' },
    { key: 'ECHO', src: interviewerIMG2, alt: '유쾌한' }, // 수정 필요 -> 없애던지, 사진으로 틀던지
    { key: 'ONYX', src: interviewerIMG3, alt: '논리적이며 냉철한' }
]
const selectedImage = ref('ALLOY') // 면접관 기본 : 친절한 면접관 
const selectImage = (key) => {
    selectedImage.value = key
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
}

const emit = defineEmits(['close']) // 모달 창 오픈 여부 결정
const close = () => emit('close')




// 면접 보기 기능 
async function gotoInterview() {
    try {
        const response = await env.post('/api/interview/start', {
                applicationId: Props.Info.applicationId,
                interviewType: selectedImage.value
            },
            {params: {
                userId: parseInt(userStore.userId)
            }
        })
        console.log(response.data.message)
        const sessionId = response.data.result
        // console.log("item 길이 : " + items.value.length)
        // console.log("items : " + items.value)
        router.push({ name: 'Interview', params: { applicationId : Props.Info.applicationId, id : sessionId } });
    } catch (err) {
        console.error('데이터 보내기 실패:', err)
    }
}


</script>
  