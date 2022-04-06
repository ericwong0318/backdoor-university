import { Button } from '@mui/material'
import React from 'react'

interface IFloatingMenuItemProps {
    children:
    | React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const FloatingMenuItem = (props: IFloatingMenuItemProps) => {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default FloatingMenuItem;