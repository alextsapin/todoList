/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { StatusType, useAppDispatch } from '@/App';
import { AddItemForm } from '@/components/AddItemForm/AddItemForm';
import { Snap } from '@/components/Snap/Snap';
import { addTask, fetchTasks, TaskList } from '@/entities/TaskList';
import { EditableField } from '@/features/EditableField';
import { taskStatus, taskType } from '@/shared/api/api';

import { changeTodoListTitle, deleteTodoList, filterType } from '../model/todo.reducer';

type TodoListProps = {
    title: string;
    todoListId: string;
    filter: filterType;
    status: StatusType;
    tasks: Array<taskType>;
    removeTask: (todolistId: string, id: string) => void;
    changeFilter: (todoListId: string, filter: filterType) => void;
};

export const TodoList = memo((props: TodoListProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasks(props.todoListId));
    }, []);

    const addTaskHandler = useCallback(
        (title: string) => {
            const trimmedTitle = title.trim();

            if (trimmedTitle) {
                dispatch(addTask({ todoListId: props.todoListId, title: trimmedTitle }));
            }
        },
        [dispatch, props.todoListId],
    );

    const changeTodoTitleHandler = (title: string): void => {
        dispatch(changeTodoListTitle({ id: props.todoListId, title }));
    };

    let tasksForTodoList = props.tasks;

    switch (props.filter) {
        case 'ACTIVE':
            tasksForTodoList = props.tasks.filter(t => t.status === taskStatus.New);
            break;

        case 'COMPLETED':
            tasksForTodoList = props.tasks.filter(t => t.status === taskStatus.Completed);
            break;

        default:
            tasksForTodoList = props.tasks;
    }

    return (
        <Grid item lg={5} xl={4}>
            <Paper className="taskBox" elevation={8}>
                <EditableField
                    title={props.title}
                    css="taskBox__title"
                    callBack={changeTodoTitleHandler}
                />
                <Snap
                    title=""
                    variant="contained"
                    color="error"
                    callBack={() => dispatch(deleteTodoList(props.todoListId))}
                    btnClass="taskBox__del"
                    startIcon={<DeleteIcon />}
                    disabled={props.status === 'loading'}
                />

                <AddItemForm callBack={addTaskHandler} />

                <TaskList
                    tasks={tasksForTodoList}
                    todoListId={props.todoListId}
                    removeTask={props.removeTask}
                />

                <div className="filterBox">
                    <Snap
                        title="All"
                        variant="contained"
                        callBack={() => props.changeFilter(props.todoListId, 'ALL')}
                        disabled={props.filter === 'ALL'}
                        btnClass="filterBox__btn"
                    />

                    <Snap
                        title="Active"
                        variant="contained"
                        callBack={() => props.changeFilter(props.todoListId, 'ACTIVE')}
                        disabled={props.filter === 'ACTIVE'}
                        btnClass="filterBox__btn"
                    />

                    <Snap
                        title="DONE"
                        variant="contained"
                        callBack={() => props.changeFilter(props.todoListId, 'COMPLETED')}
                        disabled={props.filter === 'COMPLETED'}
                        btnClass="filterBox__btn"
                    />
                </div>
            </Paper>
        </Grid>
    );
});
