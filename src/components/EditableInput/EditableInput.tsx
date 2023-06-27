import React, {ChangeEvent} from 'react';
import TextField from '@mui/material/TextField';

type EditableInputPropsType = {
    title: string
    css?: string
    callBack: (newTitle: string) => void
}

const EditableInput = React.memo((props: EditableInputPropsType) => {

    const [edit, setEdit] = React.useState(false);
    const [newTitle, setNewTitle] = React.useState(props.title);

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

export default EditableInput;