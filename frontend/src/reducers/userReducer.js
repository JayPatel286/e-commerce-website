import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
  CLEAR_ERRORS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_RESET,
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case UPDATE_PROFILE_FAILURE:
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case DELETE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    default:
      return state;
  }
};
