/*
    The drawer is only available when the window size is small, such as when the user are browsing from a mobile phone.
*/

import { Button, Drawer, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';
import LoginIcon from '@mui/icons-material/Login';
import SchoolIcon from '@mui/icons-material/School';
import React, { useState } from "react";
import { HeaderLocalizationStrings } from "../../Localizations/HeaderLocalizationStrings";
import { Link, useNavigate } from "react-router-dom";
import { LayoutPath } from "../../Constants/RoutePaths";
import { Box } from "@mui/system";

// The list of items to display in the drawer along with their icon
const drawerListItems = [
    { text: HeaderLocalizationStrings.home, icon: <HomeIcon />, path: LayoutPath.home },
    { text: HeaderLocalizationStrings.tips, icon: <TipsAndUpdatesIcon />, path: LayoutPath.tips },
    { text: HeaderLocalizationStrings.news, icon: <NewspaperIcon />, path: LayoutPath.news },
    { text: HeaderLocalizationStrings.programme, icon: <BookIcon />, path: LayoutPath.programme },
    { text: HeaderLocalizationStrings.statistics, icon: <BarChartIcon />, path: LayoutPath.statistics },
]

const HeaderDrawer = () => {
    // The state of whether the drawer is opened
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const navigate = useNavigate();

    const onListItemClicked = (path: string) => {
        navigate(path);
        setIsDrawerOpened(false);
    }

    return (
        <React.Fragment>
            <Drawer open={isDrawerOpened} onClose={() => setIsDrawerOpened(false)}>
                {/* <Box justifyContent="center" sx={{ height: "6.7%", backgroundColor: "red" }}>
                    <Grid container>
                        <Grid item xs={4} m="auto" sx={{ backgroundColor: "yellow" }}>
                            <IconButton sx={{ margin: "auto" }} onClick={() => setIsDrawerOpened(false)}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                </Box> */}
                <List>
                    {drawerListItems.map((o) =>
                        <ListItemButton key={o.text} onClick={() => onListItemClicked(o.path)}>
                            <ListItemIcon>
                                {o.icon}
                                <ListItemText sx={{ marginLeft: "10px" }}>
                                    {o.text}
                                </ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    )}
                </List>

                {/* TODO: Change the login button to Profile button after logged-in */}
                <Button sx={{ marginTop: 'auto', height: '5%' }} onClick={() => onListItemClicked(LayoutPath.login)}>

                    <LoginIcon />
                    <Typography sx={{ marginLeft: "10px" }}>
                        {HeaderLocalizationStrings.login}
                    </Typography>
                </Button>
            </Drawer>
            <IconButton onClick={() => setIsDrawerOpened(!isDrawerOpened)}><MenuIcon /></IconButton>
        </React.Fragment>
    );
}

export default HeaderDrawer;