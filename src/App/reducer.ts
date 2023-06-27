import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type StateType = {
    status: StatusType
    error: string | null
}

const initialState: StateType = {
    status: 'idle',
    error: null
};

const slice = createSlice({
    name: 'App',
    initialState: initialState,
    reducers: {
        setError(state: StateType, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error
        },
        setStatus(state: StateType, action: PayloadAction<{status: StatusType}>) {
            state.status = action.payload.status
        }
    }
});

export const AppReducer = slice.reducer;
export const {setError, setStatus} = slice.actions;