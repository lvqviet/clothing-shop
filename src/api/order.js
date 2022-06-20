import api from "./api";
import API_CONSTANTS from "./constants";

export default {
  create: (params) => api.post(API_CONSTANTS.ORDER.CREATE, params),

  updateStatus: (id, params) =>
    api.post(API_CONSTANTS.ORDER.UPDATE_STATUS(id), params),

  getAll: (id) => api.get(API_CONSTANTS.ORDER.GET_ALL(id)),
};
