import axiosInstance from "./axiosInstance"

export default async function postgoogleSignup(accessToken, code) {
    const { data } = await axiosInstance.post(
        "modules/social-auth/google/connect/",
        {
            "access_token": accessToken,
            // "code": code
        }
    )
    return data
}