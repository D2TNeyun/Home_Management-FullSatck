import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Reducer/userSlice";

export const store = configureStore({
    reducer: { user: userSlice },
})