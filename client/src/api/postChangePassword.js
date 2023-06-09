import axiosInstance from "./axiosInstance"

export default async function postChangePassword(password, confirmedPassword) {
  const token = localStorage.getItem("token")
  const { data } = await axiosInstance.post(
    "/rest-auth/password/change/",
    {
      new_password1: password,
      new_password2: confirmedPassword
    },
    {
      headers: {
        Authorization: token
      }
    }
  )
  return data
}
