/* 
    The store of the app contained all the data to our components.
    Like a centralized data provider to all other components.
 */

import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import currentUserReducer from "../Slices/currentUserSlice"


export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
