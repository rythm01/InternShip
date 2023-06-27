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

export const getCreditCardDetail = async (t, id) => {
  try {
    return axios.get(`/password-type/credit-card/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const postCreditCard = async (t, data) => {
  try {
    return axios.post(`/password-type/credit-card/`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const updateCreditCard = async (t, id, data) => {
  try {
    return axios.put(`/password-type/credit-card/${id}`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const getCreditCardList = async (t) => {
  try {
    return axios.get(`/password-type/credit-card/`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const deleteCreditCard = async (t, id) => {
  try {
    return axios.delete(`/password-type/credit-card/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const getLoanAccountDetails = async (t, id) => {
  try {
    return axios.get(`/password-type/loan-account/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const postLoanAccount = async (t, data) => {
  try {
    return axios.post(`/password-type/loan-account/`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const updateLoanAccount = async (t, id, data) => {
  try {
    return axios.put(`/password-type/loan-account/${id}`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const getLoanAccountList = async (t) => {
  try {
    return axios.get(`/password-type/loan-account/`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const deleteLoanAccount = async (t, id) => {
  try {
    return axios.delete(`/password-type/loan-account/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const getMerchantAccountDetails = async (t, id) => {
  try {
    return axios.get(`/password-type/merchant-account/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const postMerchantAccount = async (t, data) => {
  try {
    return axios.post(`/password-type/merchant-account/`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const updateMerchantAccount = async (t, id, data) => {
  try {
    return axios.put(`/password-type/merchant-account/${id}`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const getMerchantAccountList = async (t) => {
  try {
    return axios.get(`/password-type/merchant-account/`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const deleteMerchantAccount = async (t, id) => {
  try {
    return axios.delete(`/password-type/merchant-account/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const getPasswordStorageDetails = async (t, id) => {
  try {
    return axios.get(`/password-type/password-non-bank/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const postPasswordStorage = async (t, data) => {
  try {
    return axios.post(`/password-type/password-non-bank/`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const updatePasswordStorage = async (t, id, data) => {
  try {
    return axios.put(`/password-type/password-non-bank/${id}`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const getPasswordStorageList = async (t) => {
  try {
    return axios.get(`/password-type/password-non-bank/`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const deletePasswordStorage = async (t, id) => {
  try {
    return axios.delete(`/password-type/password-non-bank/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

// Misc Password

export const getMiscPasswordDetails = async (t, id) => {
  try {
    return axios.get(`/password-type/misc-password/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const postMiscPassword = async (t, data) => {
  try {
    return axios.post(`/password-type/misc-password/`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const updateMiscPassword = async (t, id, data) => {
  try {
    return axios.put(`/password-type/misc-password/${id}`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const getMiscPasswordList = async (t) => {
  try {
    return axios.get(`/password-type/misc-password/`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const deleteMiscPassword = async (t, id) => {
  try {
    return axios.delete(`/password-type/misc-password/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

// Recipe Form

export const getRecipeFormDetails = async (t, id) => {
  try {
    return axios.get(`/password-type/recipe-account/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const postRecipeForm = async (t, data) => {
  try {
    return axios.post(`/password-type/recipe-account/`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const updateRecipeForm = async (t, id, data) => {
  try {
    return axios.put(`/password-type/recipe-account/${id}`, data, {
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }
};

export const getRecipeFormList = async (t) => {
  try {
    return axios.get(`/password-type/recipe-account/`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const deleteRecipeForm = async (t, id) => {
  try {
    return axios.delete(`/password-type/recipe-account/${id}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};
