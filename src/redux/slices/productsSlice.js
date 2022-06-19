import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params) => {
  const api = "https://628e18f4368687f3e7104a3b.mockapi.io/items?page=";
  const { currentPage, categoryId, sortProperty, order, searchInput } = params;
  const { data } = await axios.get(
    `${api}${currentPage}&limit=4&${categoryId}&sortBy=${sortProperty}&order=${order}${searchInput}`
  )
  return data
});

const initialState = {
  items: [],
  status: 'loading' // loading, success, error
}

export const producsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'success'
      state.items = action.payload
    },
    [fetchProducts.rejected]: (state) => {
      state.status = 'error'
      state.items = []
    },
  }
})

export const { setItems } = producsSlice.actions;

export default producsSlice.reducer;