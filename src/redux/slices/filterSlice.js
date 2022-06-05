import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: { id: 0, name: "Все" },
  categoryId: 0,
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
      state.category = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  },
})

export const { setCategory, setSort, setOrder, setSearch, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;