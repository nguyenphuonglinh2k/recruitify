import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getTasks = (userId, params) =>
  Api.get(StringFormat(ApiConstant.GET_TASKS, { userId }), params);

export const getTaskDetail = (userId, taskId) =>
  Api.get(StringFormat(ApiConstant.GET_TASK_DETAIL, { userId, taskId }));

export const postTask = data => Api.post(ApiConstant.POST_TASK, data);

export const deleteTask = taskId =>
  Api.delete(StringFormat(ApiConstant.DELETE_TASK, { taskId }));
