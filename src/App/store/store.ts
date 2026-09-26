import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, AnyAction } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppReducer } from '../model/appSlice';
import { taskReducer } from '@/entities/TaskList';
import { todoReducer } from '@/entities/TodoList';
import { loginReducer } from '@/pages/Login/login.reducer';

const rootReducer = combineReducers({
    App: AppReducer,
    todo: todoReducer,
    task: taskReducer,
    login: loginReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

type rootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<rootReducerType>;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;

// 1 — Что возвращает thunk
// 2 — Тип стейта всего приложения
// 3 — Экстра–аргументы
// 4 — Типы всех actions
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AnyAction
>;
