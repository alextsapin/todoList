/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect } from 'react';
import Container from '@mui/material/Container';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import Grid from '@mui/material/Grid';
import Error from '../Error/Error';
import { TodoList } from '../TodoList/TodoList';
import { changeTodoListFilter, fetchTodos } from '../TodoList/todos.reducer';
import { addTodoList } from '../TodoList/todos.reducer';
import { deleteTask } from '../TaskList/task.reducer';
import { filterType } from '../TodoList/todos.reducer';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { Paper } from '@mui/material';

export const Main =  memo(() => {
    const dispatch = useAppDispatch();

    const todoListBox = useAppSelector(state => state.todo);
    const taskBox = useAppSelector(state => state.task);

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

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
                    <Paper className="taskBox" elevation={3}>
                        <p className="taskBox__title">Add new todoList</p>
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
