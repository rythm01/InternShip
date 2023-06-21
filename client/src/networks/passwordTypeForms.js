import axios from "./";

export const postBankAccountForm = async (t, data) => {
  try {
    return axios.post(`/password-type/bank-password/`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const getBankAccountForm = async (t, data) => {
  try {
    return axios.get(`/password-type/bank-password/`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const deleteBankAccountForm = async (t, id) => {
  try {
    return axios.delete(`/password-type/bank-password/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const getBankAccountDetail = async (t, id) => {
  try {
    return axios.get(`/password-type/bank-password/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const updateBankAccountForm = async (t, id, data) => {
  try {
    return axios.put(`/password-type/bank-password/${id}`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};
