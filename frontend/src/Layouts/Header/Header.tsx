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
import { Button, Toolbar, AppBar, IconButton, Tabs, Tab, TextField, useTheme, useMediaQuery, Typography, Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderDrawer from './HeaderDrawer';
import { LayoutPath } from '../../App/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingMenu from '../../Components/FloatingMenu/FloatingMenu';
import FloatingMenuItem from '../../Components/FloatingMenu/FloatingMenuItem';
import { useAuth } from '../../Components/auth/AuthProvider';
import { AppLocalizedStrings as localString } from '../../App/localization';
import LocaleSelector from '../../Components/LocaleSelector/LocaleSelector';

// The list of buttons and where it goes
const tabButtons = [
    { text: localString.home, path: LayoutPath.home, authRequired: false },
    { text: localString.tips, path: LayoutPath.tips, authRequired: false },
    { text: localString.news, path: LayoutPath.news, authRequired: false },
    { text: localString.programme, path: LayoutPath.programme, authRequired: false },
    // Login required tabs
    { text: localString.games, path: LayoutPath.games, authRequired: true },
    // { text: localString.statistics, path: LayoutPath.statistics },
]

interface IHeaderProps {

}

const Header = (props: IHeaderProps) => {
    /* Hooks */
    // Which tab is being showed
    const [tabValue, setTabValue] = useState<number | false>(0);

    // The authentication hook
    const auth = useAuth();

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
        setTabValue(false);
    })

    const profileButton = <IconButton aria-label="Profile"
        sx={{ marginLeft: "auto" }}
        onClick={onProfileIconClicked}>
        {
            auth.user && "photo" in auth.user && auth.user.photo ? (
                <Avatar src={auth.user.photo} />
            ) : (
                <AccountCircleIcon />)
        }
    </IconButton>

    const profileAvatarMenu =
        <FloatingMenu sx={{ marginLeft: "auto" }} toggleButton={profileButton}>
            {/* To user profile */}
            <FloatingMenuItem onClick={() => {
                if (auth.user && "name" in auth.user) {
                    navigate(`${LayoutPath.user}/${auth.user.name}`);
                }
            }}>
                {localString.profile}
            </FloatingMenuItem>
            {/* Logout button */}
            <FloatingMenuItem onClick={() => {
                auth.logout();
            }}>
                {localString.logout}
            </FloatingMenuItem>
        </FloatingMenu>

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

                                {
                                    /* profile button */
                                    auth.user ? (
                                        profileAvatarMenu
                                    ) : (
                                        <FloatingMenu sx={{ marginLeft: "auto" }} toggleButton={profileButton}>
                                            {/* Login Button */}
                                            <FloatingMenuItem onClick={() => navigate(LayoutPath.login)}>
                                                {localString.login}
                                            </FloatingMenuItem>

                                            {/* Register Button */}
                                            <FloatingMenuItem onClick={() => navigate(LayoutPath.register)}>
                                                {localString.register}
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
                                    {tabButtons.map((t) => {
                                        return (!t.authRequired || auth.user) && <Tab key={t.text} label={t.text} />
                                    })}
                                </Tabs>

                                <LocaleSelector sx={{ marginLeft: "auto" }} />
                                <SearchIcon sx={{ marginLeft: "10px" }} />
                                <TextField variant="standard" label={localString.search_prog} />

                                {
                                    auth.user ? (
                                        // Display Profile button
                                        profileAvatarMenu
                                    ) : (
                                        // Display login and register buttons
                                        <>
                                            {/* Login Button */}
                                            <Button sx={{ marginLeft: "10px" }}
                                                variant="contained"
                                                onClick={() => navigate(LayoutPath.login)}
                                            >
                                                {localString.login}
                                            </Button>

                                            {/* Register Button */}
                                            <Button variant="contained"
                                                sx={{ marginLeft: "10px" }}
                                                onClick={() => navigate(LayoutPath.register)}
                                            >
                                                {localString.register}
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