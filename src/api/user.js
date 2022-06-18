import api from "./api";
import API_CONSTANTS from "./constants";

export default {
  getMe: (id) => api.get(API_CONSTANTS.USER.GET_BY_ID(id)),

  changePassword: (params) =>
    api.post(API_CONSTANTS.USER.CHANGE_PASSWORD, params),

  // uploadAvatar: (avatar) => {
  //   const formData = new FormData()
  //   formData.append('image', {
  //     uri: avatar,
  //     type: 'image/jpeg',
  //     name: 'avatar.jpg',
  //   })
  //   return api.post('https://api.imgur.com/3/upload', formData, {
  //     headers: { 'Authorization': 'Client-ID 546c25a59c58ad7' },
  //   })
  // },
};
