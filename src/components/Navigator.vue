<template>
    <nav class="nav-bar">
        <div class="nav-item">
          <router-link to="/">AI 면접 서비스</router-link>
        </div>
        
        <div class="nav-item center">
            <router-link to="/recruit" class="mr">공고등록</router-link>
            <router-link to="/analysisrecord" class="mr">분석 기록</router-link>
            <router-link to="/community">커뮤니티</router-link>
        </div>
        
        <div class="nav-item">
            <span class="mr-4"> 김민지님 </span>   <!-- 나중에 수정-->
            <router-link to="/mypage" class="flex items-center">
              마이페이지
              <img src="../assets/mypage_icon.svg" class="w-4 h-4 ml-1" alt="" />
            </router-link>
        </div>
    </nav>

</template>


<style scoped>
.nav-bar { /* 네비게이션 바 */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: fixed; 
  top: 0;
  left: 0;
  padding: 20px 120px;
  z-index: 1000;
}
.nav-item { /* 알약 모양 도형형 */
  display: flex;
  padding: 10px 25px;
  background-color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
  border-radius: 9999px;
  justify-content: center;  
  align-items: center;
}

.nav-item .center {
    justify-content: center;   
}

.nav-item span { /* span 간격 조정 */
  margin-right: 20px;
}

.nav-item a { /* 링크 스타일 변경 */
  text-decoration: none; 
  color: #000000;
  font-weight: bold;
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