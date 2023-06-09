import axiosInstance from "./axiosInstance"

export default async function postFolder(value, token) {
    const { data } = await axiosInstance.post(
        "api/v1/folders/",
        {
            "name": value
        },
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }

    )
    return data
}