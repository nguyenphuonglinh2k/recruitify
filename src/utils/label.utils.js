import { APPLICATION_STATUS } from "const/app.const";

export const onGetApplicationStatusLabel = status => {
  switch (status) {
    case APPLICATION_STATUS.interview:
      return "On Interviewing";
    case APPLICATION_STATUS.reject:
      return "On Rejected";
    case APPLICATION_STATUS.hire:
      return "On Hired";
    case APPLICATION_STATUS.screening:
    default:
      return "On Screening";
  }
};
