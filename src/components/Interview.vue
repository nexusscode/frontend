<!-- 면접 화면 -->
<template>
  <div class="ml-48 mr-48 text-left">
     <div class="inline-block h-10 font-semibold mb-3 px-8 leading-10 bg-white bg-opacity-60 border border-[#D1D1D1] rounded-2xl">
        <span class="font-semibold truncate">{{ item?.company_name }}&nbsp;&nbsp;-&nbsp;&nbsp;{{ item?.position }}</span>
      </div>

      <div class="flex flex-col w-full p-8 bg-white bg-opacity-70 border border-[#D1D1D1] rounded-2xl"> <!-- 여기 수정 필요 -> 높이 수정하기 -->
        <!-- 맨 위 줄 -->
        <div class="flex items-center h-10 justify-between gap-2 mb-3">
          <button 
            :class="[
              'h-10 w-40 font-medium rounded-xl transition-colors',
              showQuestion 
              ? 'bg-white border border-btnBlue hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white' 
              : 'bg-btnBlue text-white hover:bg-hover active:bg-pressed'
            ]"
            @click="toggleQuestion"
          >
            {{ showQuestion ? '질문 접기' : '클릭하여 질문 보기' }}
          </button>

          <div class="flex-1 flex h-10 px-4 bg-white text-left items-center border border-[#D1D1D1] rounded-xl">
            <span v-if="showQuestion">{{ q_idx + 1 }}. {{ questions[q_idx]?.question_text }}</span>
          </div>
        </div>
        
        <!-- 본문 -->
        <div class="flex flex-grow">
          <div class="flex w-full h-full overflow-hidden justify-between border border-[#D1D1D1] rounded-2xl">
            <!-- <div class="w-3/4 bg-hover2_bg flex justify-center items-center">영상 필요 -> 수정 필요 -->
              <!-- 면접관 영상이 들어갈 위치입니다. -->
            <!-- </div> -->
             <div class="relative w-3/4 bg-hover2_bg flex justify-center items-center">
              <video
                  class="block w-full"
                  autoplay
                  playsinline
                >
                  <source src="/videos/sample.mp4" type="video/mp4" />
                  브라우저가 video 태그를 지원하지 않습니다.
                </video>


                <!-- 웹캠 영상 (작은 화면) -->
                <video
                  ref="webcamRef"
                  autoplay
                  playsinline
                  class="absolute bottom-4 left-4 w-fit h-28 rounded-2xl bg-white"
                ></video>

                <!-- 음성 인식 확인용 -->
                <!-- <div class="max-h-20 overflow-y-auto absolute bottom-4 left-44 right-4 text-white ml-2 text-lg bg-black/60 p-3 rounded">
                  <p v-if="transcript">{{ transcript }}</p>
                  <p v-else class="text-[#D1D1D1]">여기에 음성 인식 결과가 표시됩니다.</p>
                </div> -->
              </div>



            <div class="h-full w-1/4 p-3 ml-1 justify-start bg-white items-start">
              <div class="flex mb-3 h-6">
                <span class="font-medium text-left">AI 조언</span>
              </div>
              <div class="flex flex-col h-[calc(100vh-330px)] max-w-full text-left"> <!-- 높이 수정 필요 -->
                <div class="flex-grow overflow-auto mb-4">
                  <div 
                    v-for="(msg, index) in messages" 
                    :key="index" 
                    class="inline-block mb-4 break-all whitespace-pre-line text-xs text-left font-medium px-2 py-4 bg-[#EAF5FF] rounded-xl"
                  >
                    <div>"{{ msg }}"</div>
                  </div>
                  
                </div>

                <div class="flex justify-center h-9">
                  <button 
                    class="h-9 w-40 font-medium rounded-xl bg-btnBlue text-white hover:bg-hover active:bg-pressed"
                    @click="addMessage"
                  >
                    질문 의도 파악하기
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- 아래 라인 -->
        <div class="flex h-12 mt-6 items-center justify-between">
          <!-- 왼쪽 -->
          <div class="flex items-center justify-start gap-2">
            <img src="../assets/time_icon.svg" class="w-4 h-4" alt="시간" />
            <span class="font-semibold w-[55px] text-center">{{ elapsedTime }}</span>
          </div>

          <!-- 가운데 -->
          <div class="flex items-center justify-center gap-3">
            <button 
              class="h-10 w-28 font-semibold rounded-xl bg-white text-btnBlue border border-btnBlue hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white"
              @click="resetTranscript"
            >
              재답변
            </button>
            <div 
              class="group border items-center flex h-10 px-5 rounded-3xl cursor-pointer active:bg-pressed"
              @click="toggleRecording"
              :class="{ 
                'bg-btnBlue hover:bg-hover': isRecording, 
                'bg-white hover:bg-hover2_bg' : !isRecording
              }"
            >
              <img 
                src="../assets/mic_icon.svg" 
                class="w-4 h-4" 
                alt="마이크"
                :class="{ 
                  'invert': isRecording,
                  'group-active:invert': !isRecording, 
                 }"
              />
            </div>
            <button 
              class="h-10 w-28 font-semibold rounded-xl bg-btnBlue text-white hover:bg-hover active:bg-pressed"
              @click="completeTranscript" 
            >
              답변완료
            </button><!-- 기능 구현 필요 -> 수정 필요(api / 보내기) + 질문 넘기기 -->
          </div>

          <!-- 오른쪽 -->
          <div class="flex items-center justify-start">
            <button 
              class="h-10 w-28 font-medium rounded-3xl bg-white text-black shadow-lg hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white"
              @click="inc_q_idx" 
            >
              질문 넘기기
            </button>
          </div>

        </div>
      </div>
  </div>

  <!-- 면접 종료 모달창 -->
  <div v-if="showCompleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white gap-y-8 p-8 w-1/3 rounded-xl flex flex-col items-center justify-center">
      <div class="flex w-full text-2xl font-medium">면접을 종료하시겠습니까?</div>
      <div class="border border-[#D1D1D1] w-fit px-8 py-2 my-2 text-xl rounded-full">
        <span class="font-medium">면접 시간</span>
        <span class="px-4">|</span>
        <span class="font-semibold text-btnBlue">{{ endTime }}</span>
      </div>
      <div class="flex justify-center gap-2">
        <button 
          @click="showCompleteModal = false"
          class="px-10 py-1 bg-white text-btnBlue border border-btnBlue text-lg font-medium rounded-xl hover:bg-hover2_bg hover:text-hover2_txt active:bg-pressed active:text-white"
        >
          취소
        </button>
        <button 
          @click="confirmEnd" 
          class="px-10 py-1 bg-btnBlue text-lg font-medium text-white rounded-xl hover:bg-hover active:bg-pressed"
        >
          종료
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { allItems, interview_sessions, interview_questions } from '@/data/dummyData'

