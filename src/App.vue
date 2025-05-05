<script setup>
import Background from './components/Background.vue'
import Navigator from './components/Navigator.vue'
</script>

<template>
  <div class="font-sans">
    <Background />
    <Navigator />
    <router-view />
  </div>


</template>

<style scoped>
  #app {
    z-index: 1; /* 콘텐츠 z-index : 1 */
    display: flex;
    flex-direction: column;
  }

  

</style>
