<script setup>
import Background from './components/Background.vue'
import Navigator from './components/Navigator.vue'
</script>

<template>
  <div class="font-sans">
    <Background />
    <Navigator />

    <div class="content flex flex-row w-full">
      <div class="w-1/2 pr-4 ml-36 flex flex-col justify-start items-start"> <!-- 왼쪽 영역 -->
        <span class="block text-5xl font-pretendard font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4A47D6] to-[#7E73D5]">
          AI가 자소서와 면접을
        </span>
        <span class="block text-5xl font-pretendard font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#413ED5] to-[#685FD6]">
          코칭해줍니다
        </span>
        <p class="text-xl mb-8 font-medium text-gray-600 mt-4">
          AI Analysis of Interviews
        </p>
        <button class="text-2xl px-6 py-3 mb-32 bg-gradient-to-r from-[#1F38B0] to-[#ABB9FB] text-white rounded-full">
          AI 분석 예시 보러가기
        </button>
      </div>

      <div class="w-1/2 pl-4"> <!-- 오른쪽 영역 -->
        <div class="bg-white bg-opacity-60 rounded-xl p-8 w-full max-w-md">
          <h2 class="text-left text-xl font-bold mb-4">회사 선택 후 코칭 시작</h2>

          <div class="flex items-center bg-white border border-[#518BFE] rounded-md px-4 py-2"> <!-- 검색창-->
            <img src="./assets/search_icon.svg" alt="" class="w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="AI 코칭을 받을 회사명을 입력하세요"
              class="flex-1 bg-transparent outline-none text-sm text-[#767676]"
            />
          </div>

          <div class="flex gap-4">
          <button class="mt-6 w-1/2 py-2 font-semibold bg-white border border-[#518BFE] rounded-md hover:from-[#3c39c1] hover:to-[#6c63c1] text-sm">
            예시 보기 <!-- 기능 구현 필요 -->
          </button>

          <button class="mt-6 w-1/2 py-2 font-semibold bg-[#518BFE] text-white rounded-md hover:from-[#3c39c1] hover:to-[#6c63c1] text-sm">
            검색 하기 <!-- 기능 구현 필요 -->
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
  #app {
    z-index: 1; /* 콘텐츠 z-index : 1 */
    display: flex;
    flex-direction: column;
  }

  

</style>
