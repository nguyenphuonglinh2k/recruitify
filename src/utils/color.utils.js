import { USER_ROLE } from "const/app.const";
import { COLORS } from "utils";

export const onGetUserRoleLabelColor = role => {
  switch (role) {
    case USER_ROLE.admin:
      return COLORS.darkGreen;
    case USER_ROLE.hr:
    case USER_ROLE.manager:
      return COLORS.orange.dark;
    case USER_ROLE.candidate:
    default:
      return COLORS.blue.neutral;
  }
};

export const onGetUserRoleBackgroundColor = role => {
  switch (role) {
    case USER_ROLE.admin:
      return COLORS.lightGreen;
    case USER_ROLE.hr:
    case USER_ROLE.manager:
      return COLORS.orange.light;
    case USER_ROLE.candidate:
    default:
      return COLORS.blue[100];
  }
};

export const onGetProgressBarColor = progress => {
  if (progress === 1) {
    return COLORS.darkGreen;
  } else {
    return COLORS.orange.dark;
  }
};
