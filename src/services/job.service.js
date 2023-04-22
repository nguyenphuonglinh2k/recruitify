import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getJobs = params => Api.get(ApiConstant.GET_JOBS, params);

export const getJobApplications = jobId =>
  Api.get(StringFormat(ApiConstant.GET_JOB_APPLICATIONS, { jobId }));

export const postJob = data => Api.post(ApiConstant.POST_JOB, data);

export const putJob = (jobId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_JOB, { jobId }), data);

export const getJobDetail = jobId =>
  Api.get(StringFormat(ApiConstant.GET_JOB_DETAIL, { jobId }));

export const deleteJob = jobId =>
  Api.delete(StringFormat(ApiConstant.DELETE_JOB, { jobId }));
