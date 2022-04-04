/*
    The drawer is only available when the window size is small, such as when the user are browsing from a mobile phone.
*/

import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';
import React, { useState } from "react";
import { HeaderLocalizationStrings } from "../../Localizations/HeaderLocalizationStrings";

const HeaderDrawer = () => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    // The list of items to display in the drawer along with their icon
    const drawerListItems = [
        { text: HeaderLocalizationStrings.home, icon: <HomeIcon /> },
        { text: HeaderLocalizationStrings.tips, icon: <TipsAndUpdatesIcon /> },
        { text: HeaderLocalizationStrings.news, icon: <NewspaperIcon /> },
        { text: HeaderLocalizationStrings.programmeCatalog, icon: <BookIcon /> },
        { text: HeaderLocalizationStrings.statistics, icon: <BarChartIcon /> },
    ]

    return (
        <React.Fragment>
            <Drawer open={isDrawerOpened} onClose={() => setIsDrawerOpened(false)}>
                <List>
                    {drawerListItems.map((o) =>
                        <>
                            <ListItemButton>
                                <ListItemIcon>
                                    {o.icon}
                                    <ListItemText sx={{ marginLeft: "10px" }}>{o.text}</ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        </>
                    )}
                </List>
            </Drawer>
            <IconButton onClick={() => setIsDrawerOpened(!isDrawerOpened)}><MenuIcon /></IconButton>
        </React.Fragment>
    );
}

export default HeaderDrawer;