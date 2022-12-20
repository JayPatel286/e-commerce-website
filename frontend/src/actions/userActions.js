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
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  CLEAR_ERRORS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
} from '../constants/userConstants';

import axios from 'axios';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/login',
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post('/api/v1/register', userData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get('/api/v1/me');

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/v1/logout');

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Upadte Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put('/api/v1/me/update', userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Upadte Password
export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        '/api/v1/password/update',
        { oldPassword, newPassword, confirmPassword },
        config
      );

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

// ! Admin -> Get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get('/api/v1/admin/users');

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// ! Admin -> Get user details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// ! Admin -> Update user role
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// ! Admin -> Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// To Empty All Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
