import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getApplications = params =>
  Api.get(ApiConstant.GET_APPLICATIONS, params);

export const getApplicationDetail = applicationId =>
  Api.get(StringFormat(ApiConstant.GET_APPLICATION_DETAIL, { applicationId }));

export const deleteApplication = applicationId =>
  Api.delete(StringFormat(ApiConstant.DELETE_APPLICATION, { applicationId }));
