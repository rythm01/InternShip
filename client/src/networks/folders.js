import axios from './'


export const getFolders = async (t) => {
    try {
        return axios.get(`/folders`, {
            headers: {
                Authorization: `Bearer ${t}`
            }
        })
    } catch (err) {
        return err
    }
}


export const getFolder = async (t, id) => {
    try {
        return axios.get(`/folders/${id}`, {
            headers: {
                Authorization: `Bearer ${t}`
            }
        })
    } catch (err) {
        return err
    }
}




export const createFolder = async (t, data) => {
    try {

        return axios.post(`/folders`, data, {
            headers: {
                Authorization: `Bearer ${t}`,
                'Content-Type': 'application/json'
            }
        })

    } catch (err) {
        return err
    }
}


export const updateFolder = async (t, id, data) => {
    try {
        return axios.put(`/folders/${id}`, data, {
            headers: {
                Authorization: `Bearer ${t}`,
                'Content-Type': 'application/json'

            }
        })
    } catch (err) {
        return err
    }
}


export const deleteFolderApi = async (t, id) => {
    try {
        return axios.delete(`/folders/${id}`, {
            headers: {
                Authorization: `Bearer ${t}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (err) {
        return err
    }
}