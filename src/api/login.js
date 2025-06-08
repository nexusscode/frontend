import { API_SERVER_HOST } from "./host";
import env from "../util/jwtUtil";
import axios from "axios";
import { useUserStore } from "../stores/user";

const host = `${API_SERVER_HOST}`

const user = useUserStore()

export const loginPost = async (loginParam) => {
    const header = {header: {"Content-Type":"x-www-form-urlencoded"}}

    const form = new FormData()
    form.append("username", loginParam.email)
    form.append("password", loginParam.pw)

    const res = await axios.post(`${host}/api/user/login`, form, header)
    const res2 = await env.get(`/api/user`)
    user.login(res.data.userId, res2.data.result.name)
}

export const modifyMember = async (member) => {
    const res = await env.put(`${host}/modify`, member)

    return res.data
}