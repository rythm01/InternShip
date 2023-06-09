import axiosInstance from "./axiosInstance"

export default async function postSignup(name, email, password, phoneNumber) {
  const { data } = await axiosInstance.post("/api/v1/signup/", {
    name,
    email,
    password,
    phone_number: phoneNumber
  })
  return data
}
