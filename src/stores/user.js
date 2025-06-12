
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 0,
    accessToken: '',
    userName: '로그인',
    isLoggedIn : false,
    isSurveyed : false,

    infoForm : {
      company : '',
      position : '',
      date : ''
    }
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
    backupForm(form){
      this.infoForm.company = form.company;
      this.infoForm.position = form.position;
      this.infoForm.date = form.date;
    },
    doSurvey(surveyData){
        this.discDevelopSurvey = surveyData;
        this.isDisced = true;
    },
  }
});


