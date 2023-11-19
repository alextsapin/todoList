import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';

// Components
import ButtonElement from '../../components/Button/Button';
import TaskList from '../TaskList/TaskList';
import EditableInput from '../../components/EditableInput/EditableInput';

// TC
import {changeTodoListTitle, deleteTodoList} from './todos.reducer';
import {addTask, fetchTasks} from '../TaskList/task.reducer';

// Hooks
import {useAppDispatch} from '../../hooks/hooks';

// Types
import {taskStatus, taskType} from '../../api/api';
import {filterType} from './todos.reducer';
import {StatusType} from '../../App/App.reducer';

type TodoListPropsType = {
    title: string
    todoListId: string
    filter: filterType
    status: StatusType
    tasks: Array<taskType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todoListId: string, filter: filterType) => void
    demo?: boolean
}

const TodoList = React.memo((props: TodoListPropsType) => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = React.useState('');
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        if(props.demo !== true) {
            dispatch(fetchTasks(props.todoListId))
        }
    }, [])


    
    const addTaskHandler = React.useCallback(() => {
        let trimmedTitle = title.trim();
        if(trimmedTitle) {
            dispatch(addTask({todoListId: props.todoListId, title: trimmedTitle}))
            setError(false);
            setTitle('');
        } else {
            setError(true)
        }
    }, [dispatch, props.todoListId, title ])

    const editTitleTodoList = React.useCallback((newTitle: string) => {
        dispatch(changeTodoListTitle({id: props.todoListId, title: newTitle}))
    }, [])

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
        <Grid item md={4}>
            <Paper className="taskBox" elevation={3}>
                <EditableInput title={props.title} css="taskBox__title" callBack={(newTitle) => editTitleTodoList(newTitle)}/>
                <ButtonElement 
                    title='' 
                    variant='contained'
                    color="error"
                    callBack={() => dispatch(deleteTodoList(props.todoListId))} 
                    btnClass="taskBox__del"
                    startIcon={<DeleteIcon/>}
                    disabled={props.status === 'loading'}
                />
                
                <div className="formBox">
                    <TextField 
                        value={title}
                        error={error}
                        disabled={props.status === 'loading'} 
                        size="small"
                        onChange={e => setTitle(e.currentTarget.value)}
                        label="Add new task" 
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                addTaskHandler()
                            }
                        }}
                    />

                    <ButtonElement 
                        title='ADD' 
                        disabled={props.status === 'loading'}
                        variant='contained' 
                        callBack={addTaskHandler}
                        startIcon={<AddCircleIcon/>}
                    />
                </div>
                
                <TaskList 
                    tasks={tasksForTodoList} 
                    todoListId={props.todoListId} 
                    removeTask={props.removeTask} 
                />

                <div className="filterBox">
                    <ButtonElement 
                        title='All' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListId, 'ALL')} 
                        disabled={props.filter === 'ALL' ? true : false}
                        btnClass='filterBox__btn'
                    />

                    <ButtonElement
                        title='Active' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListId, 'ACTIVE')} 
                        disabled={props.filter === 'ACTIVE' ? true : false}
                        btnClass='filterBox__btn'
                    />

                    <ButtonElement
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

export default TodoList;