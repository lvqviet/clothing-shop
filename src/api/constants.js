const API_CONSTANTS = {
  AUTH: {
    LOGIN: "auth/signin",
    REGISTER: "user",
    FORGOT_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: (id) => `auth/reset-password/${id}`,
  },
  USER: {
    GET_BY_ID: (id) => `users/${id}`,
    CHANGE_PASSWORD: "auth/changePassword",
  },
  PRODUCT: {
    GET: (page = 0, pageSize = 10) =>
      `product?pageNumber=${page}&pageSize=${pageSize}`,
    GET_BY_ID: (id) => `product/${id}`,
  },
};

export default API_CONSTANTS;
