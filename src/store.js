import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/add-cart/addCartSlices";
import productReducer from "./slices/products-app/productsSlices"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productReducer,
  },
});
