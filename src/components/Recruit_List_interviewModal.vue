<!-- 면접 시작 모달창 : 면접관 선택 -->
<template> <!-- 모달창, z-index : 50-->
    <div class="fixed px-10 inset-0 bg-black/10 flex items-center justify-center z-50">
        <div class="relative bg-white py-6 px-14 rounded-2xl ml-80 mr-80 w-full">
            <h2 class="py-2 text-lg text-left font-semibold mb-5 mt-2">AI 면접관 선택</h2>
        
            <!-- 면접관 선택 -->
            <div class="flex justify-between mb-10">
                <div
                    v-for="(image, index) in Images"
                    :key="index"
                    class="flex flex-col items-center cursor-pointer"
                    @click="selectImage(index)"
                >
                    <img
                        :src="image.src"
                        :alt="image.alt"
                        class="w-50 h-50 rounded-full border-2 transition"
                        :class="{
                        'border-[#5089FC] shadow-lg shadow-black/20': selectedImage === index,
                        'border-transparent': selectedImage !== index
                        }"
                    />
                    <p class="mt-2 text-base font-medium">{{ image.alt }}</p>
                </div>
            </div>
            
            <!-- 정보들 -->
            <div class="grid grid-cols-2 gap-y-2 text-lg mb-10">
                <div class="flex mr-12">
                    <span class="w-28 text-[#212121]">기업명</span>
                    <span class="font-semibold">{{ Info.company_name }}</span>
                </div>
                <div class="flex ml-12">
                    <span class="w-28 text-[#212121]">지원 직무</span>
                    <span class="font-semibold">{{ Info.position }}</span>
                </div>

                <div class="flex mr-12">
                    <span class="w-28 text-[#212121]">경력</span>
                    <span class="font-semibold">{{ Info.experience_level }}</span>
                </div>
                <div class="flex ml-12">
                    <span class="w-28 text-[#212121]">공고생성날짜</span>
                    <span class="font-semibold">{{ Info.created_at }}</span>
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

  const router = useRouter()

  const Props = defineProps({
    Info: {
        type: Object,
        required: true
    }
  })

  const Images = [
    { src: interviewerIMG1, alt: '친절하고 따뜻한' },
    { src: interviewerIMG2, alt: '유쾌한' },
    { src: interviewerIMG3, alt: '논리적이며 냉철한' }
  ]
  const selectedImage = ref(0) // 면접관 기본 : 친절한 면접관 
  const selectImage = (index) => {
    selectedImage.value = index
  }

  const emit = defineEmits(['close']) // 모달 창 오픈 여부 결정
  const close = () => emit('close')

  // 면접 보기 기능 
  function gotoInterview() {
    const query = { // 일단 안 씀 -. 수정 필요?
        company_name: Props.Info.company_name,
        position: Props.Info.position,
        experience_level: Props.Info.experience_level,
        date: Props.Info.created_at,
        interviewer: selectedImage.value, // 면접관 인덱스 번호 넘김 (착함0, 유쾌1, 냉철2)
    };
    console.log('쿼리 : ', query);

    // router.push({
    //     path: '/interview',
    //     query: query,
    // });
    router.push({ name: 'Interview', params: { sessionId : "interviewSession0", interviewerId : selectedImage.value }, });
    // 여기 면접세션 0으로 임시 지정 -> 나중에 수정 필요

  }

  </script>
  