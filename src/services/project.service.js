import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getProjects = (userId, params) =>
  Api.get(StringFormat(ApiConstant.GET_PROJECTS, { userId }), params);

export const getProjectDetail = projectId =>
  Api.get(StringFormat(ApiConstant.GET_PROJECT_DETAIL, { projectId }));
