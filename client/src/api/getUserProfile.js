import axiosInstance from "./axiosInstance"

export default async function getUserProfile(token) {
    const { data } = await axiosInstance.get(
        "/users/profile/",
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }
    )
    return data
}