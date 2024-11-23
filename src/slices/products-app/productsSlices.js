import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const productSlices = createSlice({
  name: "products",
  initialState: {
    items: [],
    isToast: false,
    isProductAdded: false,
  },
  reducers: {
    addProduct: (state, action) => {
      const isExist = state.items.find((item) => item.id === action.payload.id);
    
      if (isExist) {
        state.isToast = true;
      } else {
        state.isToast = false;
        state.isProductAdded = true;
        state.items.push({ ...action.payload, quantity: 1 });

      }
    },
    increaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item?.id !== action.payload.id
      );
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeItem } =
  productSlices.actions;
export default productSlices.reducer;
