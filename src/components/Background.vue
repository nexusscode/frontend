<!-- 그라데이션 배경 -->
<template>
    <div class="background-container"></div>
</template>
  
<style scoped>
.background-container {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;
background-color: #EDF2F6; /* 배경 색 */
}

.background-container::before {
content: "";
position: absolute;
background-color: #C7DDF5;
width: 500px;
height: 500px;
top: 80%;
left: 20%;
border-radius: 50%;
transform: translate(-50%, -50%);
filter: blur(100px);
}

.background-container::after {
content: "";
position: absolute;
background-color: #E8C6F8;
width: 700px;
height: 500px;
top: 15%;
right: 10%;
border-radius: 50%;
transform: translate(50%, -50%);
filter: blur(100px);
}
</style>
