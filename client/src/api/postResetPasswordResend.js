import axiosInstance from "./axiosInstance"

export default async function postResetPasswordResend(email) {
  const { data } = await axiosInstance.post("/users/reset-password/resend/", {
    email
  })
  return data
}
