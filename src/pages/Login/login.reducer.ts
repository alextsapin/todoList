import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {authAPI, loginType} from '@/shared/api/api';
import {setError, setStatus} from '@/App/model/app.reducer';

export type StateType = {
    isAuthorized: boolean
    error: string | null
}

const initialState: StateType = {
    isAuthorized: false,
    error: null
}

export const auth = createAsyncThunk('login/auth', async (params, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: 'loading'}))
    try {
        const res = await authAPI.authMe();
        if(res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsAuthorized({isAuthorized: true}));
        } else {
            thunkAPI.dispatch(setIsAuthorized({isAuthorized: false}));
        }
    } catch(error: any) {
        thunkAPI.dispatch(setError({error: error.message}))
    } finally {
        thunkAPI.dispatch(setStatus({status: 'idle'}))
    }
})

export const login = createAsyncThunk('login/input', async (params: loginType, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(params)
        if(res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsAuthorized({isAuthorized: true}));
            thunkAPI.dispatch(setError({error: null}))
        } else {
            thunkAPI.dispatch(setError({error: 'Incorrect email or password...'}))
            return thunkAPI.rejectWithValue({error: res.data.messages})
        }
    } catch(error) {
        if (error instanceof AxiosError) {
            thunkAPI.dispatch(setError({error: error.message}))
            return thunkAPI.rejectWithValue({error: error.message})
        } else {
            thunkAPI.dispatch(setError({error: 'Unexpected error...'}))
        }
    } finally {
        thunkAPI.dispatch(setStatus({status: 'idle'}))
    }
})

export const logout = createAsyncThunk('login/output', async (params, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if(res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsAuthorized({isAuthorized: false}));
        } else {
            thunkAPI.dispatch(setError({error: 'Logout error...'}));
        }
    } catch(error) {
        if (error instanceof AxiosError) {
            thunkAPI.dispatch(setError({error: error.message}))
        } else {
            thunkAPI.dispatch(setError({error: 'Unexpected error...'}))
        }
    } finally {
        thunkAPI.dispatch(setStatus({status: 'idle'}))
    }
})

const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsAuthorized(state: StateType, action: PayloadAction<{isAuthorized: boolean}>) {
            state.isAuthorized = action.payload.isAuthorized
        }
    }
})

export const loginReducer = slice.reducer;
export const loginActions = slice.actions;
export const {setIsAuthorized} = slice.actions
