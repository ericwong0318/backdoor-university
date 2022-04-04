import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from "react";

const HeaderDrawer = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <React.Fragment>
            <Drawer >
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>Test</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}><MenuIcon /></IconButton>
        </React.Fragment>
    );
}

export default HeaderDrawer;