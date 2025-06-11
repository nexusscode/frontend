import axios from "axios";
import { getCookie, setCookie } from "./cookie";
import { API_SERVER_HOST } from "./host";
import { useUserStore } from "@/stores/user";

const host = `${API_SERVER_HOST}`

const env = axios.create({
  baseURL: `${host}`,
  withCredentials: true
})

const refreshJWT = async (accessToken) => {
    const host = API_SERVER_HOST

    const header = {headers: {"Authorization" : `Bearer ${accessToken}`},withCredentials: true}

    const res = await axios.get(`${host}/api/member/refresh`, header)

    console.log("-----------------------------------")
    console.log(res.data)

    return res.data
}

const beforeReq = (config) => {
    const user = useUserStore()
    user.$subscribe((mutation, state) => {

})
    console.log("before request.......")
    const userId = user.userId
    const accessToken = user.accessToken
    console.log('userId', userId)
    console.log('accessToken:', accessToken)
    console.log('userId:', user.userId)
    console.log('accessToken:', user.accessToken)
    //const memberInfo = getCookie("refreshToken")
    /*
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
    */
    config.headers.Authorization = `Bearer ${accessToken}`
    config.headers.userId = userId
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
        const refreshToken = getCookie("refreshToken")
        const accessToken = user.accessToken

        const result = await refreshJWT(accessToken)
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