import axiosInstance from "./axiosInstance"

export default async function getFilesCount(token) {
    const { data } = await axiosInstance.get(
        "api/v1/type-count/",
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }
    )
    return data
}
