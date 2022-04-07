/*
    Description:
        This is the header component of the web. This should alwyas be shown no matter which page the user is in.
        When the width of the window is not enough to display all the navigation buttons, the buttons should be hidden. 
        Instead, a menu button should be shown, which allows the user to display the list of buttons when pressing it.

    Login responses:
        Initially, the "Login" and "Register" button will be displayed to users when they have not logged in.
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

import React, { useEffect, useState } from 'react'
import { Button, Toolbar, AppBar, IconButton, Tabs, Tab, TextField, useTheme, useMediaQuery } from '@mui/material';
import { HeaderLocalizationStrings } from '../../Localizations/HeaderLocalizationStrings';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { navItemRight } from './HeaderStyle';
import HeaderDrawer from './HeaderDrawer';
import { LayoutPath } from '../../Constants/RoutePaths';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingMenu from '../../Components/FloatingMenu/FloatingMenu';
import FloatingMenuItem from '../../Components/FloatingMenu/FloatingMenuItem';
import { useAppSelector } from '../../App/hooks';
import { selectCurrentUser } from '../../Slices/currentUserSlice';

// The list of buttons and where it goes
const tabButtons = [
    { text: HeaderLocalizationStrings.home, path: LayoutPath.home },
    { text: HeaderLocalizationStrings.tips, path: LayoutPath.tips },
    { text: HeaderLocalizationStrings.news, path: LayoutPath.news },
    { text: HeaderLocalizationStrings.programme, path: LayoutPath.programme },
    { text: HeaderLocalizationStrings.statistics, path: LayoutPath.statistics },
]

interface HeaderProps {

}

const Header = (props: HeaderProps) => {
    /* Hooks */
    // Which tab is being showed
    const [tabValue, setTabValue] = useState(0);

    // The current user object
    const currentUser = useAppSelector(selectCurrentUser);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Which page are we in
    let location = useLocation();

    // For mobile adaptivity
    const theme = useTheme();
    const isSmallVerticalScreen = useMediaQuery(theme.breakpoints.down(1024));

    // For routing
    const navigate = useNavigate();

    /* Button Onclicks */
    const onTabChanged = (e: React.SyntheticEvent<Element, Event>, value: number) => {
        navigate(tabButtons[value].path);
    }

    const onHomeIconClicked = () => {
        setTabValue(0);
        navigate(LayoutPath.home);
    }

    const onProfileIconClicked = () => {
        // TODO: open profile floating menu
    }

    // Change the tab base on the location
    useEffect(() => {
        // Check which tab should be set to active
        for (let index = 0; index < tabButtons.length; index++) {
            const tb = tabButtons[index];
            if (tb.path == location.pathname) {
                setTabValue(index);
                return;
            }
        }

        // Set to nothing if no tabs are selected
        setTabValue(-1);
    })

    const profileButton =
        <IconButton aria-label="Profile"
            sx={{ marginLeft: "auto" }}
            onClick={onProfileIconClicked}>
            <AccountCircleIcon />
        </IconButton>

    return (
        <React.Fragment>
            <AppBar sx={{ background: "#FFFFFF" }}>
                <Toolbar sx={{ color: "#000000" }}>
                    {
                        isSmallVerticalScreen ? (
                            <> {/* For small screen view */}
                                <HeaderDrawer />
                                <IconButton aria-label="Backdoor-University" onClick={onHomeIconClicked}>
                                    <SchoolIcon />
                                </IconButton>
                                {/* TODO: Add a profile button */}

                                {
                                    isLoggedIn ? (
                                        <IconButton aria-label="Profile" sx={{ marginLeft: "auto" }} onClick={onProfileIconClicked}>
                                            <AccountCircleIcon />
                                        </IconButton>
                                    ) : (
                                        <FloatingMenu sx={{ marginLeft: "auto" }} toggleButton={profileButton}>
                                            {/* Login Button */}
                                            <FloatingMenuItem onClick={() => navigate(LayoutPath.login)}>
                                                {HeaderLocalizationStrings.login}
                                            </FloatingMenuItem>

                                            {/* Register Button */}
                                            <FloatingMenuItem onClick={() => navigate(LayoutPath.register)}>
                                                {HeaderLocalizationStrings.register}
                                            </FloatingMenuItem>
                                        </FloatingMenu>
                                    )
                                }
                            </>
                        ) : (
                            <> {/* Navigation buttons for PC browsers */}
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

                                {
                                    isLoggedIn ? (
                                        // TODO: Display Profile button
                                        <>
                                        </>
                                    ) : (
                                        // Display login and logout buttons
                                        <>
                                            {/* Login Button */}
                                            <Button sx={{ ...navItemRight }}
                                                variant="contained"
                                                onClick={() => navigate(LayoutPath.login)}
                                            >
                                                {HeaderLocalizationStrings.login}
                                            </Button>

                                            {/* Register Button */}
                                            <Button variant="contained"
                                                sx={{ ...navItemRight }}
                                                onClick={() => navigate(LayoutPath.register)}
                                            >
                                                {HeaderLocalizationStrings.register}
                                            </Button>
                                        </>
                                    )
                                }
                            </>
                        )
                    }

                </Toolbar>
            </AppBar>
        </React.Fragment >
    )
}

export default Header;