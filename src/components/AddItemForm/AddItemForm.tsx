import React from 'react';
import {addTodoList} from '../TodoList/todos.reducer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

// MUI
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TextField from '@mui/material/TextField'

// Components
import ButtonElement from '../Button/Button';

const AddItemForm = React.memo(() => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.App.status)
    
    const [error, setError] = React.useState(false);
    const [todoListTitle, setTodoListTitle] = React.useState('')

    const addTodoListHandler = React.useCallback(() => {
        const trimmedTitle = todoListTitle.trim();
        if(trimmedTitle) {
            dispatch(addTodoList(trimmedTitle))
            setTodoListTitle('')
            setError(false)
        } else {
            setError(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todoListTitle])

    return (
        <Grid container spacing={2}>
            <Grid item md={4}>
                <Paper className="taskBox" elevation={3}>
                    <p className="taskBox__title">Add new todoList</p>

                    <div className="formBox">
                        <TextField 
                            value={todoListTitle} 
                            onChange={e => setTodoListTitle(e.currentTarget.value)}
                            size="small"
                            label="Add new todoList" 
                            error={error}
                        />

                        <ButtonElement 
                            title='ADD' 
                            variant='contained' 
                            callBack={addTodoListHandler}
                            disabled={status === 'loading'}
                            startIcon={<AddCircleIcon/>}
                        />
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
})

export default AddItemForm