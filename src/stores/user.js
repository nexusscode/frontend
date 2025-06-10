
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 0,
    accessToken: '',
    userName: '로그인',
    isLoggedIn : false,
    isDisced: false,
  }),
  actions: {
    login(data) {
      this.userId = data.userId;
      this.accessToken = data.accessToken;
      this.userName = `${data.name}님`;
      this.isLoggedIn = true;
    },
    logout() {
      this.user = '';
      this.userName = '로그인';
      this.accessToken = '';
      this.isLoggedIn = false;
    },
    doSurvey(surveyData){
        this.discDevelopSurvey = surveyData;
        this.isDisced = true;
    },
  }
});


