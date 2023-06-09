import axiosInstance from "./axiosInstance"

export default async function deleteBuddy(token, id) {
    const { data } = await axiosInstance.delete(
        `users/buddy-invitation/${id}/`,
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }
    )
    return data
}
