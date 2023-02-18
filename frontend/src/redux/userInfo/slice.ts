import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoState } from "./types";


const initialState: UserInfoState = {
    name: '',
    surname: '',
    address: '',
    number: ''
}


const cartSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        saveUserInfo(state, action: PayloadAction<UserInfoState>) {
            state.name = action.payload.name
            state.surname = action.payload.surname
            state.address = action.payload.address
            state.number = action.payload.number
        }
    },
});

export const { saveUserInfo } = cartSlice.actions;
export default cartSlice.reducer;