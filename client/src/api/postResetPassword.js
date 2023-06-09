import axiosInstance from "./axiosInstance"

export default async function postResetPassword(email) {
  const { data } = await axiosInstance.post("/users/reset-password/send/", {
    email
  })

  return data
}
