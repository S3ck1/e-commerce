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
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
    .then((res) => dispatch(setCartProducts(res.data.data.cart.products)))
    .catch((error) => console.log(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addToCartThunk = (product) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
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
      `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${productID}`,
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
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      body,
      getConfig()
    )
    .then(() => dispatch(getCartProductsThunk()))
    .finally(() => dispatch(setIsLoading(false)))
    .catch((error) => console.log(error.response));
};

export default cartSlice.reducer;
