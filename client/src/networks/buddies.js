import axios from ".";

export const createBuddyApi = async (t, id) => {
  try {
    return axios.post(
      `/buddies/create`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const getBuddiesApi = async (t) => {
  try {
    return await axios.get(`/buddies`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    return err;
  }
};

export const addBuddyApi = async (t, form) => {
  try {
    return axios.post(`/buddies`, form, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBuddyApi = async (t, form) => {
  try {
    return axios.post(`/buddies/delete`, form, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
