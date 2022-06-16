import api from "./api";
import API_CONSTANTS from "./constants";

export default {
  get: (id) => api.get(API_CONSTANTS.CART.GET(id)),

  create: (params) => api.post(API_CONSTANTS.CART.CREATE, params),

  update: (id, params) => api.post(API_CONSTANTS.CART.UPDATE(id), params),
};
