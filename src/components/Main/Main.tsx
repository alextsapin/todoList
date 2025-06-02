/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Container from '@mui/material/Container';
import {useAppSelector, useAppDispatch} from '../../hooks/hooks';
import Grid from '@mui/material/Grid';
import Error from '../Error/Error';
import AddItemForm from '../AddItemForm/AddItemForm';
import TodoList from '../TodoList/TodoList';
import {changeTodoListFilter, fetchTodos} from '../TodoList/todos.reducer';
import {deleteTask} from '../TaskList/task.reducer';
import {filterType} from '../TodoList/todos.reducer';

const Main = () => {
    const dispatch = useAppDispatch();

    const todoListBox = useAppSelector(state => state.todo);
    const taskBox = useAppSelector(state => state.task);

    React.useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    // Todos
    const changeFilter = React.useCallback((id: string, filter: filterType) => {
        dispatch(changeTodoListFilter({id, filter}))
    }, [])

    // Tasks
    const removeTask = React.useCallback((todoListId: string, taskId: string) => {
        dispatch(deleteTask({todoListId, taskId}));
    }, [])

    const todoListJSX = todoListBox.map((item, index) => {
        return (
            <TodoList 
                key={index}
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
                <AddItemForm/>
                <Grid container spacing={2}>
                    {todoListJSX}
                </Grid>
        </Container>
    )
}

export default Main;