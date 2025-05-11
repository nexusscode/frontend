<template>
  <div class="relative flex top-10 min-h-[calc(100vh-84px)]">
    <div class="fixed left-0 space-y-2"> <!-- 탭 버튼 -->
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[ 
          'w-24 h-10 flex items-center justify-center transition-all rounded-r-full font-medium',
          currentTab === index ? 'bg-btnBlue text-white font-medium hover:bg-hover active:bg-pressed'
          : 'bg-white hover:bg-hover hover:text-white active:bg-pressed active:text-white'
        ]"
        @click="currentTab = index"
      >
        {{ tab }}
      </button>
    </div>

    <div class="ml-20 mr-20 px-8 pb-8 flex-1">
      <component :is="getCurrentComponent()" />
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import Recruit_List from './Recruit_List.vue' // 목록 탭
import Recruit_InterviewSummary from './Recruit_InterviewInfo.vue' // 면접 기록 탭

const tabs = ['공고 목록', '면접 기록'] 
const currentTab = ref(0)

function getCurrentComponent() { // 탭 내용 불러옴
  switch (currentTab.value) {
    case 0: return Recruit_List
    case 1: return Recruit_InterviewSummary
  }
}

</script>

