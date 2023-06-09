import axiosInstance from "./axiosInstance"

export default async function getBuddy(token) {
    const { data } = await axiosInstance.get(
        "/users/buddy-invitation/",
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }
    )
    return data
}
