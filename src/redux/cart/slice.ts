import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice, getCartItemsFromLS } from "../../utils";
import { CartState, TCartItem } from "./types";

const { totalPrice, items } = getCartItemsFromLS()

const initialState: CartState = {
    totalPrice,
    items
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state: CartState, action: PayloadAction<TCartItem>) {
            const cartItem = state.items.find((item) => item.id === action.payload.id);
            if (cartItem) {
                cartItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        minusItem(state: CartState, action: PayloadAction<string>) {
            const cartItem = state.items.find((item) => item.id === action.payload);
            if (cartItem) {
                cartItem.count--;
            }
        },
        removeItem(state: CartState, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items)
        },
        clearItems(state: CartState) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;