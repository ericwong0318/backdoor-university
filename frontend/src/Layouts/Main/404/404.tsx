import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { LayoutPath } from '../../../App/constants';
import { AppLocalizedStrings as localString } from '../../../App/localization';

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                    marginTop: '10%',
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="h1"
                        >
                            {localString.not_found_header}
                        </Typography>
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="subtitle2"
                        >
                            {localString.not_found_message}
                        </Typography>
                        {/* <Box component="img"
                            sx={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560,
                                textAlign: 'center'
                            }} /> */}
                        <img src='https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?t=st=1649522918~exp=1649523518~hmac=a9ca06ee65c2a446da9634e9c9445bec904f5aa9583588b6132a77b00fab4c1f&w=740' alt="404 not found" />
                        <a href="https://www.freepik.com/vectors/server-error">Server error vector created by storyset - www.freepik.com</a>
                        <Button
                            component="a"
                            startIcon={(<ArrowBackIcon fontSize="small" />)}
                            sx={{ mt: 3 }}
                            variant="contained"
                            onClick={() => navigate(LayoutPath.home)}
                        >
                            {localString.back_to_home}
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>

    )
}

export default NotFound;
