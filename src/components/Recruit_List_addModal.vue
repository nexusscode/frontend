<template> <!-- 모달창, z-index : 50-->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="close"
    >
      <div class="bg-white p-6 rounded-lg w-80">
        <h2 class="text-lg text-left font-semibold mb-4">공고 등록하기</h2>

      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['close'])
  const close = () => emit('close')
  </script>
  