import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getSchedules = params =>
  Api.get(ApiConstant.GET_SCHEDULES, params);

export const getScheduleDetail = scheduleId =>
  Api.get(StringFormat(ApiConstant.GET_SCHEDULE_DETAIL, { scheduleId }));

export const postSchedule = data => Api.post(ApiConstant.POST_SCHEDULE, data);

export const putSchedule = (scheduleId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_SCHEDULE, { scheduleId }), data);

export const deleteSchedule = scheduleId =>
  Api.delete(StringFormat(ApiConstant.DELETE_SCHEDULE, { scheduleId }));
