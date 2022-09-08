import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { PizzaItem, PizzaState, Status } from "./types";

const initialState: PizzaState = {
    items: [],
    status: Status.LOADING,
}


export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<PizzaItem[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = action.payload;
        });

        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;