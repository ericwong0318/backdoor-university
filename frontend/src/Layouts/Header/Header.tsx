/*
    Description:
        This is the header component of the web. This should alwyas be shown no matter which page the user is in.
        When the width of the window is not enough to display all the navigation buttons, the buttons should be hidden. 
        Instead, a menu button should be shown, which allows the user to display the list of buttons when pressing it.

    Login responses:
        Initially, the "Login" and "Sign Up" button will be displayed to users when they have not logged in.
        When the user have logged-in, these two buttons should be hided and the avatar of the user profile should be displayed,
        clicking on it will display a list of buttons, which has account related functions.

    Interactable components:
        - School Icon: 
            It has the same effect with the "Home" button, which direct the user to the home page.
        - Home button:
            Direct the user to the home page.
        - Tips:

        - News:


*/

import React, { useState } from 'react'
import { Button, Toolbar, ListItem, AppBar, Container, Typography, Box, IconButton, Menu, createTheme, Tabs, Tab, TextField, useTheme, useMediaQuery } from '@mui/material';
import { HeaderLocalizationStrings } from '../../Localizations/HeaderLocalizationStrings';
import { ThemeProvider } from '@emotion/react';
import { lime, yellow } from '@mui/material/colors';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';
import { navItemRight } from './HeaderStyle';
import HeaderDrawer from './HeaderDrawer';

interface HeaderProps {

}

const Header = (props: HeaderProps) => {
    // Which tab is being showed
    const [tabValue, setTabValue] = useState<number>();

    // For mobile adaptivity
    const theme = useTheme();
    const isSmallVerticalScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <React.Fragment>
            <AppBar sx={{ background: "#FFFFFF" }}>
                <Toolbar sx={{ color: "#000000" }}>

                    {
                        isSmallVerticalScreen ? (
                            <>
                                <HeaderDrawer />
                                <IconButton aria-label="Backdoor-University" onClick={() => setTabValue(0)}>
                                    <SchoolIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                {/* Navigation buttons for PC browsers*/}
                                <IconButton aria-label="Backdoor-University" onClick={() => setTabValue(0)}>
                                    <SchoolIcon />
                                </IconButton>
                                <Tabs
                                    textColor='primary'
                                    indicatorColor='primary'
                                    value={tabValue}
                                    onChange={(_, value) => setTabValue(value)}
                                >
                                    <Tab label={HeaderLocalizationStrings.home} />
                                    <Tab label={HeaderLocalizationStrings.tips} />
                                    <Tab label={HeaderLocalizationStrings.news} />
                                    <Tab label={HeaderLocalizationStrings.programmeCatalog} />
                                    <Tab label={HeaderLocalizationStrings.statistics} />
                                </Tabs>
                                <SearchIcon sx={{ marginLeft: "auto" }} />
                                <TextField variant="standard" label={HeaderLocalizationStrings.search} />
                                <Button sx={{ ...navItemRight }} variant="contained">{HeaderLocalizationStrings.signIn}</Button>
                                <Button sx={{ ...navItemRight }} variant="contained">{HeaderLocalizationStrings.signUp}</Button>
                            </>
                        )
                    }

                </Toolbar>
            </AppBar>
        </React.Fragment >
    )
}

export default Header;