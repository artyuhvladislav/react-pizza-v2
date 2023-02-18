import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterState = {
    categoryId: 0,
    searchValue: '',
    currentPage: 1,
    sort: {
        name: 'rating',
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state: FilterState, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state: FilterState, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state: FilterState, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state: FilterState, action: PayloadAction<FilterState>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'rating',
                    sortProperty: SortPropertyEnum.RATING_DESC,
                };
            }
        },
        setSearchValue(state: FilterState, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
    },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;
export default filterSlice.reducer;