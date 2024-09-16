const axios = require("axios");
/**
 * Axios Utility
 *
 */

const axiosUtil = (baseURL, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const instance = axios.create({
    baseURL,
    headers,
  });

  return instance;
};

module.exports = axiosUtil;
