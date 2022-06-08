import api from "./api";
import API_CONSTANTS from "./constants";

export default {
  getMe: () => api.get(API_CONSTANTS.USER.ME),

  changePassword: (params) =>
    api.post(API_CONSTANTS.USER.CHANGE_PASSWORD, params),
};
