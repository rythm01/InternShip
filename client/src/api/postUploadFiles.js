import axiosInstance from "./axiosInstance"

export default async function postUploadFiles(token, file, folderId) {
    const form = new FormData();
    form.append('folder_id', folderId || '44');
    form.append('file', file);
    const { data } = await axiosInstance.post(
        "api/v1/upload-file/", form,
        {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            }
        }
    )
    return data
}
