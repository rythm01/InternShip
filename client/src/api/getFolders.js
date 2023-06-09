import axiosInstance from "./axiosInstance"

export default async function getFolders(token) {
    const { data } = await axiosInstance.get(
        "api/v1/folders/?limit=100&offset=0",
        {
            headers: {
                Authorization: `Token ${token}`
            }
        },
    )
    return data
}