import axiosInstance from "./axiosInstance"

export default async function postAddBuddy(token, email, relation) {
  const { data } = await axiosInstance.post(
    "/users/buddy-invitation/",
    {
      email,
      relationship: relation
    },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  )
  return data
}
