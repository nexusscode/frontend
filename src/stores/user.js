
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    userName: '로그인',
    isLoggedIn : false,
    isDisced: false,
  }),
  actions: {
    login(userId, userName) {
      this.userId = userId;
      this.userName = `${userName}님`;
      this.isLoggedIn = true;
    },
    logout() {
      this.user = '';
      this.userName = '로그인';
      this.isLoggedIn = false;
    },
    doSurvey(surveyData){
        this.discDevelopSurvey = surveyData;
        this.isDisced = true;
    },
  }
});


