const API_CONSTANTS = {
  AUTH: {
    LOGIN: "auth/signin",
    REGISTER: "signup",
    FORGOT_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: (id) => `auth/reset-password/${id}`,
  },
  USER: {
    GET_BY_ID: (id) => `users/${id}`,
    CHANGE_PASSWORD: "auth/changePassword",
    UPDATE: (id) => `users/${id}`,
  },
  PRODUCT: {
    GET: (page = 0, pageSize = 10) =>
      `product?pageNumber=${page}&pageSize=${pageSize}`,
    GET_BY_ID: (id) => `product/${id}`,
  },
  CART: {
    GET: (id) => `cart/get-by-userId/${id}`,
    CREATE: "cart",
    UPDATE: (id) => `cart/${id}`,
  },
  ORDER: {
    CREATE: "order",
    UPDATE_STATUS: (id) => `order/${id}`,
    GET_ALL: (id) => `order/get-by-userId/${id}`,
  },
};

export default API_CONSTANTS;
