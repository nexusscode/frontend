// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import Recruit from '@/components/Recruit.vue'
import AnalysisRecord from '@/components/AnalysisRecord.vue'
import Community from '@/components/Community.vue'
import MyPage from '@/components/MyPage.vue'

const routes = [
  { path: '/', name: 'Main', component: MainPage },
  { path: '/recruit', name: 'Recruit', component: Recruit },
  { path: '/analysisrecord', name: 'AnalysisRecord', component: AnalysisRecord },
  { path: '/community', name: 'Community', component: Community },
  { path: '/mypage', name: 'MyPage', component: MyPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
