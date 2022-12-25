import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      const products = action.payload;
      return products;
    },
  },
});

export const getProductsThunk = (product) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get(`${process.env.BASE_URL}/products`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