const route = useRoute()
const router = useRouter() 

const showCompleteModal = ref(false); // 면접 종료 확인 모달
const webcamRef = ref(null); // 웹캡

const transcript = ref('') // 음성 인식 결과
const isRecording = ref(false) // 마이크 off
const mediaRecorder = ref(null) // 인스턴스
const audioChunks = ref([]) // 오디오 데이터 배열
const audioBlob = ref(null)

const currentTime = new Date(); //면접 시작 시간
const elapsedTime = ref('00:00') // 경과 시간
const endTime = ref(null) // 종료 모달창 시간
const timeStr_Date = currentTime.toISOString();
const timeStr_Time = currentTime.toLocaleTimeString();
// console.log(timeStr_Time); 

let timerId = null
function updateElapsedTime() {
  const now = new Date()
  const diffMs = now - currentTime

  const totalSeconds = Math.floor(diffMs / 1000)
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')

  elapsedTime.value = `${minutes}:${seconds}`
}

onMounted(() => {
  timerId = setInterval(updateElapsedTime, 1000)
})
onUnmounted(() => {
  clearInterval(timerId)
})



const q_idx = ref(0);  // 질문 idx

const sessionId = route.params.sessionId // 면접 세션 ID
const interviewerId = Number(route.params.interviewerId) // 면접관 ID

const interviewSession = computed(() => interview_sessions.find(i => i.id === sessionId)) // 면접 세션

const item = computed(() => { // 공고
  const itemId = interviewSession.value?.application_id
  return allItems.find(i => i.id === itemId)
})

const questions = computed(() => { // 면접 질문들 -> 여기 질문 순서 값으로 정렬한 번 해주기? 수정 필요
  return interview_questions.filter(i => i.session_id === sessionId)
})

const showQuestion = ref(false) // 질문 보기 여부

function toggleQuestion() {
  showQuestion.value = !showQuestion.value
}

const messages = ref([ // 출력될 메세지들
  "이 질문은 지원자의 문제 해결 능력과 성능 최적화에 대한 이해도를 평가하기 위한 것입니다.",
  "눈을 더 많이 마주쳐보세요!"
])

function addMessage() { // 메세지 추가
  const text = questions.value[q_idx.value]?.intent_text
  messages.value.push(text)
  // console.log("addmsg : " + text)
}

