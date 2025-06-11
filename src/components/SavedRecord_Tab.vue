<!-- 보관함 탭 부분 -->
<template>
  <div class="relative flex top-10 min-h-[calc(100vh-145px)]">
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

    <div class="flex-1">
      <component :is="getCurrentComponent()" />
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import SavedRecord_resume from './SavedRecord_resume.vue' // 자소서 탭
import SavedRecord_interview from './SavedRecord_interview.vue' // 면접 탭
import SavedRecord_info from './SavedRecord_info.vue' // 실제 면접 탭

const tabs = ['자소서', '면접', '실제 면접'] 
const currentTab = ref(0)

function getCurrentComponent() { // 탭 내용 불러옴
  switch (currentTab.value) {
    case 0: return SavedRecord_resume
    case 1: return SavedRecord_interview
    case 2: return SavedRecord_info
  }
}

</script>

