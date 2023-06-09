import axios from './'


export const getNotificationApi = async (t) => {
    try {
        return axios.get(`/notifications`, {
            headers: {
                Authorization: `Bearer ${t}`
            }
        })
    } catch (err) {
        return err
    }
}


