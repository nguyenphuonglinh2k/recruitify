import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import { UserService } from "services";
import UserActions from "reduxStore/user.redux";

export function* getUserInfoRequest(action) {
  try {
    const { data } = action;

    const response = yield call(UserService.getUserInfo, data);

    if (response.data.status === ApiConstant.STT_OK) {
      const responseData = response.data;

      yield put(
        UserActions.userSuccess({
          user: responseData,
        }),
      );
    } else {
      yield put(UserActions.userFailure(response.data));
    }
  } catch (error) {
    yield put(UserActions.userFailure(error));
  }
}
