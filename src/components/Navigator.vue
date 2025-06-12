<template>
    <nav class="nav-bar relative">
        <div class="nav-item">
          <router-link to="/">AI 면접 서비스</router-link>
        </div>
        
        <div class="nav-item absolute left-1/2 transform -translate-x-1/2">
            <router-link to="/recruit" class="mr">AI 검사</router-link>
            <router-link to="/savedrecord" class="mr">보관함</router-link>
            <button @click="isOpenInfo = true">실제 면접</button>
            <InterviewInfo_addModal v-if="isOpenInfo" @close="isOpenInfo = false"/>
        </div>
        
        <div class="nav-item">
          <div class="relative inline-block group" ref="wrapper">
            <router-link v-if="isGuest" to="/login" class="">
              {{ user.userName }}
            </router-link>
            <span v-else @click="toggleDropdown" class="mr-4 cursor-pointer">
              {{ user.userName }} <!--김민지님--> 
            </span>
            <!-- 로그아웃 말풍선 -->
            <div
              v-if="show"
              class="absolute top-full mt-2 ml-8 flex flex-col items-start z-10"
              style="transform: translateX(-40%)" 
            >
              <!-- 꼬리 -->
              <div
                class="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-fuchsia-400 ml-10"
                style="margin-left: 30px"  
              ></div>

              <!-- 본체 -->
              <div @click="doLogout" class="bg-fuchsia-400 text-white text-sm rounded w-32 px-4 py-1.5 text-center whitespace-nowrap cursor-pointer">
                로그아웃
              </div>
            </div>
          </div>
          <div>
            <router-link v-if="!isGuest" to="/mypage" class="flex items-center">
              마이페이지
              <img src="../assets/mypage_icon.svg" class="w-4 h-4 ml-1" alt="" />
            </router-link>
        </div>
        </div>
    </nav>

</template>
<<<<<<< Updated upstream

=======
<script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/user';
  import { createPinia, setActivePinia } from 'pinia'
  import env from '../api/env'
  import InterviewInfo_addModal from './InterviewInfo_addModal.vue';

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  const pinia = createPinia()
  const router = useRouter()
  setActivePinia(pinia)
  const user = useUserStore()
  const doLogout = async () => {
    const res = await env.post(`/api/user/logout`, null, {headers: {
        'Content-Type': 'application/json',
      }})
    user.logout()
    show.value = false
    if(res.data.result) alert('로그아웃 완료')
    router.push('/')
  }
  const show = ref(false)
  const wrapper = ref(null)
  const toggleDropdown = () => {
    show.value = !show.value
  }
  // 외부 클릭 감지
const handleClickOutside = (e) => {
  if (wrapper.value && !wrapper.value.contains(e.target)) {
    show.value = false
  }
}

  const isGuest = computed(() => user.userName === '로그인')
  const isOpenInfo = ref(false)
</script>
>>>>>>> Stashed changes

<style scoped>
.nav-bar { /* 네비게이션 바, z-index : 40 */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: fixed; 
  top: 0;
  left: 0;
  padding: 20px 120px;
  z-index: 40;
  backdrop-filter: blur(10px); /* 백드롭 필터 - 네비게이션 블러 처리 */
}
.nav-item { /* 알약 모양 도형형 */
  display: flex;
  padding: 10px 25px;
  background-color: rgba(255, 255, 255, 0.6);
  font-weight: 600; /* semibold */
  border-radius: 9999px;
  justify-content: center;  
  align-items: center;
}

.nav-item span { /* span 간격 조정 */
  margin-right: 20px;
}

.nav-item a { /* 링크 스타일 변경 */
  text-decoration: none; 
  color: #000000;
  font-weight: 600; /* semibold */
}
.mr {
    margin-right: 40px;
}

.nav-item a.flex { /* 마이페이지 */
  display: flex;
  align-items: center; 
}
.nav-item a img { /* 마이페이지 아이콘 */
  margin-left: 0.25rem;
}

</style>