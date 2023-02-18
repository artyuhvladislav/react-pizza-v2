import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";


const initialState: AuthState = {
    user: {
        registered: false,
        email: '',
        logged: false
    }
}


const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register(state: AuthState) {
            state.user.registered = true
        },
        login(state: AuthState, action: PayloadAction<string>) {
            state.user.logged = true
            state.user.email = action.payload
        }
    },
});

export const { register, login } = cartSlice.actions;
export default cartSlice.reducer;