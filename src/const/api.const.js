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

// User
export const GET_USERS = "/users";
export const GET_USER_INFO = "/user/{userId}";
export const PUT_USER_INFO = "/profile/{userId}";

// Job
export const GET_JOBS = "/jobs";
export const GET_JOB_DETAIL = "/job/{jobId}";

// Project
export const GET_PROJECTS = "/projects/{userId}";
export const GET_PROJECT_DETAIL = "/project/{projectId}";
export const DELETE_PROJECT = "/project/{projectId}";
export const GET_TASKS_OF_PROJECT = "/project/{projectId}/tasks";

// Task
export const GET_TASKS = "/member/{userId}/tasks";
export const GET_TASK_DETAIL = "/task/{tasksId}/{userId}";
export const PUT_TASK = "/task/{tasksId}";
export const DELETE_TASK = "/task/{tasksId}";
