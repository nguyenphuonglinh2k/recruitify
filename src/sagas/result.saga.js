import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import { InterviewResultService } from "services";
import ResultActions from "reduxStore/result.redux";

export function* getInterviewResultDetailRequest(action) {
  try {
    const response = yield call(
      InterviewResultService.getInterviewResultDetailOfApplicant,
      action.data,
    );

    if (response.status === ApiConstant.STT_OK) {
      const responseData = response.data;

      yield put(
        ResultActions.resultSuccess({
          result: responseData,
        }),
      );
    } else {
      yield put(ResultActions.resultFailure(response.data));
    }
  } catch (error) {
    yield put(ResultActions.resultFailure(error));
  }
}
