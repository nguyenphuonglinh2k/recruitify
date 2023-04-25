import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const postSignIn = data => Api.post(ApiConstant.POST_SIGN_IN, data);

export const postSignUp = data => Api.post(ApiConstant.POST_SIGN_UP, data);

export const putPasswordChange = (userId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_UPDATE_PASSWORD, { userId }), data);
