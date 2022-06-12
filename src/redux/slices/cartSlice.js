import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload
      const itemInCart = state.items.find(i => i.idc === item.idc)
      if (itemInCart) {
        itemInCart.quantity++
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
      state.totalPrice += item.price
    },
    removeItems: (state, action) => {
      const item = action.payload;
      const itemIndex = state.items.findIndex(i => i.idc === item.idc);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        state.totalPrice -= item.price * item.quantity;
      }
    },
    removeOneItem: (state, action) => {
      const item = action.payload;
      const itemIndex = state.items.findIndex(i => i.idc === item.idc);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity -= 1;
        state.totalPrice -= item.price;
      }

      if (state.items[itemIndex].quantity === 0) {
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  }
})

export const { addItem, removeItems, removeOneItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;