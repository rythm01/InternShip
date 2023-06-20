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

export default postBankAccountForm;
