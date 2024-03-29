import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from '../constants/cartConstants';
import axios from 'axios';

// Add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity: quantity,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Remove from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });

  localStorage.removeItem('cartItems');
};

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem('shippingInfo', JSON.stringify(data));
};
