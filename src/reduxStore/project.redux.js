import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getProjectDetailRequest: ["data"],

  projectSuccess: ["data"],
  projectFailure: ["data"],
  projectReset: [],
});

export const ProjectTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  error: null,
  status: null,

  projects: [],
  project: {},
};

/* ------------- Reducers ------------- */
export const request = (state = INITIAL_STATE) => ({
  ...state,
  isFetching: true,
});

export const success = (state = INITIAL_STATE, action) => {
  const data = action.data || {};
  return {
    ...state,
    isFetching: false,
    errors: null,
    status: null,
    ...data,
  };
};

export const failure = (state = INITIAL_STATE, action) => {
  const data = action.data ? action.data : {};
  return { ...state, isFetching: false, error: data };
};

export const reset = () => INITIAL_STATE;

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.GET_PROJECT_DETAIL_REQUEST]: request,

  [Types.PROJECT_SUCCESS]: success,
  [Types.PROJECT_FAILURE]: failure,
  [Types.PROJECT_RESET]: reset,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
