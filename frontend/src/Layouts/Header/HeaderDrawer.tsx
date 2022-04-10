/*
    The drawer is only available when the window size is small, such as when the user are browsing from a mobile phone.
*/

import { Button, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutPath } from '../../App/constants';
import { useAuth } from "../../Components/auth/AuthProvider";
import { AppLocalizedStrings as localString } from "../../App/localization";

// The list of items to display in the drawer along with their icon
const drawerListItems = [
    { text: localString.home, icon: <HomeIcon />, path: LayoutPath.home },
    { text: localString.tips, icon: <TipsAndUpdatesIcon />, path: LayoutPath.tips },
    { text: localString.news, icon: <NewspaperIcon />, path: LayoutPath.news },
    { text: localString.programme, icon: <BookIcon />, path: LayoutPath.programme },
    // { text: localString.statistics, icon: <BarChartIcon />, path: LayoutPath.statistics },
]

const HeaderDrawer = () => {
    // The state of whether the drawer is opened
    const [drawerOpen, setDrawerOpen] = useState(false);
    const auth = useAuth();

    const navigate = useNavigate();

    const onListItemClicked = (path: string) => {
        navigate(path);
        setDrawerOpen(false);
    }

    return (
        <React.Fragment>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
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
                            </ListItemIcon>
                            <ListItemText>
                                {o.text}
                            </ListItemText>
                        </ListItemButton>
                    )}
                    <Divider sx={{ my: 1 }} />

                    {/* Display the game page option if the user is logged */}
                    {
                        auth.user &&
                        <ListItemButton onClick={() => {
                            navigate(LayoutPath.games)
                            setDrawerOpen(false);
                        }}>
                            <ListItemIcon>
                                <SportsEsportsIcon />
                            </ListItemIcon>
                            <ListItemText>
                                {localString.games}
                            </ListItemText>
                        </ListItemButton>
                    }
                </List>

                {/* Change the login button to logout button after logged-in */}
                {
                    auth.user ? (
                        <Button sx={{ marginTop: 'auto', height: '5%' }} onClick={() => {
                            auth.logout();
                            setDrawerOpen(false);
                        }}>
                            <LogoutIcon />
                            <Typography sx={{ marginLeft: "10px" }}>
                                {localString.logout}
                            </Typography>
                        </Button>
                    ) : (
                        <Button sx={{ marginTop: 'auto', height: '5%' }} onClick={() => onListItemClicked(LayoutPath.login)}>
                            <LoginIcon />
                            <Typography sx={{ marginLeft: "10px" }}>
                                {localString.login}
                            </Typography>
                        </Button>
                    )
                }
            </Drawer>
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}><MenuIcon /></IconButton>
        </React.Fragment>
    );
}

export default HeaderDrawer;