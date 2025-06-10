<template>
    <div class="flex justify-center">
        <div class="w-[320px] flex flex-col">
            <div class="flex flex-col justify-around h-[200px] p-4 rounded-lg bg-white/60">
                <span class="font-extrabold self-start text-sm">로그인</span>
                <div class="w-full text-[10px] flex flex-col">
                    <input type="text" v-model="userInfo.email" placeholder="아이디" class="w-full py-1.5 pl-2.5 border rounded-sm">
                    <input type="text" v-model="userInfo.pw" placeholder="비밀번호" class="w-full my-1.5 py-1.5 pl-2.5 border rounded-sm">
                    <label for="keep-login" class="self-start flex items-center font-bold ml-0.5">
                        <input type="checkbox" id="keep-login" v-model="keepLogin" class="mr-1"> 로그인 상태 유지
                    </label>
                </div>
                <button @click="tryLogin" class="w-full py-1 text-center text-white text-[11px] bg-btnBlue rounded-md">로그인</button>
            </div>
            <div class="my-6 text-xs flex w-3/4 justify-evenly self-center font-[50px]"> <!--추후수정--> 
                <button @click="isOpenID=true" id="searchID">아이디 찾기</button>| 
                <Login_findIDModal v-if = "isOpenID" @close="isOpenID=false"/>     
                <button @click="isOpenPW=true" id="searchPW">비번 찾기</button>|
                <Login_findPWModal v-if = "isOpenPW" @close="isOpenPW=false"/>
                <button @click="isOpenJoin = true">회원가입</button>
                <Login_JoinModal v-if = "isOpenJoin" @close="isOpenJoin=false"/>
            </div>
            <button class="bg-[#FFEE51] w-11/12 text-[11px]/8 font-bold rounded-sm self-center">카카오로 로그인</button>
        </div>
    </div>
</template>
<script setup>
    import {reactive, ref} from 'vue'
    import { loginPost } from '@/api/login';
    import axios from 'axios'
    import { useRouter } from 'vue-router';
    import { useUserStore } from "@/stores/user";
    import { createPinia, setActivePinia } from 'pinia'
    import Login_JoinModal from './login_modal/Login_JoinModal.vue'
    import Login_findIDModal from './login_modal/Login_findIDModal.vue'
    import Login_findPWModal from './login_modal/Login_findPWModal.vue'

    const pinia = createPinia()
    setActivePinia(pinia)
    const user = useUserStore()

    const router = useRouter()

    const isOpenJoin = ref(false)
    const isOpenID = ref(false)
    const isOpenPW = ref(false)

    const userInfo = reactive({
        email : '',
        pw : '',
    })
    
    const keepLogin = ref(false)
    
    async function tryLogin() {
        try {
            const data = await loginPost(userInfo)
            console.log('로그인 성공:', data)
            user.login(data)
            console.log('userStore 전체:', user)
            console.log('userId:', user.userId)
            console.log('accessToken:', user.accessToken)
            console.log('userName:', user.userName)
            console.log('isLoggedIn:', user.isLoggedIn)

        } catch (error) {
            console.error('로그인 실패:', error)
        }
        router.push('/')
    }
</script>
