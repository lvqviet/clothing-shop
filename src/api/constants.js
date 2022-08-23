const API_CONSTANTS = {
  AUTH: {
    LOGIN: "auth/signin",
    REGISTER: "auth/signup",
    // FORGOT_PASSWORD: "auth/forgot-password",
    // RESET_PASSWORD: (id) => `auth/reset-password/${id}`,
  },
  USER: {
    PROFILE: "users/me/profile",
    UPDATE_PASSWORD: "users/me/password",
  },
  PRODUCT: {
    GET: "products",
    GET_BY_ID: (id) => `products/${id}`,
  },
  CATEGORY: {
    GET: "categories",
    GET_BY_ID: (id) => `categories/${id}`,
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
