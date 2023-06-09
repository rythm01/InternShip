import axiosInstance from "./axiosInstance"

export default async function postLogin(username, password) {
  const { data } = await axiosInstance.post("/api/v1/login/", {
    username,
    password
  })
  return data
}
