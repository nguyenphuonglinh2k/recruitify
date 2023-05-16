/**
 * Saga index: connects action type and saga
 */

import { all, takeLatest } from "redux-saga/effects";

/* ------------- Types ------------- */
import { UserTypes } from "reduxStore/user.redux";
import { JobTypes } from "reduxStore/job.redux";
import { AuthTypes } from "reduxStore/auth.redux";
import { ProjectTypes } from "reduxStore/project.redux";
import { ApplicationTypes } from "reduxStore/application.redux";
import { ResultTypes } from "reduxStore/result.redux";

/* ------------- Sagas ------------- */
import { getUserInfoRequest } from "./user.saga";
import { getJobsRequest, getJobDetailRequest } from "./job.saga";
import { postLoginRequest } from "./auth.saga";
import { getProjectDetailRequest } from "./project.saga";
import { getApplicationDetailRequest } from "./application.saga";
import { getInterviewResultDetailRequest } from "./result.saga";

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // Auth
    takeLatest(AuthTypes.POST_LOGIN_REQUEST, postLoginRequest),

    // User
    takeLatest(UserTypes.GET_USER_INFO_REQUEST, getUserInfoRequest),

    // Job
    takeLatest(JobTypes.GET_JOBS_REQUEST, getJobsRequest),
    takeLatest(JobTypes.GET_JOB_DETAIL_REQUEST, getJobDetailRequest),

    // Project
    takeLatest(
      ProjectTypes.GET_PROJECT_DETAIL_REQUEST,
      getProjectDetailRequest,
    ),

    // Application
    takeLatest(
      ApplicationTypes.GET_APPLICATION_DETAIL_REQUEST,
      getApplicationDetailRequest,
    ),

    // Result
    takeLatest(
      ResultTypes.GET_INTERVIEW_RESULT_DETAIL_REQUEST,
      getInterviewResultDetailRequest,
    ),
  ]);
}
