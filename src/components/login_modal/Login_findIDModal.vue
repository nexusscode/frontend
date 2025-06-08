<template>
    <div id="container" class="fixed inset-0 flex justify-center items-center bg-gray-200/50 z-50">
        <div name="find_modal_box" v-if="isOpen" class="flex flex-col justify-between items-start w-[600px] h-[320px] px-12 py-6 border mt-10 rounded-2xl bg-white">
            <div class="pb-1 text-start text-base font-extrabold">아이디 찾기</div>
            <div class="font-semibold">회원정보에 등록된 휴대전화 번호와 입력한 휴대전화 번호가 같아야, 인증코드를 받을 수 있습니다</div>
            <div class="w-full flex items-baseline">
                <div class="w-1/5 text-start text-sm font-bold">이름</div>
                <input type="text" @input="getUserName" placeholder="이름을 입력해주세요" class="w-3/5 pl-4 py-1.5 border rounded-md font-normal">
            </div>
            <div class="w-full flex items-baseline">
                <div class="w-1/5 text-start text-sm font-bold">전화번호</div>
                <div class="w-3/5 flex justify-baseline font-normal">
                    <input type="text" v-model="phonefirstnum" placeholder="010" class="w-[50px] py-1.5 border mr-1 rounded-md text-center"><span class="pt-1.5">-</span>
                    <input type="text" v-model="phonesecondnum" placeholder="0000" class="w-[60px] py-1.5 border mr-1 ml-1 rounded-md text-center"><span class="pt-1.5">-</span>
                    <input type="text" v-model="phonelastnum" placeholder="0000" class="w-[60px] py-1.5 border ml-1 rounded-md text-center">
                    <button @click="getVerifyNum" class="w-full py-1.5 ml-3 rounded-md border-btnBlue text-btnBlue">인증코드 받기</button> <!--api-->
                </div>
            </div>
            <input type="text" ref="verifyInput" placeholder="인증번호 입력" disabled class="self-center w-3/5 pl-4 py-1.5 border rounded-md font-normal">
            <button @click="isVerifyNumCorrect;isOpen=false" class="self-center px-12 py-1.5 border mt-6 text-xs bg-[#4f89fd] rounded-md text-white">
                다음 <!--api-->
            </button>
        </div>
        <div name="found_modal_box" v-if ="!isOpen" class="flex flex-col justify-between items-start w-[600px] h-[250px] px-12 py-6 border rounded-xl bg-white z-50">
            <div class="pb-1 text-start text-base font-extrabold">아이디 찾기</div>
            <div class="font-bold">휴대 전화번호 정보와 일치하는 아이디 입니다.</div>
            <div class="self-center px-6 py-4 border rounded-3xl text-black">아이디: {{ ID }}</div> <!--api-->
            <button @click="$emit('close')" class="self-center px-12 py-1.5 border text-xs bg-[#4f89fd] rounded-md text-white">
                확인
            </button>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios'
import {ref, reactive, computed} from 'vue'
    const isOpen = ref(true)
    const userName = ref('')
    const phonefirstnum = ref('')
    const phonesecondnum = ref('')
    const phonelastnum = ref('')
   // const phoneNumber = computed (() => {return `${phonefirstnum.value}${phonesecondnum.value}${phonelastnum.value}`})
    const ID = ref('')
    const verifyInput = ref(null)

    function getUserName($event){
        userName.value = $event.target.value
    }

/*
    const getVerifyNum = async () => {
        try {
            const response = await axios.post('/api/sms/send', null, {
                params: {
                    phoneNumber: phoneNumber.value,
                }
            })
            verifyInput.value.disabled = false
        } catch (error) {
            console.error('에러 발생:', error)
        }
    }
*/
    const getID = async (id) => { 
        const response = await axios.get(`https://api.example.com/users/${id}`) // id값으로 무엇을쓸건지?(name or user.id)
        return response.data
    }
/*
    const isVerifyNumCorrect = async () => {
        try {
            const response = await axios.post('/api/sms/verify', {
                phoneNumber : phoneNumber.value,
                code: verifyInput.value,
            })
            alert(response.data.message)
        } catch (error) {
            console.error('에러 발생:', error)
        }
        try {
            const response = await axios.post('/api/user/find/email', {
                name: userName.value,
                phoneNumber : phoneNumber.value,
            })
            ID.value = response.data.message
        } catch (error) {
            console.error('에러 발생:', error)
        }
    }
        */
</script>
<style>
    
   
</style>