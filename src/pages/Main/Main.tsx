/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect } from 'react';
import Container from '@mui/material/Container';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooks';
import Grid from '@mui/material/Grid';
import { Error } from '@/components/Error/Error';
import { TodoList } from '@/components/TodoList/TodoList';
import { changeTodoListFilter, fetchTodos } from '@/components/TodoList/todo.reducer';
import { addTodoList } from '@/components/TodoList/todo.reducer';
import { deleteTask } from '@/components/TaskList/task.reducer';
import { filterType } from '@/components/TodoList/todo.reducer';
import { AddItemForm } from '@/components/AddItemForm/AddItemForm';
import { Paper } from '@mui/material';

export const Main =  memo(() => {
    const dispatch = useAppDispatch();

    const isAuthorized = useAppSelector(state => state.login.isAuthorized);
    const todoListBox = useAppSelector(state => state.todo);
    const taskBox = useAppSelector(state => state.task);

    useEffect(() => {
        if (isAuthorized) {
            dispatch(fetchTodos())
        }
    }, [isAuthorized])

    // Todos
    const changeFilter = useCallback((id: string, filter: filterType) => {
        dispatch(changeTodoListFilter({id, filter}))
    }, [])

    const addTodoHandler = useCallback((title: string) => {
        dispatch(addTodoList(title))
    }, [])

    // Tasks
    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(deleteTask({todoListId, taskId}));
    }, [])

    const todoListJSX = todoListBox.map((item, index) => {
        return (
            <TodoList 
                key={item.id}
                title={item.title}
                todoListId={item.id}
                filter={item.filter} 
                status={item.status}
                tasks={taskBox[item.id]} 
                removeTask={removeTask} 
                changeFilter={changeFilter} 
            />
        )
    })

    return (
        <Container fixed>
            <Error/>
            <Grid container spacing={2}>
                <Grid item lg={5} xl={4}>
                    <Paper className="taskBox" elevation={8}>
                        <AddItemForm callBack={addTodoHandler}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {todoListJSX}
            </Grid>
    </Container>
    )
})
