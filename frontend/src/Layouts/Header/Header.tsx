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
import { LayoutPath } from '../../Constants/RoutePaths';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {

}

const Header = (props: HeaderProps) => {
    // Which tab is being showed
    const [tabValue, setTabValue] = useState(0);

    // For mobile adaptivity
    const theme = useTheme();
    const isSmallVerticalScreen = useMediaQuery(theme.breakpoints.down("md"));

    // For routing
    const navigate = useNavigate();

    // The list of buttons and where it goes
    const tabButtons = [
        { text: HeaderLocalizationStrings.home, path: LayoutPath.home },
        { text: HeaderLocalizationStrings.tips, path: LayoutPath.tips },
        { text: HeaderLocalizationStrings.news, path: LayoutPath.news },
        { text: HeaderLocalizationStrings.programme, path: LayoutPath.programme },
        { text: HeaderLocalizationStrings.statistics, path: LayoutPath.statistics },
    ]

    const onTabChanged = (e: React.SyntheticEvent<Element, Event>, value: number) => {
        setTabValue(value);
        navigate(tabButtons[value].path);
    }

    const onHomeIconClicked = () => {
        setTabValue(0);
        navigate(LayoutPath.home);
    }

    return (
        <React.Fragment>
            <AppBar sx={{ background: "#FFFFFF" }}>
                <Toolbar sx={{ color: "#000000" }}>
                    {
                        isSmallVerticalScreen ? (
                            <>
                                {/* For small screen view */}
                                <HeaderDrawer />
                                <IconButton aria-label="Backdoor-University" onClick={onHomeIconClicked}>
                                    <SchoolIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                {/* Navigation buttons for PC browsers*/}
                                <IconButton aria-label="Backdoor-University" onClick={onHomeIconClicked}>
                                    <SchoolIcon />
                                </IconButton>
                                <Tabs
                                    textColor='primary'
                                    indicatorColor='primary'
                                    value={tabValue}
                                    scrollButtons="auto"
                                    onChange={onTabChanged}
                                >
                                    {tabButtons.map((t) => <Tab label={t.text} />)}
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