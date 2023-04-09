import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getJobs = () => Api.get(ApiConstant.GET_JOBS);

export const getJobDetail = jobId =>
  Api.get(StringFormat(ApiConstant.GET_JOB_DETAIL, { jobId }));
