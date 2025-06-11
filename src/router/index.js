// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/components/MainPage.vue'
import Recruit from '@/components/Recruit_List.vue'
import SavedRecord from '@/components/SavedRecord.vue'
import InterviewInfo from '@/components/InterviewInfo.vue'
import MyPage from '@/components/MyPage.vue'
import Login from '@/components/Login.vue'
import SelfIntro from '@/components/SelfIntro.vue'
import SelfIntroResult from '@/components/SelfIntroResult.vue'
import Interview from '@/components/Interview.vue'
import InterviewResult from '@/components/InterviewResult.vue'
import SurveyFirst from '@/components/SurveyFirst.vue'
import SurveyFirstResult from '@/components/SurveyFirstResult.vue'
import DiscTest from '@/components/DiscTest.vue'
import DiscResult from '@/components/DiscResult.vue'
import DevTest from '@/components/DevTest.vue'
import DevResult from '@/components/DevResult.vue'
import RecruitInfo from '@/components/RecruitInfo.vue'

const routes = [
  { path: '/', name: 'Main', component: MainPage }, // 메인화면
  { path: '/recruit', name: 'Recruit', component: Recruit }, // 공고 등록
  { path: '/mypage', name: 'MyPage', component: MyPage }, // 마이페이지
  { path: '/savedrecord', name: 'SavedRecord', component: SavedRecord }, // 보관함
  { path: '/interviewinfo', name: 'InterviewInfo', component: InterviewInfo }, // 실제 면접
  { path: '/login', name: 'Login', component: Login }, // 로그인 화면
  { path: '/surveyfirst', name: 'SurveyFirst', component: SurveyFirst }, // 첫 설문(40질문)
  { path: '/surveyfirstresult', name: 'SurveyFirstResult', component: SurveyFirstResult }, // 첫 설문 결과
  { path: '/disctest', name: 'DiscTest', component: DiscTest }, // disc 설문(20질문)
  { path: '/discresult', name: 'DiscResult', component: DiscResult }, // disc 결과
  { path: '/devtest', name: 'DevTest', component: DevTest }, // 개발자 설문(20질문)
  { path: '/devresult', name: 'DevResult', component: DevResult }, // 개발자 결과
  { path: '/recruitinfo/:id', name: 'RecruitInfo', component: RecruitInfo }, // 공고 상세보기  
  { path: '/coverletter/:id', name: 'SelfIntro', component: SelfIntro }, // 자소서 화면
  { path: '/coverletter/result/:id', name: 'SelfIntroResult', component: SelfIntroResult }, // 자소서 피드백 화면
  { path: '/interview/:sessionId/:interviewerId', name: 'Interview', component: Interview }, // 면접 화면
  { path: '/interview/result/:id', name: 'InterviewResult', component: InterviewResult }, // 면접 피드백 화면
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
