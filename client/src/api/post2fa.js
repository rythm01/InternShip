import axiosInstance from "./axiosInstance"

export default async function post2fa(code) {
    const { data } = await axiosInstance.post(
        "/users/verify/2FA/",
        {
            'token': code
        }
    )
    return data
}
