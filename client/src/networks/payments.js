import axios from './'


export const createPaymentIntent = async (t, data) => {
    try {

        return axios.post(`/payments`, data, {
            headers: {
                Authorization: `Bearer ${t}`,
                'Content-Type': 'application/json'
            }
        })

    } catch (err) {
        return err
    }
}

