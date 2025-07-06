import React, { memo, useCallback, useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

// MUI
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TextField from '@mui/material/TextField'

// Components
import ButtonElement from '../Button/Button';

type AddItemFormProps = {
    onclick: (title: string) => any
}

export const AddItemForm = memo((props: AddItemFormProps) => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.App.status)
    
    const [error, setError] = useState(false);
    const [title, setTitle] = useState('')

    const onClickHandler = useCallback(() => {
        const trimmedTitle = title.trim();
        if(trimmedTitle) {
            dispatch(props.onclick(trimmedTitle))
            setTitle('')
            setError(false)
        } else {
            setError(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title])

    return (
        <Grid container spacing={2}>
            <Grid item md={4}>
                <Paper className="taskBox" elevation={3}>
                    <p className="taskBox__title">Add new todoList</p>

                    <div className="formBox">
                        <TextField 
                            value={title} 
                            onChange={e => setTitle(e.currentTarget.value)}
                            size="small"
                            label="Add new todoList" 
                            error={error}
                        />

                        <ButtonElement 
                            title='ADD' 
                            variant='contained' 
                            callBack={onClickHandler}
                            disabled={status === 'loading'}
                            startIcon={<AddCircleIcon/>}
                        />
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
})
