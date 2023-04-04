import {
  APPLICATION_STATUS,
  PROJECT_AND_TASK_STATUS,
  USER_ROLE,
} from "const/app.const";

export const onGetProjectAndTaskStatusLabel = status => {
  switch (status) {
    case PROJECT_AND_TASK_STATUS.new:
      return "New";
    case PROJECT_AND_TASK_STATUS.doing:
      return "Doing";
    case PROJECT_AND_TASK_STATUS.done:
      return "Done";
    default:
      return "Undefined";
  }
};

export const onGetApplicationStatusLabel = status => {
  switch (status) {
    case APPLICATION_STATUS.interview:
      return "Interviewing";
    case APPLICATION_STATUS.reject:
      return "Rejected";
    case APPLICATION_STATUS.hire:
      return "Hired";
    case APPLICATION_STATUS.screening:
    default:
      return "Screening";
  }
};

export const onGetUserRoleLabel = role => {
  switch (role) {
    case USER_ROLE.admin:
      return "Admin";
    case USER_ROLE.hr:
      return "HR";
    case USER_ROLE.manager:
      return "Manager";
    case USER_ROLE.candidate:
    default:
      return "Member";
  }
};
