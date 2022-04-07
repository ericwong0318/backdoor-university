/* 
    This is the redux store which stored the logged in user's info.
    The user object is initially empty, which indicates not-logged-in
*/

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../App/store";

export interface CurrentUserState {
    username: string;
    email: string;
}


const initialState = {
    username: "",
    email: "",
}

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
    }
})

export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer