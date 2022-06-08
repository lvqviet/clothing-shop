import { create } from "apisauce";

const baseURL = "https://ecommerce-back-end-spring-boot.herokuapp.com/api/v1";

const api = create({ baseURL });

export const setNewToken = (token) => {
  if (token) {
    api.setHeader("Authorization", "Bearer" + token);
  } else {
    api.deleteHeader("Authorization");
  }
};

export default api;
