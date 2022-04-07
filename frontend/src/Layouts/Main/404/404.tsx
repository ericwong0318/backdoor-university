import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate } from 'react-router-dom';
import { LayoutPath } from '../../../Constants/RoutePaths';
import { NotFoundLocalizationStrings as localString } from '../../../Localizations/404LocalizationStrings';

const NotFound = () => (
    <>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
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
                        404: The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        {localString.not_found_header}
                    </Typography>
                    <Box component="img"
                        alt="Under development"
                        src="/static/images/undraw_page_not_found_su7k.svg"
                        sx={{
                            marginTop: 50,
                            display: 'inline-block',
                            maxWidth: '100%',
                            width: 560,
                            textAlign: 'center'
                        }}
                    />
                    <Button
                        component="a"
                        startIcon={(<ArrowBackIcon fontSize="small" />)}
                        sx={{ mt: 3 }}
                        variant="contained"
                        onClick={() => Navigate(LayoutPath.home)}
                    >
                        {localString.back_to_home}
                    </Button>
                </Box>
            </Container>
        </Box>
    </>
);

export default NotFound;
