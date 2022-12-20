import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAILURE,
  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  ADMIN_ORDERS_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  CLEAR_ERRORS,
} from '../constants/orderConstants';

export const newOrderReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAILURE:
      return {
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

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAILURE:
      return {
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

export const adminOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ADMIN_ORDERS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        isUpdated: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        isDeleted: action.payload,
      };

    case UPDATE_ORDER_FAILURE:
    case DELETE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAILURE:
      return {
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
