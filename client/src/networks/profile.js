import axios from "./";

export const getProfile = async (t) => {
  try {
    return axios.get(`/profile`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const createProfile = async (t, data) => {
  try {
    console.log(data, "datatta");
    return axios.post(`/profile`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    return err;
  }
};

export const updateProfile = async (t, data) => {
  try {
    return axios.put(`/profile`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    return err;
  }
};
