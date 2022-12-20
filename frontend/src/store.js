import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  adminReviewsReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
  reviewsReducer,
} from './reducers/productReducer';
import {
  allUsersReducer,
  userDetailsReducer,
  userReducer,
} from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import {
  adminOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from './reducers/orderReducer';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  adminOrders: adminOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  adminReviews: adminReviewsReducer,
  reviews: reviewsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
