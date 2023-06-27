import React from 'react';
import {v1} from 'uuid';
import {Provider} from 'react-redux';
import {AppStateType} from '../App/store';
import {legacy_createStore as createStore, combineReducers, applyMiddleware, AnyAction} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';

// Reducers
import {todoReducer} from '../features/TodoList/todosReducer';
import {taskReducer} from '../features/TaskList/taskReducer';
import {taskPriority, taskStatus} from '../api/api';
import {AppReducer} from '../App/reducer';
import {loginReducer} from '../components/Login/loginReducer';

// Объединим редьюсеры
const storyBookReducer = combineReducers({
    App: AppReducer,
    todo: todoReducer,
    task: taskReducer,
    login: loginReducer
});

const initialGlobalState: AppStateType = {
    App: {
        status: 'idle',
        error: null
    },
    login: {
        isAuthorized: false,
        error: null
    },
    todo: [
        {id: "todolistId1", title: "What to learn", filter: "ALL", status: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "ALL", status: 'idle'}
    ],
    task: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: taskStatus.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: taskPriority.Low},
            {id: v1(), title: "JS", status: taskStatus.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: taskPriority.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: taskStatus.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: taskPriority.Low},
            {id: v1(), title: "React Book", status: taskStatus.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: taskPriority.Low}
        ]
    }
}

export const storyBookStore = createStore(storyBookReducer, initialGlobalState, applyMiddleware(thunkMiddleware));

export const ProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}