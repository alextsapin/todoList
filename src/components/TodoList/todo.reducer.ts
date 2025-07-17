import {todosAPI, TodoListApi} from '../../shared/api/api';
import {setError, setStatus, StatusType } from '../../App/app.reducer';
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";

export type filterType = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type todoListType = TodoListApi & {
    status: StatusType
    filter: filterType
}

const initialState:  Array<todoListType> = [];

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        toggleTodoStatus(state: Array<todoListType>, action: PayloadAction<{id: string, status: StatusType}>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].status = action.payload.status
        },
        changeTodoListFilter(state: Array<todoListType>, action: PayloadAction<{id: string, filter: filterType}>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].filter = action.payload.filter
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            if(action.payload) {
                return action.payload.data.map(t => ({...t, filter: 'ALL', status: 'idle'}))
            }
        });
        builder.addCase(deleteTodoList.fulfilled, (state, action) => {
            const index = state.findIndex(t => t.id === action.payload?.id)
            if(index !== -1) {
                state.splice(index, 1)
            }
        });
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            if(action.payload) {
                state.unshift({
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: 'ALL',
                    status: 'idle'
                })
            }
        });
        builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
            if(action.payload) {
                state.filter(t => t.id === action.payload?.id ? t.title = action.payload.title : t) 
            }
        });
    }
})

export const fetchTodos = createAsyncThunk('todo/get', async (params, thunkApi) => {
    thunkApi.dispatch(setStatus({status: 'loading'}))
    try {
        const res = await todosAPI.getTodos();
        thunkApi.dispatch(setStatus({status: 'succeeded'}));
        return {data: res}
    } catch(error: any) {
        thunkApi.dispatch(setError({error: error.message}))
    } finally {
        thunkApi.dispatch(setStatus({status: 'idle'}))
    }
})

export const addTodoList = createAsyncThunk('todo/add', async (title: string, thunkApi) => {
    thunkApi.dispatch(setStatus({status: 'loading'}))
    try {
        const res = await todosAPI.addTodo(title)
        if (res.status === 200) {
            thunkApi.dispatch(setStatus({status: 'succeeded'}));
            return {title, id: res.data.data.item.id}
        }
    } catch(error: any) {
        thunkApi.dispatch(setError({error: error.message}))
    }
})

export const deleteTodoList = createAsyncThunk('todo/delete', async (id: string, thunkApi) => {
    thunkApi.dispatch(setStatus({status: 'loading'}))
    thunkApi.dispatch(toggleTodoStatus({id, status: 'loading'}))
    const res = await todosAPI.deleteTodo(id)
    if(res.status === 200) {
        thunkApi.dispatch(setStatus({status: 'succeeded'}))
        thunkApi.dispatch(toggleTodoStatus({id, status: 'succeeded'}))
        return {id}
    }
})

export const changeTodoListTitle = createAsyncThunk('todo/change title', async (params: {id: string, title: string}, thunkApi) => {
    thunkApi.dispatch(setStatus({status: 'loading'}));
    thunkApi.dispatch(toggleTodoStatus({id: params.id, status: 'loading'}));
    const res = await todosAPI.updateTodo(params.id, params.title);
    if(res === 200) {
        thunkApi.dispatch(setStatus({status: 'succeeded'}));
        thunkApi.dispatch(toggleTodoStatus({id: params.id, status: 'succeeded'}));
        return {id: params.id, title: params.title}
    } else {
        thunkApi.dispatch(setError({error: 'Change todo list error...'}));
    }
})

export const {toggleTodoStatus, changeTodoListFilter} = slice.actions
export const todosActions = slice.actions
export const todoReducer = slice.reducer;
