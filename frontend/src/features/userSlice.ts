/* 
    This is the redux store which stored the logged in user's info.
    The user object is initially empty, which indicates not-logged-in
*/

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../App/store";

export interface IUserState {
    username: string;
    email: string;
}


const initialState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: initialState },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state, action) => {

        }
    }
})

export const selectCurrentUser = (state: RootState) => state.user;

export default userSlice.reducer