import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: { id: 0, name: "Все" },
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  order: "asc",
  search: "",
  currentPage: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.category = action.payload.category;
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.order = action.payload.order;
    },
  }
})

export const { setCategory, setSort, setOrder, setSearch, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;