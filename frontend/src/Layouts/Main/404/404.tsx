import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LayoutPath } from '../../../Constants/RoutePaths';
import { NotFoundLocalizationStrings as localString } from '../../../Localizations/404LocalizationStrings';
import { useNavigate } from 'react-router-dom';

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
                            {localString.not_found_header}
                        </Typography>
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="subtitle2"
                        >
                            {localString.not_found_message}
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
