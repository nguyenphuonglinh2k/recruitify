export const BASE_URL = "https://recruitify-backend.vercel.app/api";

export const HEADER_DEFAULT = {
  Accept: "application/json",
  "content-Type": "application/json",
};

export const TIMEOUT = 15000;

export const HEADER_FORM_DATA_DEFAULT = {
  "content-Type": "multipart/form-data",
};

// HTTP Status
export const STT_OK = 200;
export const STT_CREATED = 201;
export const STT_BAD_REQUEST = 400;
export const STT_UNAUTHORIZED = 401;
export const STT_FORBIDDEN = 403;
export const STT_NOT_FOUND = 404;
export const STT_INTERNAL_SERVER = 500;

// Auth
export const POST_SIGN_IN = "/auth/login";
export const POST_SIGN_UP = "/auth/signup";
export const PUT_UPDATE_PASSWORD = "/auth/update-password/{userId}";

// User
export const GET_USERS = "/users";
export const GET_USER_INFO = "/user/{userId}";
export const PUT_USER_INFO = "/profile/{userId}";

// Job
export const GET_JOBS = "/jobs";
export const POST_JOB = "/job";
export const PUT_JOB = "/job/{jobId}";
export const GET_JOB_DETAIL = "/job/{jobId}";
export const GET_JOB_APPLICATIONS = "/job/{jobId}/applications";
export const DELETE_JOB = "/job/{jobId}";

// Application
export const GET_APPLICATIONS = "/applications";
export const GET_APPLICATION_DETAIL = "/application/{applicationId}";
export const POST_APPLICATION = "/application";
export const PUT_APPLICATION = "/application/{applicationId}";
export const DELETE_APPLICATION = "/application/{applicationId}";

// Schedule
export const GET_SCHEDULES = "/schedules";
export const GET_SCHEDULE_DETAIL = "/schedule/{scheduleId}";
export const POST_SCHEDULE = "/schedule";
export const PUT_SCHEDULE = "/schedule/{scheduleId}";
export const DELETE_SCHEDULE = "/schedule/{scheduleId}";

// Project
export const GET_PROJECTS = "/projects/{userId}";
export const GET_MEMBERS_TASKS_NOT_IN_PROJECT =
  "/project/{projectId}/member-tasks";
export const POST_PROJECT = "/project";
export const PUT_PROJECT = "/project/{projectId}";
export const PUT_PROJECT_MEMBERS = "/project/{projectId}/members";
export const PUT_PROJECT_TASKS = "/project/{projectId}/tasks";
export const GET_PROJECT_DETAIL = "/project/{projectId}";
export const DELETE_PROJECT = "/project/{projectId}";
export const DELETE_TASK_OUT_OF_PROJECT = "/project/{projectId}/task/{taskId}";
export const GET_TASKS_OF_PROJECT = "/project/{projectId}/tasks";
export const GET_PROJECT_MEMBERS = "/project/{projectId}/members";

// Task
export const GET_TASKS = "/member/{userId}/tasks";
export const GET_TASK_DETAIL = "/task/{taskId}/{userId}";
export const POST_TASK = "/task";
export const PUT_TASK = "/task/{taskId}";
export const DELETE_TASK = "/task/{taskId}";

// Tag
export const GET_TAGS = "/tags";
export const POST_TAGS = "/tags";
export const PUT_TAG = "/tag/{tagId}";
export const DELETE_TAG = "/tag/{tagId}";
