import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import { ApplicationService } from "services";
import ApplicationActions from "reduxStore/application.redux";

export function* getApplicationDetailRequest(action) {
  const applicationId = action.data;

  try {
    const response = yield call(
      ApplicationService.getApplicationDetail,
      applicationId,
    );

    if (response.status === ApiConstant.STT_OK) {
      const responseData = response.data;

      yield put(
        ApplicationActions.applicationSuccess({
          application: responseData,
        }),
      );
    } else {
      yield put(ApplicationActions.applicationFailure(response.data));
    }
  } catch (error) {
    yield put(ApplicationActions.applicationFailure(error));
  }
}
