import React from 'react'
import Button from '@mui/material/Button'

type ButtonPropsType = {
    title: string
    variant: "text" | "outlined" | "contained" | undefined
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    callBack: () => void
    filterClass?: string
    btnClass?: string
    disabled?: boolean
    startIcon?: any
}

const ButtonElement = React.memo((props: ButtonPropsType) => {
    
    const onClickHandler = () => {
        props.callBack()
    }
    
    return (
        <Button 
            variant={props.variant} 
            color={props.color}
            className={props.btnClass + ' ' + props.filterClass} 
            onClick={onClickHandler}
            disabled={props.disabled}
            value={props.title}
            startIcon={props.startIcon}
        >
        {props.title}
        </Button>
    )
})

export default ButtonElement