<!-- 네비게이터 -->
<template>
    <nav class="nav-bar relative">
        <div class="nav-item">
          <router-link to="/">Jobveloper</router-link>
        </div>
        
        <div class="nav-item absolute left-1/2 transform -translate-x-1/2">
            <router-link to="/recruit" class="mr">AI 검사</router-link>
            <router-link to="/savedrecord" class="mr">보관함</router-link>
            <router-link to="interviewinfo/">실제 면접</router-link>
        </div>
        
        <div class="nav-item">
            <span class="mr-4"> {{ user.userName }} </span>   <!-- 나중에 수정-->
            <router-link :to = "(user.userName === '로그인') ? '/login' : '/mypage'" class="flex items-center">
              마이페이지
              <img src="../assets/mypage_icon.svg" class="w-4 h-4 ml-1" alt="" />
            </router-link>
        </div>
    </nav>

</template>
<script setup>
  import {ref} from 'vue'
  import { useUserStore } from '../stores/user';
import { createPinia, setActivePinia } from 'pinia'

const pinia = createPinia()
setActivePinia(pinia)

  const user = useUserStore()
  const route = (user.userName === '로그인') ? "/login" : "/mypage"

</script>

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
  backdrop-filter: blur(100px); /* 백드롭 필터 - 네비게이션 블러 처리 */
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