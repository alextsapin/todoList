/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState } from 'react';
import {useAppSelector} from '../../hooks/hooks';

// MUI
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TextField from '@mui/material/TextField'

// Components
import { Snap } from '../Snap/Snap';

type AddItemFormProps = {
    callBack: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormProps) => {
    const status = useAppSelector(state => state.App.status)

    const [error, setError] = useState(false);
    const [title, setTitle] = useState('')

    const onClickHandler = () => {
        const trimmedTitle = title.trim();
        if(trimmedTitle) {
            props.callBack(trimmedTitle)
            setTitle('')
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <div className="formBox">
            <TextField 
                value={title} 
                onChange={e => setTitle(e.currentTarget.value)}
                size="small"
                label="Add new todoList" 
                error={error}
            />

            <Snap 
                title='ADD' 
                variant='contained' 
                callBack={onClickHandler}
                disabled={status === 'loading'}
                startIcon={<AddCircleIcon/>}
            />
        </div>
    )
})
