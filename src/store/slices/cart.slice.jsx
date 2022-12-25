import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCartProducts(state, action) {
      const cartProducts = action.payload;
      return cartProducts;
    },
  },
});

export const { setCartProducts } = cartSlice.actions;

export const getCartProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, getConfig())
    .then((res) => dispatch(setCartProducts(res.data.data.cart.products)))
    .catch((error) => console.log(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addToCartThunk = (product) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      `"${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      product,
      getConfig()
    )
    .then(() => dispatch(getCartProductsThunk()))
    .finally(() => dispatch(setIsLoading(false)))
    .catch((error) => console.log(error.response));
};

export const removeProductThunk = (productID) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cart/${productID}`,
      getConfig()
    )
    .then(() => dispatch(getCartProductsThunk()))
    .finally(() => dispatch(setIsLoading(false)))
    .catch((error) => console.log(error.response));
};

export const purchaseCartThunk = (body) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/purchases`,
      body,
      getConfig()
    )
    .then(() => dispatch(getCartProductsThunk()))
    .finally(() => dispatch(setIsLoading(false)))
    .catch((error) => console.log(error.response));
};

export default cartSlice.reducer;
