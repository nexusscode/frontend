import axios from "axios";
import { getCookie, setCookie } from "./cookie";
import { API_SERVER_HOST } from "./host";
import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from 'pinia'


const pinia = createPinia()
setActivePinia(pinia)

const user = useUserStore()

const env = axios.create({
  baseURL: 'http://ec2.jobveloper.co.kr:8080', // 여기에 Swagger API 주소
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
})

const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST

    const header = {headers: {"Authorization" : `Bearer ${accessToken}`}}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    console.log("-----------------------------------")
    console.log(res.data)

    return res.data
}

const beforeReq = (config) => {
    console.log("before request.......")

    const memberInfo = getCookie("member")
    const userId = user.userId
    if(!memberInfo) {
        console.log("MEMBER NOT FOUND")
        return Promise.reject(
            {
                response:
                {data:
                    {error:"REQUIRE_LOGIN"}
                }
            }
        )
    }
    const {accessToken} = memberInfo

    config.headers.Authorization = `Bearer ${accessToken}`

    if(userId) config.headers.userId = userId;

    return config
}

const requestFail = (err) => {
    console.log("request error...................")

    return Promise.reject(err)
}

const beforeRes = async(res) => {
    console.log("before return response...................")

    console.log(res) 
    const data = res.data

    if(data && data.error === "ERROR_ACCESS_TOKEN"){
        const memberCookieValue = getCookie("member")

        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)
        console.log("refreshJWT RESULT", result)

        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        setCookie("member", JSON.stringify(memberCookieValue), 1)
        //원래 요청 재실행
        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest)

    }

    return res
}

const responseFail = (err) => {
    console.log("response fail error..................")

    return Promise.reject(err)
}

env.interceptors.request.use(beforeReq, requestFail)
env.interceptors.response.use(beforeRes, responseFail)

export default env;