import axios from '.'


export const getfiles = async (t) => {
    try {
        return axios.get(`/files`, {
            headers: {
                Authorization: `Bearer ${t}`
            }
        })
    } catch (err) {
        return err
    }
}


export const getFile = async (t, id) => {
    try {
        return axios.get(`/files/view/${id}`, {
            headers: {
                Authorization: `Bearer ${t}`,
            }
        })
    } catch (err) {
        return err
    }
}



export const getFileData = async (t, id) => {
    try {
        return axios.get(`/files/${id}`, {
            headers: {
                Authorization: `Bearer ${t}`,
                responseType: 'blob'
            }
        })
    } catch (err) {
        return err
    }
}




export const createFile = async (t, data) => {
    try {

        return axios.post(`/files`, data, {
            headers: {
                Authorization: `Bearer ${t}`,
                'Content-Type': 'multipart/form-data'

            }
        })

    } catch (err) {
        return err
    }
}


export const updateFile = async (t, id, data) => {
    try {
        return axios.put(`/files/${id}`, data, {
            headers: {
                Authorization: `Bearer ${t}`,
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        return err
    }
}


export const deleteFileData = async (t, id) => {
    try {
        return axios.delete(`/files/${id}`, {
            headers: {
                Authorization: `Bearer ${t}`,
            }
        })
    } catch (err) {
        return err
    }
}