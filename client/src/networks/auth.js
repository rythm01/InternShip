import axios from './index'


export const register = async (data) => {
    try {
        return axios.post('/auth/register', data)
    } catch (err) {
        return err
    }
}

export const login = async (data) => {
    try {
        return axios.post('/auth/login', data)
    } catch (err) {
        return err
    }
}

export const verifyCode = async (data) => {
    try {
        return axios.post('/auth/2fa', data)
    } catch (err) {
        return err
    }
}

export const resendCode = async (data) => {
    try {
        return axios.post('/auth/resend', data)
    } catch (err) {
        return err
    }
}