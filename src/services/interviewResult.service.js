import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getInterviewResults = params =>
  Api.get(ApiConstant.GET_INTERVIEW_RESULTS, params);

export const getInterviewResultDetailOfApplicant = applicationId =>
  Api.get(
    StringFormat(ApiConstant.GET_INTERVIEW_RESULT_DETAIL_OF_APPLICANT, {
      applicationId,
    }),
  );

export const getInterviewResultDetail = resultId =>
  Api.get(StringFormat(ApiConstant.GET_INTERVIEW_RESULT_DETAIL, { resultId }));

export const postInterviewResult = data =>
  Api.post(ApiConstant.POST_INTERVIEW_RESULT, data);

export const putInterviewResult = (resultId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_INTERVIEW_RESULT, { resultId }), data);
