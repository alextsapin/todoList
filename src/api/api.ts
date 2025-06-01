import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '30c81b6c-6404-4cbc-82de-54ef5cf3c912'
    }
})

export type todoListApiType = {
    id: string
    title: string
}

export type todoResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type loginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    authMe() {
        return instance.get<todoResponseType<{id: number, email: string, login: string}>>(`auth/me`).then((response) => {
            return response
        })
    },
    login(data: loginType ) {
        return instance.post<todoResponseType<{userId: number}>>(`auth/login`, data).then((response) => {
            return response
        })
    },
    logout() {
        return instance.delete<todoResponseType>(`auth/login`).then((response) => {
            return response
        })
    }
}

export const todosAPI = {
    getTodos() {
        return instance.get<Array<todoListApiType>>(`todo-lists`).then((response) => {
            return response.data; 
        })
    },
    addTodo(title: string) {
        return instance.post<todoResponseType<{item: todoListApiType}>>(`todo-lists`, {title: title}).then((response) => {
            return response; 
        })
    },
    deleteTodo(id: string) {
        return instance.delete<todoResponseType>(`todo-lists/${id}`,).then((response) => {
            return response; 
        })
    },
    updateTodo(id: string, title: string) {
        return instance.put<todoResponseType>(`todo-lists/${id}`,{title: title}).then((response) => {
            return response.status; 
        })
    }
}

export enum taskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Dreft = 3
}

export enum taskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type taskType = {
    id: string
    todoListId: string
    title: string
    status: taskStatus
    deadline: null | string
    description: null | string
    priority: taskPriority
    startDate: null | string
    addedDate: string
    order: number
}

export type taskResponse = {
    error: string | null
    totalCount: number
    items: taskType[]
}

type bundleType = {
    title?: string
    status?: taskStatus
    deadline?: null | string
    description?: null | string
    priority?: taskPriority
    startDate?: null | string
    addedDate?: string
    order?: number
}

export const taskAPI = {
    getTasks(todoListId: string) {
        return instance.get<taskResponse>(`todo-lists/${todoListId}/tasks`).then((response) => {
            return response.data.items; 
        })
    },
    addTask(todoListId: string, title: string) {
        return instance.post<todoResponseType<{item: taskType}>>(`todo-lists/${todoListId}/tasks`, {title: title}).then((response) => {
            return response.data
        })
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<todoResponseType>(`todo-lists/${todoId}/tasks/${taskId}`).then((response) => {
            return response
        })
    },
    updateTask(todoId: string, taskId: string, bundle: bundleType) {
        return instance.put<todoResponseType<{item: taskType}>>(`todo-lists/${todoId}/tasks/${taskId}`, {
            title: bundle.title,
            status: bundle.status,
            deadline: bundle.deadline,
            description: bundle.description,
            priority: bundle.priority,
            startDate: bundle.startDate,
            addedDate: bundle.addedDate,
            order: bundle.order
        }).then((response) => {
            console.log(response)
            return response;
        })
    }
}