import React from 'react'
import { Button, Toolbar, ListItem, AppBar, Container, Typography, Box, IconButton, Menu, createTheme, Tabs, Tab } from '@mui/material';
import { HeaderLocalizationStrings } from '../../Localizations/HeaderLocalizationStrings'
import { ThemeProvider } from '@emotion/react';
import { lime, yellow } from '@mui/material/colors';
import SchoolIcon from '@mui/icons-material/School';
import './Header.css'

interface HeaderProps {

}

const theme = createTheme({
    palette: {
        primary: lime,
        secondary: yellow,
    }
})

const Header = (props: HeaderProps) => {
    return (
        <React.Fragment>
            <AppBar sx={{ background: "#FFFFFF" }}>
                <Toolbar>
                    <Typography sx={{ color: "#000000" }}>
                    </Typography>
                    <Tabs textColor='secondary'>
                        <Tab icon={<SchoolIcon />} aria-label="Backdoor-University" />
                        <Tab label={HeaderLocalizationStrings.home} />
                        <Tab label={HeaderLocalizationStrings.tips} />
                        <Tab label={HeaderLocalizationStrings.news} />
                        <Tab label={HeaderLocalizationStrings.programmeCatalog} />
                        <Tab label={HeaderLocalizationStrings.statistics} />
                    </Tabs>
                    <Button sx={{ marginLeft: "auto" }} variant="contained">{HeaderLocalizationStrings.signIn}</Button>
                    <Button sx={{ marginLeft: "10px" }} variant="contained">{HeaderLocalizationStrings.signUp}</Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
// const Header = (props: HeaderProps) => {
//     return <ThemeProvider theme={theme}>
//         <AppBar className="nav-bar" position="static" color="primary">
//             <Container>
//                 <Toolbar>
//                     <Button className="nav-text" variant="text" color="secondary" sx={{ color: '#00000' }}>{HeaderLocalizationStrings.home}</Button>
//                     <Button className="nav-text" variant="text" color="secondary">{HeaderLocalizationStrings.btn1}</Button>
//                     <Button className="nav-text" variant="text" color="secondary">{HeaderLocalizationStrings.btn2}</Button>
//                     <Button className="nav-text" variant="text" color="secondary">{HeaderLocalizationStrings.btn3}</Button>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     </ThemeProvider>
// }

export default Header;