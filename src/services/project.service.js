import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getProjects = (userId, params) =>
  Api.get(StringFormat(ApiConstant.GET_PROJECTS, { userId }), params);

export const postProject = data => Api.post(ApiConstant.POST_PROJECT, data);

export const putProject = (projectId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_PROJECT, { projectId }), data);

export const getProjectDetail = projectId =>
  Api.get(StringFormat(ApiConstant.GET_PROJECT_DETAIL, { projectId }));

export const getTasksOfProject = (projectId, params) =>
  Api.get(
    StringFormat(ApiConstant.GET_TASKS_OF_PROJECT, { projectId }),
    params,
  );

export const deleteProject = projectId =>
  Api.delete(StringFormat(ApiConstant.DELETE_PROJECT, { projectId }));
