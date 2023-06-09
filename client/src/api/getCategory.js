import axiosInstance from "./axiosInstance"

export default async function getCategory(token) {
    const { data } = await axiosInstance.get(
        "users/user-category/",
        {
            headers: {
                Authorization: `Token ${token}`
            }
        },
    )
    return data
}