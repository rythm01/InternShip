import axiosInstance from "./axiosInstance"

export default async function postgoogleLogin(accessToken, code) {
    const { data } = await axiosInstance.post(
        "modules/social-auth/google/login/",
        {
            "access_token": accessToken,
            // "code": code
        }
    )
    return data
}