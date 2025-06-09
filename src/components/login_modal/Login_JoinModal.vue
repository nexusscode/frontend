<template>
    <div class="fixed inset-0 flex justify-center items-center bg-white/10 z-50">
        <div name="modal_box" class="flex flex-col justify-between items-start w-[600px] min-w-[500px] h-[550px] px-14 py-6 mt-10 rounded-2xl bg-white">
            <div class="pb-1 text-start text-base font-extrabold">회원가입</div>
            <div class="w-full flex items-baseline">
                <div class="w-1/5 text-start text-sm font-semibold">아이디</div>
                <input type="text" v-model="userEmail" placeholder="이메일을 입력하세요" class="w-3/5 pl-4 py-1.5 border rounded-md font-normal">
                <button class="w-1/6 py-1.5 ml-3 rounded-md border-btnBlue text-btnBlue">중복확인</button> <!--api-->
            </div>
            <div class="w-full flex items-baseline">
                <div class="w-1/5 text-start text-sm font-semibold">비밀번호</div>
                <input type="text" v-model="userPW" placeholder="비밀번호를 입력해주세요" class="w-3/5 pl-4 py-1.5 border rounded-md font-normal">
            </div>
            <div class="w-full flex items-baseline">
                <div class="w-1/5 text-start text-sm font-semibold">비밀번호 확인</div>
                <input type="text" @input="verifyPW" placeholder="비밀번호를 한번 더 입력해주세요" class="w-3/5 pl-4 py-1.5 border rounded-md font-normal">
            </div>
            <div class="w-full h-px my-3 border"></div>
            <div class="w-full flex items-baseline">
                <div class="w-1/5 text-start text-sm font-semibold">이름</div>
                <input type="text" @input="getUserName($event)" placeholder="이름을 입력해주세요" class="w-3/5 pl-4 py-1.5 border rounded-md font-normal">
            </div>
            <div class="w-full flex items-baseline">
                <div class="w-1/5 text-start text-sm font-semibold">전화번호</div>
                <input type="text" v-model="phonefirstnum" placeholder="010" class="w-[50px] py-1.5 border mr-1 rounded-md text-center font-normal">-
                <input type="text" v-model="phonesecondnum" placeholder="0000" class="w-[60px] py-1.5 border mr-1 ml-1 rounded-md text-center font-normal">-
                <input type="text" v-model="phonelastnum" placeholder="0000" class="w-[60px] py-1.5 border ml-1 rounded-md text-center font-normal">
            </div>
            <div class="w-full flex items-baseline"><div class="w-1/5 text-start text-sm font-semibold">희망분야</div>
                <select name="" v-model="position" required class="relative w-[220px] border pl-3 py-1.5 rounded-md appearance-none font-normal">
                    <option disabled hidden selected value="">희망분야를 선택해주세요</option>
                    <option value="백엔드">백엔드</option>
                    <option value="프론트엔드">프론트엔드</option>
                </select>
                </div>
            <div class="w-full flex items-baseline"><div class="w-1/5 text-start text-sm font-semibold">경력</div>
                <select name="" v-model="career" required class="w-[70px] border pl-2 py-1.5 rounded-md appearance-none font-normal">
                    <option disabled hidden selected value="">경력</option>
                    <option value="신입">신입</option>
                    <option value="경력">경력</option>
                </select>
            </div>
            <div class="w-full h-px border my-3"></div>
            <div class="w-full flex text-sm font-semibold">
                <div class="w-1/5 text-start">이용약관동의</div>
                <div class="flex flex-col">
                    <label for="all-agree" class="flex items-center"><input type="checkbox" @click="allCheck" id="all-agree" value="all-agree" v-model="agrees" class="mr-2">전체 동의합니다</label> <!--수정-->
                    <label for="rule-agree" class="flex items-center my-1"><input type="checkbox" id="rule-agree" value="rule-agree" v-model="agrees" class="mr-2">이용약관 동의 (필수)</label>
                    <label for="info-agree" class="flex items-center"><input type="checkbox" id="info-agree" value="info-agree" v-model="agrees" class="mr-2">개인정보수집 동의 (필수)</label>
                </div>
            </div>
            <button @click="createUser;$emit('close')" class="self-center px-10 py-1.5 border mt-6 text-xs bg-[#4f89fd] rounded-md text-white"> <!--api-->
                회원가입
            </button>
        </div>
    </div>
</template>
<script setup>
    import {ref, reactive, computed} from 'vue';
    import axios from 'axios';
    import { API_SERVER_HOST } from '../../api/host';
    import { useRouter } from 'vue-router';

    const host = `${API_SERVER_HOST}`
    const router = useRouter()

    const userName = ref('')
    const userEmail = ref('')
    const userPW = ref('')
    const isPWEqual = ref(false)
    const phonefirstnum = ref('')
    const phonesecondnum = ref('')
    const phonelastnum = ref('')
    const phoneNumber = computed (() => {return `${phonefirstnum.value}${phonesecondnum.value}${phonelastnum.value}`})

    const position = ref('')
    const career = ref('')
    const agrees = ref([])
    const isAllChecked = ref(false)

    function getUserName($event){
        userName.value = $event.target.value
    }

    function verifyPW($event){
        isPWEqual.value = (userPW.value === $event.target.value) ? true : false
    }

    function allCheck(){
        if (!agrees.value.includes('all-agree')) {
            agrees.value = ['all-agree', 'rule-agree', 'info-agree']
            isAllChecked.value = true
        }
        else {
            agrees.value = []
            isAllChecked.value = false
        }
    }
/*
    function allCheckCancel(){
        if (agrees.value.includes('all-agree')) {
            agrees.value = ['all-agree', 'rule-agree', 'info-agree']
            isAllChecked.value = true
        }
        else {
            agrees.value = []
            isAllChecked.value = false
        }
    }
*/

    const createUser = async () => {
        try {
            if(!isAllChecked){
                alert('약관에 모두 동의해주세요.')
                return
            }

            const response = await axios.post(`${host}/api/user/signup`, {
                email: userEmail.value,
                password: userPW.value,
                name: userName.value,
                phoneNumber : phoneNumber.value,
                devType: position.value,
                experienceLevel: career.value,
            })
            alert('회원가입 완료')
        } catch (error) {
            console.error('에러 발생:', error)
        }
    }
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