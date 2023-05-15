import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getTrainResults = params =>
  Api.get(ApiConstant.GET_TRAIN_RESULTS, params);

export const getTrainResultDetail = resultId =>
  Api.get(StringFormat(ApiConstant.GET_TRAIN_RESULT_DETAIL, { resultId }));

export const postTrainResult = data =>
  Api.post(ApiConstant.POST_TRAIN_RESULT, data);

export const putTrainResult = (resultId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_TRAIN_RESULT, { resultId }), data);
