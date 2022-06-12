import api from "./api";
import API_CONSTANTS from "./constants";

export default {
  getProducts: (page, pageSize) =>
    api.get(API_CONSTANTS.PRODUCT.GET(page, pageSize)),

  getById: (id) => api.get(API_CONSTANTS.PRODUCT.GET_BY_ID(id)),
};
