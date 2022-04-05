import { Button, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react'
import FloatingMenuItem from './FloatingMenuItem';

interface IFloatingMenuProps {
    toggleButton:
    | React.ReactChild;

    children?:
    | React.ReactNode
}

const FloatingMenu = (props: IFloatingMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<EventTarget & HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const onToggleButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Button
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={onToggleButtonClicked}
            >
                {props.toggleButton}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    // Only render childs that is type FloatingMenuItem
                    React.Children.map(props.children, child => {
                        if (React.isValidElement(child)) {
                            const element = React.cloneElement(child);
                            const childProps = element.props;

                            const onItemClicked = () => {
                                childProps.onClick?.call();
                                handleClose();
                            }

                            if (element.type === FloatingMenuItem) {
                                return (
                                    <MenuItem onClick={onItemClicked}>
                                        <Typography>{element}</Typography>
                                    </MenuItem>
                                )
                            }
                        }
                    })
                }
            </Menu>
        </React.Fragment>
    );
}

export default FloatingMenu