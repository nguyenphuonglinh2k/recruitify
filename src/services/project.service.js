import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getProjectStatistics = () =>
  Api.get(ApiConstant.GET_PROJECT_STATISTICS);

export const getProjects = (userId, params) =>
  Api.get(StringFormat(ApiConstant.GET_PROJECTS, { userId }), params);

export const getTasksOfMembersNotInProject = projectId =>
  Api.get(
    StringFormat(ApiConstant.GET_MEMBERS_TASKS_NOT_IN_PROJECT, { projectId }),
  );

export const postProject = data => Api.post(ApiConstant.POST_PROJECT, data);

export const putProject = (projectId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_PROJECT, { projectId }), data);

export const putProjectMembers = (projectId, data) => {
  return Api.put(
    StringFormat(ApiConstant.PUT_PROJECT_MEMBERS, { projectId }),
    data,
  );
};

export const putProjectTasks = (projectId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_PROJECT_TASKS, { projectId }), data);

export const getProjectDetail = projectId =>
  Api.get(StringFormat(ApiConstant.GET_PROJECT_DETAIL, { projectId }));

export const getTasksOfProject = (projectId, params) =>
  Api.get(
    StringFormat(ApiConstant.GET_TASKS_OF_PROJECT, { projectId }),
    params,
  );

export const getProjectMembers = projectId =>
  Api.get(StringFormat(ApiConstant.GET_PROJECT_MEMBERS, { projectId }));

export const deleteProject = projectId =>
  Api.delete(StringFormat(ApiConstant.DELETE_PROJECT, { projectId }));

export const deleteTaskOutOfProject = ({ projectId, taskId }) =>
  Api.delete(
    StringFormat(ApiConstant.DELETE_TASK_OUT_OF_PROJECT, { projectId, taskId }),
  );
