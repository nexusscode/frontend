import { defineStore } from 'pinia';

export const useResumeStore = defineStore('resume', {
  state: () => ({
    resumeId: 0,
    resumeItems: [],
  }),
  actions: {
    copyResumeAndItems(Id, data){
        this.resumeId = Id;
        this.resumeItems = data;
    },
  }
});