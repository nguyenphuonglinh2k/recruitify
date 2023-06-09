import { call, put } from "redux-saga/effects";
import { ApiConstant, AppConstant } from "const";
import { AuthService } from "services";
import AuthActions from "reduxStore/auth.redux";
import { StorageUtils } from "utils";

export function* postLoginRequest(action) {
  try {
    const response = yield call(AuthService.postSignIn, action.data);

    if (response.status === ApiConstant.STT_OK) {
      const { token, user } = response.data;

      const bearToken = `Bearer ${token}`;
      StorageUtils.set(AppConstant.AUTH_TOKEN_KEY, bearToken);

      yield put(
        AuthActions.authSuccess({
          token: bearToken,
          isLoggedIn: true,
          user,
        }),
      );
    } else {
      yield put(AuthActions.authFailure(response.data));
    }
  } catch (error) {
    yield put(AuthActions.authFailure(error));
  }
}
