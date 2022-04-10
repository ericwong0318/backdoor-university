import { Grid, CssBaseline, Paper, Box, Avatar, Typography, Alert, TextField, FormControlLabel, Checkbox, Button, AlertTitle } from '@mui/material'
import React, { useState } from 'react'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Link } from 'react-router-dom'
import * as forgotPW from './ForgotPasswordFunctions'
import { LayoutPath } from '../../../App/constants';
import { AppLocalizedStrings as localString } from '../../../App/localization';

interface IForgotPasswordProps {

}

const ForgotPassword = (props: IForgotPasswordProps) => {
    // states
    const [requesting, setRequesting] = useState(false);
    const [requestSuccess, setRequestSuccess] = useState(false);
    const [errorResetPW, setErrorResetPW] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setRequesting(true);
        setErrorResetPW("");
        event.preventDefault();
        const email = (new FormData(event.currentTarget)).get(forgotPW.formKey.email);
        let error = false;

        // Check if the email filed is empty
        if (!email) {
            setErrorEmail(localString.field_empty_error)
            error = true;
        } else if (!forgotPW.verifyEmailFormat(email!.toString())) {
            setErrorEmail(localString.invalid_email_format_error)
            error = true;
        }

        // Error Breakpoint
        if (error) {
            setRequesting(false);
            return;
        }

        // Reset password
        forgotPW.resetPasswordWithEmail(email!.toString(),
            () => {
                // Success callback
                setRequestSuccess(true);
                setRequesting(false);
            },
            (err) => {
                // Failed callback
                switch (err.type) {
                    case forgotPW.ErrorType.email_error:
                        setErrorEmail(localString.email_unregistered_error);
                        break;

                    case forgotPW.ErrorType.unknown:
                    case forgotPW.ErrorType.server_unavailable:
                        setErrorEmail(localString.server_unavailable_error);
                        break;
                }
                setRequesting(false);
            }
        );
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {
                        requestSuccess ? (
                            <>
                                {/* Display the page with the text that telling the user to check email, with a "back to login" button available */}
                                <Alert severity='success' sx={{ marginTop: "10%", textAlign: "left" }}>
                                    <AlertTitle >{localString.success}</AlertTitle>
                                    {localString.success_message} - <Link to={LayoutPath.login}><strong>{localString.back_to_login}</strong></Link>
                                </Alert>
                            </>
                        ) : (
                            <>
                                {/* Display the text field for user to enter their email */}
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', marginTop: "10%" }}>
                                    <QuestionMarkIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    {localString.reset_password}
                                </Typography>

                                {/* The error message when failed to login */}
                                {errorResetPW &&
                                    <Alert severity="error" sx={{ mt: 1 }}>
                                        {errorResetPW}
                                    </Alert>
                                }

                                {/* Email Text Field */}
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={forgotPW.formKey.email}
                                        name={forgotPW.formKey.email}
                                        label={localString.email}
                                        autoComplete="email"
                                        autoFocus
                                        onChange={() => {
                                            setErrorEmail('')
                                        }}
                                    />
                                    <Typography sx={{ color: "red", textAlign: "left" }}>
                                        {errorEmail}
                                    </Typography>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        disabled={requesting}
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        {requesting ? (
                                            localString.wait
                                        ) : (
                                            localString.submit
                                        )}
                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            {/* Register Button */}
                                            <Grid item xs={1}>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                        )
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default ForgotPassword;