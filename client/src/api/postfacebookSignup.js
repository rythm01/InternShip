import axiosInstance from "./axiosInstance"

export default async function postfacebookSignup(accessToken, id) {
    const { data } = await axiosInstance.post(
        "modules/social-auth/facebook/connect/",
        {
            "access_token": accessToken,
            // "code": id
        }
    )
    return data
}