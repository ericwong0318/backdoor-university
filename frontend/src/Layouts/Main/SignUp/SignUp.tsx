import { Grid, CssBaseline, Paper, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SignUpLocalizationStrings as localString } from '../../../Localizations/SignUpLocalizationStrings';
import * as signUp from './SignUpFunctions';
import { backend } from '../../../Constants/RemoteInfo';

interface ISignUpProps {

}

const SignUp = (props: ISignUpProps) => {
    // Registering state
    const [isRegistering, setIsRegistering] = useState(false);

    // Agree State
    const [agreed, setAgreed] = useState(false)

    // Error states of the form
    const [errorEmail, setErrorEmail] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPW, setErrorConfirmPW] = useState("");
    const [errorAgree, setErrorAgree] = useState("");
    const [errorSchool, setErrorSchool] = useState("");
    const [errorProgramme, setErrorProgramme] = useState("")
    const [errorCGPA, setErrorCGPA] = useState("")
    const [errorExamName, setErrorExamName] = useState("")
    const [errorExamResult, setErrorExamResult] = useState("")


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setIsRegistering(true);
        event.preventDefault();
        const data = signUp.toSignUpFormData(new FormData(event.currentTarget));
        let error = false;

        // Verify if the form is filled correctly
        // For each field, it will first verify if the field is filled,
        // and then verify the correctness of it.

        if (!data.email) {
            // Email field filled
            setErrorEmail(localString.field_empty_error);
            error = true;
        } else if (!signUp.verifyEmailFormat(data)) {
            // Verify email format
            setErrorEmail(localString.email_format_error);
            error = true;
        } else if (!signUp.verifyEmailAvailable(data)) {
            // Verify email available
            setErrorEmail(localString.email_used_error);
            error = true;
        }

        // Verify username
        if (!data.username) {
            setErrorUsername(localString.field_empty_error);
            error = true;
        } else if (!signUp.verifyUsernameAvailable(data)) {
            setErrorUsername(localString.username_used_error);
            error = true;
        }

        // Verify password
        if (!data.password) {
            setErrorPassword(localString.field_empty_error);
            error = true;
        } else if (!signUp.verifyStrongPassword(data)) {
            // Verify password strongness
            setErrorPassword(localString.weak_password_error);
            error = true;
        }

        // Verify Confirm password
        if (!data.confirmPassword) {
            setErrorConfirmPW(localString.field_empty_error);
            error = true;
        } else if (!signUp.verifyConfirmPassword(data)) {
            // Verify confirm password matches
            setErrorConfirmPW(localString.password_not_match_error);
            error = true;
        }

        // Verify School
        if (!data.school) {
            setErrorSchool(localString.field_empty_error);
            error = true;
        }

        // Verify Programme
        if (!data.programme) {
            setErrorProgramme(localString.field_empty_error);
            error = true;
        }

        if (!agreed) {
            setErrorAgree(localString.did_not_agree_error);
            error = true;
        }

        // Error Breakpoint
        if (error) {
            setIsRegistering(false);
            return;
        }

        // Sign up with the data
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch(`${backend.url}${backend.pathRegister}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(signUp.toUserRegiserSchema(data))
        }).then(response => {
            response.json().then(val => {
                console.log("Response:")
                console.log(val)
            }, err => {
                console.log("Error:")
                console.log(err)
            })
        }).catch(reason => {
            // TODO: Display server unavailble
            setIsRegistering(false);
        })
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
                            id={signUp.formKey.email}
                            label={localString.email}
                            name={signUp.formKey.email}
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
                            id={signUp.formKey.username}
                            name={signUp.formKey.username}
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
                            id={signUp.formKey.password}
                            name={signUp.formKey.password}
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
                            id={signUp.formKey.confirmPassword}
                            name={signUp.formKey.confirmPassword}
                            label={localString.confirm_password}
                            type="password"
                            onChange={() => {
                                setErrorConfirmPW("");
                            }}
                        />
                        <Typography sx={{ color: "red", textAlign: "left" }}>
                            {errorConfirmPW}
                        </Typography>

                        {/* School Field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id={signUp.formKey.school}
                            name={signUp.formKey.school}
                            label={localString.school}
                            onChange={() => {
                                setErrorSchool("");
                            }}
                        />
                        <Typography sx={{ color: "red", textAlign: "left" }}>
                            {errorSchool}
                        </Typography>

                        {/* Programme Field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id={signUp.formKey.programme}
                            name={signUp.formKey.programme}
                            label={localString.programme}
                            onChange={() => {
                                setErrorProgramme("");
                            }}
                        />
                        <Typography sx={{ color: "red", textAlign: "left" }}>
                            {errorProgramme}
                        </Typography>

                        {/* CGPA Field */}
                        <TextField
                            margin="normal"
                            fullWidth
                            id={signUp.formKey.cgpa}
                            name={signUp.formKey.cgpa}
                            label={localString.cgpa}
                            onChange={() => {
                                setErrorCGPA("");
                            }}
                        />
                        <Typography sx={{ color: "red", textAlign: "left" }}>
                            {errorCGPA}
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item sx={{ width: "55%" }}>
                                {/* ExamName Field */}
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id={signUp.formKey.examName}
                                    name={signUp.formKey.examName}
                                    label={localString.exam_name}
                                    onChange={() => {
                                        setErrorExamName("");
                                    }}
                                />
                                <Typography sx={{ color: "red", textAlign: "left" }}>
                                    {errorExamName}
                                </Typography>
                            </Grid>
                            <Grid item sx={{ width: "45%" }}>
                                {/* ExamResult Field */}
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id={signUp.formKey.examResult}
                                    name={signUp.formKey.examResult}
                                    label={localString.exam_result}
                                    onChange={() => {
                                        setErrorExamResult("");
                                    }}
                                />
                                <Typography sx={{ color: "red", textAlign: "left" }}>
                                    {errorExamResult}
                                </Typography>
                            </Grid>
                        </Grid>

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

                        {/* Sumit button is disabled when waiting for server response */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isRegistering}
                        >
                            {
                                isRegistering ? (
                                    localString.registering
                                ) : (
                                    localString.sign_up
                                )
                            }
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignUp;