import axios from ".";

export const addBuddiesToFilePermissionApi = async (t, data) => {
  try {
    return axios.post(`/permissions`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const deleteBuddiesToFilePermissionApi = async (t, id, buddyId) => {
  try {
    return axios.delete(`/permissions/${id}/${buddyId}`, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const getFileAccessApi = async (t, id) => {
  try {
    return axios.get(`/permissions/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};
