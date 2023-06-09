import axiosInstance from "./axiosInstance"

export default async function getFiles(token) {
    const { data } = await axiosInstance.get(
        "api/v1/files/",
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }
    )
    return data
}
