import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import { ProjectService } from "services";
import ProjectActions from "reduxStore/project.redux";

export function* getProjectDetailRequest(action) {
  const projectId = action.data;

  try {
    const response = yield call(ProjectService.getProjectDetail, projectId);

    if (response.status === ApiConstant.STT_OK) {
      const responseData = response.data;

      yield put(
        ProjectActions.projectSuccess({
          project: responseData,
        }),
      );
    } else {
      yield put(ProjectActions.projectFailure(response.data));
    }
  } catch (error) {
    yield put(ProjectActions.projectFailure(error));
  }
}
