import { API_SERVER_HOST } from "./host";
import env from "./env";
import axios from "axios";

const host = `${API_SERVER_HOST}`

export const loginPost = async (loginParam) => {

    const form = new FormData()
    form.append("username", loginParam.email)
    form.append("password", loginParam.pw)

    const res = await axios.post(`${host}/api/user/login`, form, {
        headers: {
          "Content-Type":"x-www-form-urlencoded"
        },
        withCredentials: true
      } )
    return res.data
}

export const modifyMember = async (member) => {
    const res = await env.put(`${host}/modify`, member)

    return res.data
}