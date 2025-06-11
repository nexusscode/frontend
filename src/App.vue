
<template>
  <div class="font-sans">
    <Background />
    <Navigator v-if="showNav" />
    <div class="">
      <router-view />
    </div>
  </div>


</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Background from './components/Background.vue'
import Navigator from './components/Navigator.vue'

const route = useRoute();
const hiddenNames = ['Interview']; // 네비게이션 없는 페이지

const showNav = computed(() => !hiddenNames.includes(route.name));

</script>

<style scoped>
  #app {
    z-index: 1; /* 콘텐츠 z-index : 1 */
    display: flex;
    flex-direction: column;
  }
</style>
