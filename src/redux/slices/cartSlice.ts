import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartLocalStorage } from '../../utils/getCartLocalStorage';
import { RootState } from '../store'

export type TCartProduct = {
  idc: number;
  id: number;
  name: string;
  type: string;
  size: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface ICartState {
  totalPrice: number;
  items: TCartProduct[];
}

const initialState: ICartState = getCartLocalStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartProduct>) => {
      const item = action.payload
      const itemInCart = state.items.find(i => i.idc === item.idc)
      if (itemInCart) {
        itemInCart.quantity++
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
      state.totalPrice += item.price
    },
    removeItems: (state, action: PayloadAction<TCartProduct>) => {
      const item = action.payload;
      const itemIndex = state.items.findIndex(i => i.idc === item.idc);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        state.totalPrice -= item.price * item.quantity;
      }
    },
    removeOneItem: (state, action: PayloadAction<TCartProduct>) => {
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

export const cartSelector = (state: RootState) => state.cart;
export const cartSelectorById = (id: number) => (state: RootState) => state.cart.items.filter((el) => el.id === id)

export const { addItem, removeItems, removeOneItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;