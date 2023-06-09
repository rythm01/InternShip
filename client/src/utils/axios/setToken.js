import axios from "axios"

export default function setToken(token) {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = token
    return config
  })
}
