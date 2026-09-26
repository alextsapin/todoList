import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AppStateType } from '@/App';
import { setError, setStatus } from '@/App/model/appSlice';
import { addTodoList, deleteTodoList, fetchTodos } from '@/entities/TodoList';
import {
    taskAPI,
    taskType,
    TodoListApi,
    taskPriority,
    taskStatus,
} from '@/shared/api/api';
import { RESULT_CODE } from '@/shared/constants';

export type BundleType = {
    title?: string;
    status?: taskStatus;
    deadline?: null | string;
    description?: null | string;
    priority?: taskPriority;
    startDate?: null | string;
    addedDate?: string;
    order?: number;
};

export type StateType = {
    [key: string]: Array<taskType>;
};

const initialState: StateType = {};

export const fetchTasks = createAsyncThunk(
    'task/fetch',
    async (todoListId: string, { dispatch, rejectWithValue }) => {
        dispatch(setStatus({ status: 'loading' }));
        try {
            const res = await taskAPI.getTasks(todoListId);

            dispatch(setStatus({ status: 'succeeded' }));

            return { todoListId, tasks: res };
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

export const deleteTask = createAsyncThunk(
    'task/delete',
    async (
        params: { todoListId: string; taskId: string },
        { dispatch, rejectWithValue },
    ) => {
        dispatch(setStatus({ status: 'loading' }));
        try {
            const res = await taskAPI.deleteTask(params.todoListId, params.taskId);

            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(setStatus({ status: 'succeeded' }));

                return { params };
            }
            dispatch(setError({ error: 'Some error' }));

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

export const addTask = createAsyncThunk(
    'task/add',
    async (
        params: { todoListId: string; title: string },
        { dispatch, rejectWithValue },
    ) => {
        dispatch(setStatus({ status: 'loading' }));
        try {
            const res = await taskAPI.addTask(params.todoListId, params.title);

            dispatch(setStatus({ status: 'succeeded' }));

            return { task: res.data.item };
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({ error: error.message }));
            } else {
                dispatch(setError({ error: 'Unexpected error...' }));
            }
            dispatch(setStatus({ status: 'failed' }));

            return rejectWithValue(null);
        } finally {
            dispatch(setStatus({ status: 'idle' }));
        }
    },
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (
        param: { todoListId: string; taskId: string; bundle: BundleType },
        thunkAPI,
    ) => {
        const state = thunkAPI.getState() as AppStateType;
        const task = state.task[param.todoListId].find(
            (t: taskType) => t.id === param.taskId,
        );

        if (!task) {
            return thunkAPI.rejectWithValue('task not found in the state');
        }

        const bundle: BundleType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...param.bundle,
        };

        try {
            const res = await taskAPI.updateTask(param.todoListId, param.taskId, bundle);

            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                return param;
            }

            return thunkAPI.rejectWithValue('Error update task...');
        } catch (error) {
            return thunkAPI.rejectWithValue('Some error');
        }
    },
);

const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                if (action.payload) {
                    action.payload.data.forEach((t: TodoListApi) => {
                        state[t.id] = [];
                    });
                }
            })
            .addCase(deleteTodoList.fulfilled, (state, action) => {
                if (action.payload) {
                    delete state[action.payload.id];
                }
            })
            .addCase(addTodoList.fulfilled, (state, action) => {
                if (action.payload) {
                    state[action.payload.id] = [];
                }
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                if (action.payload?.params) {
                    const tasks = state[action.payload?.params.todoListId];
                    const index = tasks.findIndex(
                        t => t.id === action.payload?.params.taskId,
                    );

                    if (index !== -1) {
                        tasks.splice(index, 1);
                    }
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                if (action.payload?.task) {
                    state[action.payload.task.todoListId].unshift(action.payload.task);
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);

                if (index > -1) {
                    tasks[index] = { ...tasks[index], ...action.payload.bundle };
                }
            });
    },
});

export const taskReducer = slice.reducer;
export const taskActions = slice.actions;
