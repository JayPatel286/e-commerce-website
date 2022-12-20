import {
  ALL_PRODUCT_FAILURE,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAILURE,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAILURE,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_RESET,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAILURE,
  NEW_REVIEW_RESET,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  ALL_REVIEWS_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from '../constants/productConstants';

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultsPerPage: action.payload.resultsPerPage,
        filteredCount: action.payload.filteredCount,
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCT_FAILURE:
    case ADMIN_PRODUCT_FAILURE:
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAILURE:
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        loading: false,
        success: null,
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

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        success: null,
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

export const productReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        isUpdated: action.payload,
      };

    case DELETE_PRODUCT_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
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

export const adminReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEWS_REQUEST:
      return {
        ...state,
        reviews: [],
        loading: true,
      };
    case ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEWS_FAILURE:
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

export const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
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
