import axiosInstance from "./axiosInstance"

export default async function postfacebookLogin(accessToken, id) {
    const { data } = await axiosInstance.post(
        "modules/social-auth/facebook/login/",
        {
            "access_token": accessToken,
            // "code": id
        }
    )
    return data
}