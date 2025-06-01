import React, {FC} from 'react';
import {taskStatus, taskType} from '../../api/api';
import ButtonElement from '../../components/Button/Button';
import EditableInput from '../../components/EditableInput/EditableInput';
import Checkbox from '@mui/material/Checkbox';
import {updateTask} from './task.reducer';
import {useAppDispatch} from '../../hooks/hooks';

type TaskListPropsType = {
    tasks: Array<taskType>
    todoListId: string
    removeTask: (todoListId: string, id: string) => void
}

const TaskList: FC<TaskListPropsType> = ({todoListId, tasks, removeTask}) => {
    
    const dispatch = useAppDispatch();

    const updateTaskTitle = (taskId: string, newTitle: string) => {
        dispatch(updateTask({todoListId, taskId, bundle: {title: newTitle}}))
    }

    const changeStatus = (taskId: string, title: string, isDone: boolean) => {
        if(isDone === true) {
            dispatch(updateTask({todoListId, taskId, bundle: {status: taskStatus.Completed}}));
        } 
        else {
            dispatch(updateTask({todoListId, taskId, bundle: {status: taskStatus.New}}));
        }
    }

    const taskJSXElements = tasks?.map(t => {
        return (
            <div key={t.id} className={t.status === taskStatus.Completed ? 'task task_completed': 'task'}>
                <Checkbox checked={t.status === taskStatus.Completed} onChange={(e) => changeStatus(t.id, t.title, e.currentTarget.checked)}/>    
                <EditableInput title={t.title} callBack={(newTitle: string) => updateTaskTitle(t.id, newTitle)}/>
                <ButtonElement title='❌' variant='text' callBack={() =>  removeTask(todoListId, t.id)} btnClass='righted'/>
            </div>
        )
    })
    
    return <div>{taskJSXElements.length === 0 ? 'Your tasklist is empty!': taskJSXElements }</div>
}

export default TaskList;