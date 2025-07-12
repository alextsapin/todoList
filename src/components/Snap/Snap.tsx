import React, { memo } from 'react'
import Button from '@mui/material/Button'

type SnapProps = {
    title: string
    variant: "text" | "outlined" | "contained" | undefined
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    callBack: () => void
    filterClass?: string
    btnClass?: string
    disabled?: boolean
    startIcon?: any
}

export const Snap = memo((props: SnapProps) => {
    
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
