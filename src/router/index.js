// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import Recruit from '@/components/Recruit.vue'
import AnalysisRecord from '@/components/AnalysisRecord.vue'
import Community from '@/components/Community.vue'
import MyPage from '@/components/MyPage.vue'
import Login from '@/components/Login.vue'
import SelfIntro from '@/components/SelfIntro.vue'
import SelfIntroResult from '@/components/SelfIntroResult.vue'
import Interview from '@/components/Interview.vue'
import InterviewReal from '@/components/InterviewReal.vue'
import SurveyFirst from '@/components/SurveyFirst.vue'
import SurveyFirstResult from '@/components/SurveyFirstResult.vue'
import DiscTest from '@/components/DiscTest.vue'
import DiscResult from '@/components/DiscResult.vue'
import DevTest from '@/components/DevTest.vue'
import DevResult from '@/components/DevResult.vue'


const routes = [
  { path: '/', name: 'Main', component: MainPage },
  { path: '/recruit', name: 'Recruit', component: Recruit },
  { path: '/analysisrecord', name: 'AnalysisRecord', component: AnalysisRecord },
  { path: '/community', name: 'Community', component: Community },
  { path: '/mypage', name: 'MyPage', component: MyPage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/coverletter', name: 'SelfIntro', component: SelfIntro },
  { path: '/coverletter/result', name: 'SelfIntroResult', component: SelfIntroResult},
  { path: '/interview', name: 'Interview', component: Interview },
  { path: '/interviewreal', name: 'InterviewReal', component: InterviewReal },
  { path: '/surveyfirst', name: 'SurveyFirst', component: SurveyFirst },
  { path: '/surveyfirstresult', name: 'SurveyFirstResult', component: SurveyFirstResult },
  { path: '/disctest', name: 'DiscTest', component: DiscTest },
  { path: '/discresult', name: 'DiscResult', component: DiscResult },
  { path: '/devtest', name: 'DevTest', component: DevTest },
  { path: '/devresult', name: 'DevResult', component: DevResult },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
