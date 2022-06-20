import api from "./api";
import API_CONSTANTS from "./constants";

export default {
  getMe: (id) => api.get(API_CONSTANTS.USER.GET_BY_ID(id)),

  changePassword: (params) =>
    api.post(API_CONSTANTS.USER.CHANGE_PASSWORD, params),

  update: (id, params) => api.post(API_CONSTANTS.USER.UPDATE(id), params),
};
