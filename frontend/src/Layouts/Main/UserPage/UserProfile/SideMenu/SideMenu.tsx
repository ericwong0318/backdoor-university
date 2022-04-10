import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useRef } from 'react'
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import { AppLocalizedStrings as localString } from '../../../../../App/localization';

interface ISideMenu {
    refs: React.MutableRefObject<any>[]
}

const SideMenu = (props: ISideMenu) => {
    const menuItems = [
        { text: localString.profile, icon: <AccountBoxTwoToneIcon />, ref: props.refs[0] },
        { text: localString.curr_prog, icon: <MenuBookTwoToneIcon />, ref: props.refs[1] },
        { text: localString.offers, icon: <SchoolTwoToneIcon />, ref: props.refs[2] },
    ]

    const onListItemClicked = (ref: React.MutableRefObject<any>) => {
        if (ref && ref.current)
            ref.current.scrollIntoView();
    }

    return (
        <List>
            {menuItems.map((mi) =>
                <ListItemButton
                    onClick={() => onListItemClicked(mi.ref)}>
                    <ListItemIcon>
                        {mi.icon}
                        <ListItemText sx={{ marginLeft: "10px" }}>
                            {mi.text}
                        </ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            )}
        </List>
    )
}

export default SideMenu;