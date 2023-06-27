import React from 'react';
import Container from '@mui/material/Container';
import {useAppSelector, useAppDispatch} from '../../hooks/hooks';
import Grid from '@mui/material/Grid';
import Error from '../Error/Error';
import AddItemForm from '../AddItemForm/AddItemForm';
import TodoList from '../../features/TodoList/TodoList';
import {changeTodoListFilter, fetchTodos} from '../../features/TodoList/todosReducer';
import {deleteTask} from '../../features/TaskList/taskReducer';
import {filterType} from '../../features/TodoList/todosReducer';
import {useNavigate} from 'react-router-dom';

type propsType = {
    demo?: boolean
}

const Main = (props: propsType) => {
    const dispatch = useAppDispatch();

    const todoListBox = useAppSelector(state => state.todo);
    const taskBox = useAppSelector(state => state.task);

    React.useEffect(() => {
        if(props.demo !== true) {
            dispatch(fetchTodos())
        }
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
                demo={props.demo}
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