import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getJobs = params => Api.get(ApiConstant.GET_JOBS, params);

export const getJobDetail = jobId =>
  Api.get(StringFormat(ApiConstant.GET_JOB_DETAIL, { jobId }));
