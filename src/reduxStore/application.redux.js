import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getApplicationDetailRequest: ["data"],

  applicationSuccess: ["data"],
  applicationFailure: ["data"],
  applicationReset: [],
});

export const ApplicationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  error: null,
  status: null,

  application: {},
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
  [Types.GET_APPLICATION_DETAIL_REQUEST]: request,

  [Types.APPLICATION_SUCCESS]: success,
  [Types.APPLICATION_FAILURE]: failure,
  [Types.APPLICATION_RESET]: reset,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
