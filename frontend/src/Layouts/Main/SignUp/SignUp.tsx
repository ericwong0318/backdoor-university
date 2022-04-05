import { Grid, CssBaseline, Paper, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SignUpLocalizationStrings as localString } from '../../../Localizations/SignUpLocalizationStrings';

interface ISignUpProps {

}

interface ISignUpFormData {
    email: string | undefined
    username: string | undefined
    password: string | undefined
    confirmPassword: string | undefined
}

const formKey = {
    email: "email",
    username: "username",
    password: "password",
    confirmPassword: "confirm-password",
}

const ToSignUpFormData = (data: FormData): ISignUpFormData => {
    return {
        email: data.get(formKey.email)?.toString(),
        username: data.get(formKey.username)?.toString(),
        password: data.get(formKey.password)?.toString(),
        confirmPassword: data.get(formKey.confirmPassword)?.toString(),
    }
}

// Is two password match?
const verifyConfirmPassword = (data: ISignUpFormData): boolean => {
    return data.password === data.confirmPassword;
}

// Is password strong enought?
const verifyStrongPassword = (data: ISignUpFormData): boolean => {
    const regex = /(?=.{8,})/

    return regex.test(data.password!);
}

// Is email in right format?
const verifyEmailFormat = (data: ISignUpFormData) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(data.email!);
}

// Has email been registered?
const verifyEmailAvailable = (data: ISignUpFormData): boolean => {
    // TODO: let backend check
    return true;
}

// Has username been taken?
const verifyUsernameAvailable = (data: ISignUpFormData): boolean => {
    // TODO: let backend check
    return true;
}

const SignUp = (props: ISignUpProps) => {
    // Agree State
    const [agreed, setAgreed] = useState(false)

    // Error states of the form
    const [errorEmail, setErrorEmail] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPW, setErrorConfirmPW] = useState("");
    const [errorAgree, setErrorAgree] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = ToSignUpFormData(new FormData(event.currentTarget));
        console.log(data)
        let error = false;

        // Verify if the form is filled correctly
        // For each field, it will first verify if the field is filled,
        // and then verify the correctness of it.

        if (!data.email) {
            // Email field filled
            setErrorEmail(localString.field_empty_error);
            error = true;
        } else if (!verifyEmailFormat(data)) {
            // Verify email format
            setErrorEmail(localString.email_format_error);
            error = true;
        } else if (!verifyEmailAvailable(data)) {
            // Verify email available
            setErrorEmail(localString.email_used_error);
            error = true;
        }

        // Verify username
        if (!data.username) {
            setErrorUsername(localString.field_empty_error);
            error = true;
        } else if (!verifyUsernameAvailable(data)) {
            setErrorUsername(localString.username_used_error);
            error = true;
        }

        // Verify password
        if (!data.password) {
            setErrorPassword(localString.field_empty_error);
            error = true;
        } else if (!verifyStrongPassword(data)) {
            // Verify password strongness
            setErrorPassword(localString.weak_password_error);
            error = true;
        }

        // Verify Confirm password
        if (!data.confirmPassword) {
            setErrorConfirmPW(localString.field_empty_error);
            error = true;
        } else if (!verifyConfirmPassword(data)) {
            // Verify confirm password matches
            setErrorConfirmPW(localString.password_not_match_error);
            error = true;
        }

        if (!agreed) {
            setErrorAgree(localString.did_not_agree_error);
            error = true;
        }

        // Error Breakpoint
        if (error) {
            return;
        }

        // TODO: Sign up with the data
    };

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {localString.sign_up}
                    </Typography>

                    {/* Email field */}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id={formKey.email}
                            label={localString.email}
                            name={formKey.email}
                            autoComplete="email"
                            autoFocus
                            onChange={() => {
                                setErrorEmail("");
                            }}
                        />
                        <Typography sx={{ color: "red", textAlign: "left" }}>
                            {errorEmail}
                        </Typography>

                        {/* Username Field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id={formKey.username}
                            name={formKey.username}
                            label={localString.username}
                            onChange={() => {
                                setErrorUsername("");
                            }}
                        />
                        <Typography sx={{ color: "red", textAlign: "left" }}>
                            {errorUsername}
                        </Typography>

                        {/* Password Field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id={formKey.password}
                            name={formKey.password}
                            label={localString.password}
                            type="password"
                            onChange={() => {
                                setErrorPassword("");
                            }}
                        />
                        <Typography sx={{ color: "red", textAlign: "left" }}>
                            {errorPassword}
                        </Typography>

                        {/* Confirm Password Field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id={formKey.confirmPassword}
                            name={formKey.confirmPassword}
                            label={localString.confirm_password}
                            type="password"
                            onChange={() => {
                                setErrorConfirmPW("");
                            }}
                        />
                        <Typography sx={{ color: "red", textAlign: "left" }}>
                            {errorConfirmPW}
                        </Typography>

                        {/* Agreement field */}
                        <FormControlLabel
                            control={
                                <Checkbox value={agreed} color="primary"
                                    onChange={() => {
                                        setAgreed(!agreed);
                                        setErrorAgree("");
                                    }
                                    }
                                />
                            }
                            label={localString.agree_statement}
                        />
                        <Typography sx={{ color: "red", textAlign: "left" }}>
                            {errorAgree}
                        </Typography>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {localString.sign_up}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignUp;