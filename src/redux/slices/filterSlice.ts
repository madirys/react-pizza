import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TCategory = {
  id: number;
  name: string;
}

export enum SortProperty {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export enum SortName {
  RATING = 'популярности',
  PRICE = 'цене',
  TITLE = 'алфавиту',
}

export type TSort = {
  name: SortName;
  sortProperty: SortProperty;
}

interface IFilterState {
  category: TCategory;
  sort: TSort;
  order: string;
  search?: string;
  currentPage: number;
}

const initialState: IFilterState = {
  category: { id: 0, name: "Все" },
  sort: {
    name: SortName.RATING,
    sortProperty: SortProperty.RATING,
  },
  order: "asc",
  search: "",
  currentPage: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<TCategory>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload;
    },
    setOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterState>) => {
      state.category = action.payload.category;
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.order = action.payload.order;
    },
  }
})

export const { setCategory, setSort, setOrder, setSearch, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;