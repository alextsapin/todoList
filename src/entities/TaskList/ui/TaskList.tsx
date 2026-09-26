import React, { FC } from 'react';

import Checkbox from '@mui/material/Checkbox';

import { useAppDispatch } from '@/App';
import { Snap } from '@/components/Snap/Snap';
import { EditableField } from '@/features/EditableField';
import { taskStatus, taskType } from '@/shared/api/api';

import { updateTask } from '../model/taskSlice';

type TaskListPropsType = {
    tasks: Array<taskType>;
    todoListId: string;
    removeTask: (todoListId: string, id: string) => void;
};

export const TaskList: FC<TaskListPropsType> = ({ todoListId, tasks, removeTask }) => {
    const dispatch = useAppDispatch();

    const updateTaskTitle = (taskId: string, newTitle: string): void => {
        dispatch(updateTask({ todoListId, taskId, bundle: { title: newTitle } }));
    };

    const changeStatus = (taskId: string, title: string, isDone: boolean): void => {
        if (isDone === true) {
            dispatch(
                updateTask({
                    todoListId,
                    taskId,
                    bundle: { status: taskStatus.Completed },
                }),
            );
        } else {
            dispatch(
                updateTask({ todoListId, taskId, bundle: { status: taskStatus.New } }),
            );
        }
    };

    const taskJSXElements = tasks?.map(t => {
        return (
            <div
                key={t.id}
                className={
                    t.status === taskStatus.Completed ? 'task task_completed' : 'task'
                }
            >
                <Checkbox
                    checked={t.status === taskStatus.Completed}
                    onChange={e => changeStatus(t.id, t.title, e.currentTarget.checked)}
                />
                <EditableField
                    title={t.title}
                    callBack={(newTitle: string) => updateTaskTitle(t.id, newTitle)}
                />
                <Snap
                    title="❌"
                    variant="text"
                    callBack={() => removeTask(todoListId, t.id)}
                    btnClass="righted"
                />
            </div>
        );
    });

    return (
        <div>
            {taskJSXElements.length === 0 ? 'Your tasklist is empty!' : taskJSXElements}
        </div>
    );
};
