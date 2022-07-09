import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import products from "./slices/productsSlice"
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filter, cart, products },
});

store.subscribe(() => {
  window.localStorage.setItem("cart", JSON.stringify(store.getState().cart));
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();