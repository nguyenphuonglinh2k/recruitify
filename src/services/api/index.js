import axios from "axios";
import { ApiConstant, AppConstant } from "const";
import { StorageUtils } from "utils";
import store from "reduxStore";
import AuthActions from "reduxStore/auth.redux";

const requestAbortCode = "ECONNABORTED";

export const defaultConfig = {
  baseURL: ApiConstant.BASE_URL,
  headers: ApiConstant.HEADER_DEFAULT,
  timeout: ApiConstant.TIMEOUT,
};
const axiosInstance = axios.create(defaultConfig);

const ApiContainer = class {
  constructor() {
    this.token = null;
  }

  async headers(params) {
    const keys = Object.keys(params);
    keys.map(key => {
      axiosInstance.defaults.headers.common[key] = params[key];
    });
  }

  async getToken() {
    const token = await StorageUtils.get(AppConstant.AUTH_TOKEN_KEY);
    this.token = token;
  }

  async get(endpoint, params = {}) {
    try {
      const response = await axiosInstance.get(endpoint, params);
      return response;
    } catch (error) {
      this.handleError(error, endpoint);
    }
  }

  async post(endpoint, body = {}, params = {}) {
    try {
      const response = await axiosInstance.post(endpoint, body, params);
      return response;
    } catch (error) {
      this.handleError(error, endpoint);
      return error.response;
    }
  }

  async put(endpoint, body = {}, params = {}) {
    try {
      const response = await axiosInstance.put(endpoint, body, params);
      return response;
    } catch (error) {
      this.handleError(error, endpoint);
    }
  }

  async delete(endpoint, body) {
    try {
      const response = await axiosInstance.delete(endpoint, { data: body });
      return response;
    } catch (error) {
      this.handleError(error, endpoint);
    }
  }

  handleError(error, endpoint) {
    if (
      error.response &&
      error.response.status === ApiConstant.STT_UNAUTHORIZED
    ) {
      // Handle 401
      console.log("handleError 401");
      StorageUtils.remove(AppConstant.AUTH_TOKEN_KEY);
      store.dispatch(
        AuthActions.authSuccess({
          isLoggedIn: false,
        }),
      );
    } else if (
      error.code === requestAbortCode ||
      ("response" in error && error.response === undefined)
    ) {
      // delay(1000);
      error.recall = true;
    } else {
      console.log("handleError", error, endpoint);
    }
  }
};

const api = new ApiContainer();

export default api;
