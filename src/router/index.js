// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import Recruit from '@/components/Recruit.vue'
import AnalysisRecord from '@/components/AnalysisRecord.vue'
import Community from '@/components/Community.vue'
import MyPage from '@/components/MyPage.vue'
import SelfIntro from '@/components/SelfIntro.vue'
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
  { path: '/', name: 'Main', component: MainPage },
  { path: '/recruit', name: 'Recruit', component: Recruit },
  { path: '/analysisrecord', name: 'AnalysisRecord', component: AnalysisRecord },
  { path: '/community', name: 'Community', component: Community },
  { path: '/mypage', name: 'MyPage', component: MyPage },
  { path: '/coverletter', name: 'SelfIntro', component: SelfIntro },
  { path: '/interview', name: 'Interview', component: Interview },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
