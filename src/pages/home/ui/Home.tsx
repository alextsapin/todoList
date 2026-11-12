import React, { memo, useCallback, useEffect, JSX } from 'react';

import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useAppSelector, useAppDispatch } from '@/App';
import { AddItemForm } from '@/components/AddItemForm/AddItemForm';
import { Error } from '@/components/Error/Error';
import { deleteTask } from '@/entities/TaskList';
import {
    TodoList,
    changeTodoListFilter,
    fetchTodos,
    addTodoList,
} from '@/entities/TodoList';
import type { filterType } from '@/entities/TodoList';

export const Home = memo((): JSX.Element => {
    const dispatch = useAppDispatch();

    const isAuthorized = useAppSelector(state => state.login.isAuthorized);
    const todoListBox = useAppSelector(state => state.todo);
    const taskBox = useAppSelector(state => state.task);

    useEffect(() => {
        if (isAuthorized) {
            dispatch(fetchTodos());
        }
    }, [dispatch, isAuthorized]);

    // Todos
    const changeFilter = useCallback(
        (id: string, filter: filterType) => {
            dispatch(changeTodoListFilter({ id, filter }));
        },
        [dispatch],
    );

    const addTodoHandler = useCallback(
        (title: string) => {
            dispatch(addTodoList(title));
        },
        [dispatch],
    );

    // Tasks
    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(deleteTask({ todoListId, taskId }));
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        );
    });

    return (
        <Container maxWidth={false}>
            <Error />
            <Grid container spacing={2}>
                <Grid item xl={3}>
                    <Paper className="taskBox" elevation={8}>
                        <AddItemForm callBack={addTodoHandler} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {todoListJSX}
            </Grid>
        </Container>
    );
});
