import axiosInstance from "./axiosInstance"

export default async function putUserProfile(token, dataToSubmit) {
    const userId = dataToSubmit.id;
    delete dataToSubmit.id;
    const form = new FormData();
    Object.keys(dataToSubmit).map(element => {
        console.log('form data...', element, dataToSubmit[element]);
        form.append(element, dataToSubmit[element]);
    });
    const { data } = await axiosInstance.put(
        `/users/profile/${userId}/`,
        form,
        {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'multipart/form-data',
                "Accept": "application/json",
            }
        }
    );
    return data;
}