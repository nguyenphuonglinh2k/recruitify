import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";
import axios from "axios";

export const getUsers = params => Api.get(ApiConstant.GET_USERS, params);

export const getUserInfo = async userId => {
  return Api.get(StringFormat(ApiConstant.GET_USER_INFO, { userId }));
};

export const putUserInfo = async (userId, data) => {
  return Api.put(StringFormat(ApiConstant.PUT_USER_INFO, { userId }), data);
};

export const postCloudinaryUpload = async data => {
  const response = await axios.post(process.env.CLOUDINARY_UPLOAD_URL, data, {
    headers: ApiConstant.HEADER_FORM_DATA_DEFAULT,
  });

  return response;
};
