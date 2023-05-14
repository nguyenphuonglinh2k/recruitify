import {
  APPLICATION_STATUS,
  PROGRESS_STATUS,
  RESULT_STATUS,
  USER_ROLE,
} from "const/app.const";

export const onGetResultStatusLabel = status => {
  switch (status) {
    case RESULT_STATUS.qualified:
      return "Qualified";
    case RESULT_STATUS.unqualified:
      return "Unqualified";
    default:
      return "Undefined";
  }
};

export const onGetProjectAndTaskStatusLabel = status => {
  switch (status) {
    case PROGRESS_STATUS.new:
      return "New";
    case PROGRESS_STATUS.doing:
      return "Doing";
    case PROGRESS_STATUS.done:
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
