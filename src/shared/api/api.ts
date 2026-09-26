import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string,
    },
});

export type TodoListApi = {
    id: string;
    title: string;
};

export type todoResponseType<D = {}> = {
    resultCode: number;
    messages: string[];
    data: D;
};

export type loginType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

export const authAPI = {
    async authMe() {
        const response = await instance.get<
            todoResponseType<{ id: number; email: string; login: string }>
        >(`auth/me`);

        return response;
    },
    async login(data: loginType) {
        const response = await instance.post<todoResponseType<{ userId: number }>>(
            `auth/login`,
            data,
        );

        return response;
    },
    async logout() {
        const response = await instance.delete<todoResponseType>(`auth/login`);

        return response;
    },
};

export const todosAPI = {
    async getTodos() {
        const response = await instance.get<Array<TodoListApi>>(`todo-lists`);

        return response.data;
    },
    async addTodo(title: string) {
        const response = await instance.post<todoResponseType<{ item: TodoListApi }>>(
            `todo-lists`,
            { title },
        );

        return response;
    },
    async deleteTodo(id: string) {
        const response = await instance.delete<todoResponseType>(`todo-lists/${id}`);

        return response;
    },
    async updateTodo(id: string, title: string) {
        const response = await instance.put<todoResponseType>(`todo-lists/${id}`, {
            title,
        });

        return response.status;
    },
};

/* eslint-disable no-magic-numbers -- enum values mirror API contract */
export enum taskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum taskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
/* eslint-enable no-magic-numbers */

export type taskType = {
    id: string;
    todoListId: string;
    title: string;
    status: taskStatus;
    deadline: null | string;
    description: null | string;
    priority: taskPriority;
    startDate: null | string;
    addedDate: string;
    order: number;
};

export type taskResponse = {
    error: string | null;
    totalCount: number;
    items: taskType[];
};

type bundleType = {
    title?: string;
    status?: taskStatus;
    deadline?: null | string;
    description?: null | string;
    priority?: taskPriority;
    startDate?: null | string;
    addedDate?: string;
    order?: number;
};

export const taskAPI = {
    async getTasks(todoListId: string) {
        const response = await instance.get<taskResponse>(
            `todo-lists/${todoListId}/tasks`,
        );

        return response.data.items;
    },
    async addTask(todoListId: string, title: string) {
        const response = await instance.post<todoResponseType<{ item: taskType }>>(
            `todo-lists/${todoListId}/tasks`,
            { title },
        );

        return response.data;
    },
    async deleteTask(todoId: string, taskId: string) {
        const response = await instance.delete<todoResponseType>(
            `todo-lists/${todoId}/tasks/${taskId}`,
        );

        return response;
    },
    async updateTask(todoId: string, taskId: string, bundle: bundleType) {
        const response = await instance.put<todoResponseType<{ item: taskType }>>(
            `todo-lists/${todoId}/tasks/${taskId}`,
            {
                title: bundle.title,
                status: bundle.status,
                deadline: bundle.deadline,
                description: bundle.description,
                priority: bundle.priority,
                startDate: bundle.startDate,
                addedDate: bundle.addedDate,
                order: bundle.order,
            },
        );

        return response;
    },
};
