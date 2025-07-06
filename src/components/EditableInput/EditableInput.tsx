import React, {ChangeEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableInputPropsType = {
    title: string
    css?: string
    callBack: (newTitle: string) => void
}

export const EditableInput = memo((props: EditableInputPropsType) => {

    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(props.title);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const turnOnHandler = () => {
        setEdit(true)
    }

    const turnOffHandler = () => {
        setEdit(false)
        props.callBack(newTitle)
    }

    return (
        edit 
        ? <TextField value={newTitle} onBlur={turnOffHandler} onChange={onChangeHandler} autoFocus size="small"/> 
        : <span className={props.css} onDoubleClick={turnOnHandler}>{props.title}</span>
    )
})