function inc_q_idx() { // 질문 넘기기
  if (q_idx.value + 1 >= questions.value.length) {
    console.log("완료 : " + q_idx.value);
    endTime.value = elapsedTime.value;
    showCompleteModal.value = true; // 면접 종료 확인 모달창
    return;
  }

  q_idx.value += 1;
  // console.log("addidx : " + q_idx.value)
}

const confirmEnd = () => { // 면접 종료
  console.log("면접 종료 확인");
  showCompleteModal.value = false;
  
  // 여기에 api 넘겨줘야함 -> 수정 필요

  router.push({ name: 'InterviewResult', params: { id : sessionId } });

};


// 웹캡
onMounted(async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (webcamRef.value) {
      webcamRef.value.srcObject = stream;
    }
  } catch (err) {
    console.error('웹캠 접근 오류:', err);
  }
});

// 마이크
let recognition = null 
let isRecognizing = false // 내부 플래그(빠르게 연타 오류 방지용)
onMounted(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    alert('이 브라우저에서는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.')
    return
  }

  recognition = new SpeechRecognition()
  recognition.lang = 'ko-KR'// 한국어
  recognition.interimResults = true // 중간 결과 표시 여부
  recognition.continuous = true // 연속 인식 여부

  recognition.onstart = () => {
    isRecognizing = true
    isRecording.value = true
  }
  
  recognition.onresult = (event) => { // 정상 동작
    const last = event.results[event.results.length - 1]
    if (last.isFinal) {
      transcript.value += last[0].transcript.trim() + ' '
    }
  }
  recognition.onerror = (event) => { // 오류 -> 자동 종료
    console.error('음성 인식 오류:', event.error)
    isRecognizing = false
    isRecording.value = false
  }
  recognition.onend = () => { // 끝 -> 종료
    isRecognizing = false
    isRecording.value = false
  }
})

// const toggleRecording = () => { // 녹음 시작 / 정지
//   if (!recognition) return

//   if (isRecording.value) { // 녹음 정지
//     recognition.stop()
//   } else { // 녹음 시작
//     recognition.start()
//   }
//   isRecording.value = !isRecording.value
// }
const toggleRecording = async () => { // 녹음 시작 / 정지
  if (isRecording.value) { // 녹음 정지
    mediaRecorder.value.stop()
    isRecording.value = false
  } else { // 녹음 시작
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder.value = new MediaRecorder(stream)
    audioChunks.value = [] // 오디오 초기화

    mediaRecorder.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data)
    }

    mediaRecorder.value.onstop = () => {
      if (audioChunks.value.length === 0) return
      audioBlob.value = new Blob(audioChunks.value, { type: 'audio/webm' })

      // 여기서부터 audioBlob을 서버로 전송하거나 파일로 저장 가능
      console.log('녹음 완료. Blob:', audioBlob.value)

    }

    mediaRecorder.value.start()
    isRecording.value = true
  }
}

const resetTranscript = () => { // 재답변
  // if (isRecording.value) {
  //   recognition.stop()
  //   isRecording.value = false
  // }
  // transcript.value = ''

  if (isRecording.value && mediaRecorder.value?.state !== 'inactive') {
    mediaRecorder.value.stop()
  }
  isRecording.value = false
  audioChunks.value = []
  audioBlob.value = null

  console.log('재답변: 녹음 초기화 완료')
}

const completeTranscript = async () => {
  // if (!transcript.value.trim()) { // 답변 없으면 답변 완료 막기
  //   console.warn("답변이 없습니다.");
  //   alert("답변이 없습니다.");
  //   return;
  // }
  if (!audioBlob) { // 답변 없으면 답변 완료 막기
    alert("답변이 없습니다.");
    return;
  }

  // const currentQuestion = questions.value[q_idx.value]; //이거 아마 삭제
  // const answer = transcript.value;

  // 음성 인식 중지 및 답변 초기화
  // if (isRecording.value) {
  //   recognition.stop();
  //   isRecording.value = false;
  // }
  if (isRecording.value && mediaRecorder.value?.state !== 'inactive') {
    mediaRecorder.value.stop();
    isRecording.value = false;
  }


  try {
    // 재생 테스트용 URL
    const audioUrl = URL.createObjectURL(audioBlob.value)
    const audio = new Audio(audioUrl)
    audio.play()

    //여기에 api연결하기

    // transcript.value = '';
    audioChunks.value = [];
    audioBlob.value = null;
    inc_q_idx();

  } catch (error) {
    console.error("오류 : ", error);
  }
}
</script>