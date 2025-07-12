import React, { ChangeEvent, memo, useState } from 'react';
import TextField from '@mui/material/TextField';

type EditableFieldProps = {
    title: string
    css?: string
    callBack: (title: string) => void
}

export const EditableField = memo((props: EditableFieldProps) => {

    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(props.title);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const turnHandler = () => {
        if(edit) {
            props.callBack(title)
        }
        setEdit(!edit)
    }

    return (
        edit 
        ? <TextField value={title} onBlur={turnHandler} onChange={onChangeHandler} autoFocus size="small"/> 
        : <span className={props.css} onDoubleClick={turnHandler}>{title}</span>
    )
})
