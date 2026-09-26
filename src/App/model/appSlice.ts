import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const slice = createSlice({
    name: 'App',
    initialState: {
        status: 'idle' as StatusType,
        error: null as null | string,
    },
    reducers: {
        setError(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error;
        },
        setStatus(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status;
        },
    },
});

export type InitialStateType = ReturnType<typeof slice.getInitialState>;

export const AppReducer = slice.reducer;
export const { setError, setStatus } = slice.actions;
export const AppActions = slice.actions;
