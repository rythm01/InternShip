import axiosInstance from "./axiosInstance"

export default async function postResetPasswordVerify(email, token, password) {
  const message = axiosInstance.post("/users/reset-password/verify/", {
    email,
    token,
    password
  })

  return message
}
