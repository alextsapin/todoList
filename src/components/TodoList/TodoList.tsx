/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';

// Components
import { Snap } from '../Snap/Snap';
import { TaskList } from '../TaskList/TaskList';


// TC
import {changeTodoListTitle, deleteTodoList} from './todos.reducer';
import {addTask, fetchTasks} from '../TaskList/task.reducer';

// Hooks
import {useAppDispatch} from '../../hooks/hooks';

// Types
import { taskStatus, taskType } from '../../api/api';
import { filterType } from './todos.reducer';
import { StatusType } from '../../App/App.reducer';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { EditableField } from 'components/EditableField/EditableField';

type TodoListProps = {
    title: string
    todoListId: string
    filter: filterType
    status: StatusType
    tasks: Array<taskType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todoListId: string, filter: filterType) => void
}

export const TodoList = memo((props: TodoListProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasks(props.todoListId))
    }, [])

    const addTaskHandler = useCallback((title: string) => {
        let trimmedTitle = title.trim();
        if(trimmedTitle) {
            dispatch(addTask({todoListId: props.todoListId, title: trimmedTitle}))
        }
    }, [dispatch, props.todoListId])

    const changeTodoTitleHandler = (title: string) => {
        dispatch(changeTodoListTitle({id: props.todoListId, title}))
    }

    let tasksForTodoList = props.tasks
    switch(props.filter) {
        case 'ACTIVE':
        tasksForTodoList = props.tasks.filter(t => t.status === taskStatus.New)
        break;

        case 'COMPLETED':
        tasksForTodoList = props.tasks.filter(t => t.status === taskStatus.Completed)
        break;

        default:
        tasksForTodoList = props.tasks
    }

    return (
        <Grid item lg={5} xl={4}>
            <Paper className="taskBox" elevation={8}>
                <EditableField title={props.title} css="taskBox__title" callBack={changeTodoTitleHandler}/>
                <Snap 
                    title='' 
                    variant='contained'
                    color="error"
                    callBack={() => dispatch(deleteTodoList(props.todoListId))} 
                    btnClass="taskBox__del"
                    startIcon={<DeleteIcon/>}
                    disabled={props.status === 'loading'}
                />

                <AddItemForm callBack={addTaskHandler}/>
                                
                <TaskList 
                    tasks={tasksForTodoList} 
                    todoListId={props.todoListId} 
                    removeTask={props.removeTask} 
                />

                <div className="filterBox">
                    <Snap 
                        title='All' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListId, 'ALL')} 
                        disabled={props.filter === 'ALL' ? true : false}
                        btnClass='filterBox__btn'
                    />

                    <Snap
                        title='Active' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListId, 'ACTIVE')} 
                        disabled={props.filter === 'ACTIVE' ? true : false}
                        btnClass='filterBox__btn'
                    />

                    <Snap
                        title='DONE' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListId, 'COMPLETED')} 
                        disabled={props.filter === 'COMPLETED' ? true : false}
                        btnClass='filterBox__btn'
                    />
                </div>
            </Paper>
        </Grid>
    )
})
