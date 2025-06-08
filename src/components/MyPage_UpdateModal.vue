<template>
    <div id="container" class="fixed inset-0 flex justify-center items-center bg-gray-200/50 z-50">
        <div name="modal_box" class="flex flex-col justify-between items-start w-[650px] h-[400px] px-12 py-6 border mt-10 rounded-2xl bg-white">
            <div class="pb-1 text-start text-base font-extrabold">회원 정보 수정</div>
            <div class="w-full flex items-baseline">
                <div class="w-1/5 text-start text-sm font-bold">이름</div>
                <input type="text" @input="getUserName($event)" placeholder="이름을 입력해주세요" class="w-3/5 pl-4 py-1.5 border rounded-md font-normal">
            </div>
            <div class="w-full flex items-baseline">
                <div class="w-1/5 text-start text-sm font-bold">전화번호</div>
                <input type="text" v-model="phonefirstnum" placeholder="010" class="w-[50px] py-1.5 border mr-1 rounded-md text-center font-normal">-
                <input type="text" v-model="phonesecondnum" placeholder="0000" class="w-[60px] py-1.5 border mr-1 ml-1 rounded-md text-center font-normal">-
                <input type="text" v-model="phonelastnum" placeholder="0000" class="w-[60px] py-1.5 border ml-1 rounded-md text-center font-normal">
            </div>
            <div class="w-full flex items-baseline"><div class="w-1/5 text-start text-sm font-bold">희망분야</div>
                <select name="" v-model="position" required class="relative w-[220px] border pl-3 py-1.5 rounded-md appearance-none font-normal">
                    <option disabled hidden selected value="">희망분야를 선택해주세요</option>
                    <option value="">예시1</option>
                    <option value="">예시2</option>
                </select>
                </div>
            <div class="w-full flex items-baseline"><div class="w-1/5 text-start text-sm font-bold">경력</div>
                <select name="" v-model="career" required class="w-[70px] border pl-2 py-1.5 rounded-md appearance-none font-normal">
                    <option disabled hidden selected value="">경력</option>
                    <option value="">예시1</option>
                    <option value="">예시2</option>
                </select>
            </div>
            <button @click="updateUserInfo;$emit('close')" class="self-center px-12 py-1.5 border mt-6 text-xs bg-[#4f89fd] rounded-md text-white">
                수정
            </button>
        </div>
    </div>
</template>
<script setup>
    import axios from 'axios';
    import { users } from '@/data/dummyData'
    import { ref } from 'vue';

    const userName = ref('')
    const phonefirstnum = ref('')
    const phonesecondnum = ref('')
    const phonelastnum = ref('')
  //  const phoneNumber = computed (() => {return `${phonefirstnum.value}${phonesecondnum.value}${phonelastnum.value}`})
    const position = ref('')
    const career = ref('')

    function getUserName($event){
        userName.value = $event.target.value
    }

     /*
    const updateUserInfo = async () => {
        try {
            const response = await env.put('/api/user', {
                name: userName.value,
                phoneNumber : phoneNumber.value,
                devType: position.value,
                experienceLevel: career.value,
            })
            alert(response.data.message)
        } catch (error) {
            console.error('에러 발생:', error)
        }
    }
*/
</script>
<style>
    select:required:invalid {
        color: #909090;
        background-image: url(../assets/select_arrow.svg);
        background-repeat: no-repeat;
        background-position: right 10px top 50%;
        background-size: 6px;
    }
</style>