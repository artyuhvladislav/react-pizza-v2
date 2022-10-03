import { createSlice } from "@reduxjs/toolkit";
import { fetchPizzaItem } from "./asyncActions";
import { PizzaItemState } from "./types";

const initialState: PizzaItemState = {
    item: {
        id: '',
        imageUrl: 'string',
        price: 0,
        title: 'string',
        types: [],
        rating: 0,
        sizes: []
    },
    status: 'loading',
};



export const pizzaItemSlice = createSlice({
    name: 'pizzaItem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzaItem.fulfilled, (state, action) => {
            state.item = action.payload;
            state.status = 'success';
        });

        builder.addCase(fetchPizzaItem.pending, (state) => {
            state = initialState;
        });

        builder.addCase(fetchPizzaItem.rejected, (state) => {
            state = initialState;
            state.status = 'error';
        })
    }
});

export default pizzaItemSlice.reducer;