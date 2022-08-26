import api from "./api";
import API_CONSTANTS from "./constants";

export default {
  getProducts: () => api.get(API_CONSTANTS.PRODUCT.GET),

  getById: (id) => api.get(API_CONSTANTS.PRODUCT.GET_BY_ID(id)),

  getCategories: () => api.get(API_CONSTANTS.CATEGORY.GET),

  getCategoryById: (id) => api.get(API_CONSTANTS.CATEGORY.GET_BY_ID(id)),

  sendRating: (id, params) => api.post(API_CONSTANTS.RATING.SEND(id), params),

  deleteRating: (id) => api.delete(API_CONSTANTS.RATING.DELETE(id)),
};
