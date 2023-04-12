import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import { JobService } from "services";
import JobActions from "reduxStore/job.redux";

export function* getJobsRequest(action) {
  const data = action.data;

  try {
    const response = yield call(JobService.getJobs, data);

    if (response.status === ApiConstant.STT_OK) {
      yield put(
        JobActions.jobSuccess({
          jobs: response.data,
        }),
      );
    } else {
      yield put(JobActions.jobFailure(response.data));
    }
  } catch (error) {
    yield put(JobActions.jobFailure(error));
  }
}

export function* getJobDetailRequest(action) {
  const jobId = action.data;

  try {
    const response = yield call(JobService.getJobDetail, jobId);

    if (response.status === ApiConstant.STT_OK) {
      const responseData = response.data;

      yield put(
        JobActions.jobSuccess({
          job: responseData,
        }),
      );
    } else {
      yield put(JobActions.jobFailure(response.data));
    }
  } catch (error) {
    yield put(JobActions.jobFailure(error));
  }
}
