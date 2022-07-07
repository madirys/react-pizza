import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export type TUrlParams = {
  currentPage: number;
  categoryId: string;
  sortProperty: string;
  order: string;
  searchInput: string;
}

export type TProduct = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  sizes: string[];
  types: string[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const fetchProducts = createAsyncThunk<TProduct[], TUrlParams>('products/fetchProducts', async (params) => {
  const api = "https://628e18f4368687f3e7104a3b.mockapi.io/items?page=";
  const { currentPage, categoryId, sortProperty, order, searchInput } = params;
  const { data } = await axios.get<TProduct[]>(
    `${api}${currentPage}&limit=4&${categoryId}&sortBy=${sortProperty}&order=${order}${searchInput}`
  )
  return data;
});


interface IProductState {
  items: TProduct[];
  status: Status;
}

const initialState: IProductState = {
  items: [],
  status: Status.LOADING,
}

export const producsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TProduct[]>) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }
})

export const { setItems } = producsSlice.actions;

export default producsSlice.reducer;