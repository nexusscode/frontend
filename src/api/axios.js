/*
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://http://ec2.jobveloper.co.kr:8080', // 여기에 Swagger API 주소
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청마다 토큰 자동 추가
api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken')
  const userId = localStorage.getItem('userId')

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  if (userId) {
    config.headers['userId'] = userId
  }

  return config
})

export default api
*/
