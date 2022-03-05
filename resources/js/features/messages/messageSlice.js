import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
    messages: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;

            return await messageService.fetchMessages(token);
        } catch (error) {
            const message =
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : error.errors;

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    "messages/sendMessage",
    async (message, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;

            return await messageService.sendMessage(token, message);
        } catch (error) {
            const message =
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : error.errors;

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.messages = action.payload;
                state.isError = false;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errors = action.payload;
            })
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.messages = [...state.messages, action.payload];
                state.isError = false;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errors = action.payload;
            });
    },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
