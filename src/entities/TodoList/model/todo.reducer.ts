import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { setError, setStatus, StatusType } from '@/App';
import { todosAPI, TodoListApi } from '@/shared/api/api';
import { HTTP_STATUS } from '@/shared/constants';

export type filterType = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type todoListType = TodoListApi & {
    status: StatusType;
    filter: filterType;
};

const initialState: Array<todoListType> = [];

export const fetchTodos = createAsyncThunk(
    'todo/get',
    async (params, { dispatch, rejectWithValue }) => {
        dispatch(setStatus({ status: 'loading' }));
        try {
            const res = await todosAPI.getTodos();

            dispatch(setStatus({ status: 'succeeded' }));

            return { data: res };
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({ error: error.message }));
            } else {
                dispatch(setError({ error: 'Unexpected error...' }));
            }

            return rejectWithValue(null);
        } finally {
            dispatch(setStatus({ status: 'idle' }));
        }
    },
);

export const addTodoList = createAsyncThunk(
    'todo/add',
    async (title: string, { dispatch, rejectWithValue }) => {
        dispatch(setStatus({ status: 'loading' }));
        try {
            const res = await todosAPI.addTodo(title);

            if (res.status === HTTP_STATUS.OK) {
                dispatch(setStatus({ status: 'succeeded' }));

                return { title, id: res.data.data.item.id };
            }

            return rejectWithValue(null);
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({ error: error.message }));
            } else {
                dispatch(setError({ error: 'Unexpected error...' }));
            }

            return rejectWithValue(null);
        } finally {
            dispatch(setStatus({ status: 'idle' }));
        }
    },
);

export const deleteTodoList = createAsyncThunk(
    'todo/delete',
    async (id: string, { dispatch, rejectWithValue }) => {
        dispatch(setStatus({ status: 'loading' }));
        try {
            const res = await todosAPI.deleteTodo(id);

            if (res.status === HTTP_STATUS.OK) {
                dispatch(setStatus({ status: 'succeeded' }));

                return { id };
            }

            return rejectWithValue(null);
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({ error: error.message }));
            } else {
                dispatch(setError({ error: 'Unexpected error...' }));
            }

            return rejectWithValue(null);
        } finally {
            dispatch(setStatus({ status: 'idle' }));
        }
    },
);

export const changeTodoListTitle = createAsyncThunk(
    'todo/change title',
    async (params: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        dispatch(setStatus({ status: 'loading' }));
        try {
            const res = await todosAPI.updateTodo(params.id, params.title);

            if (res === HTTP_STATUS.OK) {
                dispatch(setStatus({ status: 'succeeded' }));

                return { id: params.id, title: params.title };
            }
            dispatch(setError({ error: 'Change todo list error...' }));

            return rejectWithValue(null);
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({ error: error.message }));
            } else {
                dispatch(setError({ error: 'Unexpected error...' }));
            }

            return rejectWithValue(null);
        } finally {
            dispatch(setStatus({ status: 'idle' }));
        }
    },
);

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeTodoListFilter(
            state: Array<todoListType>,
            action: PayloadAction<{ id: string; filter: filterType }>,
        ) {
            const index = state.findIndex(t => t.id === action.payload.id);

            if (index !== -1) {
                state[index].filter = action.payload.filter;
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload.data.map(t => ({
                    ...t,
                    filter: 'ALL',
                    status: 'idle',
                }));
            }
        });
        builder.addCase(deleteTodoList.pending, (state, action) => {
            const index = state.findIndex(t => t.id === action.meta.arg);

            if (index !== -1) {
                state[index].status = 'loading';
            }
        });
        builder.addCase(deleteTodoList.fulfilled, (state, action) => {
            const index = state.findIndex(t => t.id === action.payload?.id);

            if (index !== -1) {
                state.splice(index, 1);
            }
        });
        builder.addCase(deleteTodoList.rejected, (state, action) => {
            const index = state.findIndex(t => t.id === action.meta.arg);

            if (index !== -1) {
                state[index].status = 'failed';
            }
        });
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            if (action.payload) {
                state.unshift({
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: 'ALL',
                    status: 'idle',
                });
            }
        });
        builder.addCase(changeTodoListTitle.pending, (state, action) => {
            const index = state.findIndex(t => t.id === action.meta.arg.id);

            if (index !== -1) {
                state[index].status = 'loading';
            }
        });
        builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
            if (action.payload) {
                const index = state.findIndex(t => t.id === action.payload?.id);

                if (index !== -1) {
                    state[index].title = action.payload.title;
                    state[index].status = 'succeeded';
                }
            }
        });
        builder.addCase(changeTodoListTitle.rejected, (state, action) => {
            const index = state.findIndex(t => t.id === action.meta.arg.id);

            if (index !== -1) {
                state[index].status = 'failed';
            }
        });
    },
});

export const { changeTodoListFilter } = slice.actions;
export const todosActions = slice.actions;
export const todoReducer = slice.reducer;
