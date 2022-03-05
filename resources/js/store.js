import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./features/auth/authSlice";
import messageSliceReducer from './features/messages/messageSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        messages: messageSliceReducer
    },
});

export default store;
