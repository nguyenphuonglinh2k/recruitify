import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getTasks = (userId, params) =>
  Api.get(StringFormat(ApiConstant.GET_TASKS, { userId }), params);

export const getTaskDetail = (userId, taskId) => {
  return Api.get(StringFormat(ApiConstant.GET_TASK_DETAIL, { taskId, userId }));
};

export const postTask = data => Api.post(ApiConstant.POST_TASK, data);

export const putTask = (taskId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_TASK, { taskId }), data);

export const deleteTask = taskId =>
  Api.delete(StringFormat(ApiConstant.DELETE_TASK, { taskId }));
