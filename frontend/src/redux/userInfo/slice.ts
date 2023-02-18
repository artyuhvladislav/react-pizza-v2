import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoState } from "./types";


const initialState: UserInfoState = {
    name: '',
    surname: '',
    address: '',
    avatar: ''
}


const cartSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        saveUserInfo(state, action: PayloadAction<UserInfoState>) {
            // state.name = action.payload.name
            state = { name: 'ewfwef' }
        }
    },
});

export const { saveUserInfo } = cartSlice.actions;
export default cartSlice.reducer;