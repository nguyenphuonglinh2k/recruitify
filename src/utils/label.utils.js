import { APPLICATION_STATUS, USER_ROLE } from "const/app.const";

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
