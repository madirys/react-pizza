import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: { id: 0, name: "Все" },
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  order: "asc"
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
    }
  },
})

export const { setCategory, setSort, setOrder } = filterSlice.actions;

export default filterSlice.reducer;