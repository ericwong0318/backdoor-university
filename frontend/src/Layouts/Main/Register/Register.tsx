import { Grid, CssBaseline, Paper, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Alert, AlertTitle } from '@mui/material';
import React, { useContext, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import * as register from './RegisterFunctions';
import { Link } from 'react-router-dom';
import { LayoutPath } from '../../../App/constants';
import { LanguageContext } from '../../../Components/LanguageProvider/LanguageProvider';

interface IRegisterProps {

}

const Register = (props: IRegisterProps) => {
    const { localString } = useContext(LanguageContext)

    // Registering state
    const [isRegistering, setIsRegistering] = useState(false);

    // Register success state
    const [requestSuccess, setRequestSuccess] = useState(false);

    // File uploaded
    const [fileInput, setFileInput] = useState<File | null | undefined>(null);

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
    const [errorAdmissionYear, setErrorAdmissionYear] = useState("")
    const [errorCGPA, setErrorCGPA] = useState("")
    const [errorExamName, setErrorExamName] = useState("")
    const [errorExamResult, setErrorExamResult] = useState("")
    const [errorFile, setErrorFile] = useState("")
    const [errorRegister, setErrorRegister] = useState("")


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setIsRegistering(true);
        setErrorRegister("")
        event.preventDefault();
        const data = register.toRegisterFormData(new FormData(event.currentTarget), fileInput);
        let error = false;

        // Verify if the form is filled correctly
        // For each field, it will first verify if the field is filled,
        // and then verify the correctness of it.

        if (!data.email) {
            // Email field filled
            setErrorEmail(localString.field_empty_error);
            error = true;
        } else if (!register.verifyEmailFormat(data)) {
            // Verify email format
            setErrorEmail(localString.email_format_error);
            error = true;
        }

        // Verify username
        if (!data.username) {
            setErrorUsername(localString.field_empty_error);
            error = true;
        }

        // Verify password
        if (!data.password) {
            setErrorPassword(localString.field_empty_error);
            error = true;
        } else if (!register.verifyStrongPassword(data)) {
            // Verify password strongness
            setErrorPassword(localString.weak_password_error);
            error = true;
        }

        // Verify Confirm password
        if (!data.confirmPassword) {
            setErrorConfirmPW(localString.field_empty_error);
            error = true;
        } else if (!register.verifyConfirmPassword(data)) {
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

        // Verify Admission Year
        if (!data.admissionYear) {
            setErrorAdmissionYear(localString.field_empty_error)
            error = true
        }

        // Verify Photo
        if (!data.file) {
            setErrorFile(localString.no_file_error);
            error = true;
        } else {
            // Verify Size
            const fSize = data.file!.size
            if (fSize / 1000000 > 2) {
                setErrorFile(localString.file_size_error);
                error = true;
            }
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

        // Register with the data
        register.registerWithData(register.toUserRegiserSchema(data, fileInput!),
            () => {
                // Register success callback
                setIsRegistering(false);
                setRequestSuccess(true);
            }, err => {
                // Register failed callback
                switch (err.type) {
                    case register.ErrorType.email_used:
                        setErrorRegister(localString.email_used_error);
                        break;

                    case register.ErrorType.file_missing:
                        setErrorFile(localString.no_file_error);
                        break;

                    case register.ErrorType.server_unavailable:
                    case register.ErrorType.unknown:
                        setErrorRegister(localString.server_unavailable_error);
                        break;

                    default:
                        setErrorRegister(localString.server_unavailable_error);
                        break;
                }

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
                    backgroundImage: 'https://www.vtc.edu.hk/ero/infoday/2021/images/tc/campus/320f727d4f5e61a3a279af01790c9603.jpg',
                    // backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <Box
                    component="img"
                    src="https://www.cpce-polyu.edu.hk/f/page/2298/9072/HKCC_Virtual_Bg_09.jpg"
                />
            </Grid>
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
                                < Alert severity='success' sx={{ marginTop: "10%", textAlign: "left" }}>
                                    <AlertTitle >{localString.success}</AlertTitle>
                                    {localString.success_message} - <Link to={LayoutPath.login}><strong>{localString.back_to_login}</strong></Link>
                                </Alert>
                            </>
                        ) : (
                            <>
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <CreateIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    {localString.register}
                                </Typography>

                                {/* Server error response field */}
                                {errorRegister &&
                                    <Alert severity='error'>
                                        {errorRegister}
                                    </Alert>
                                }

                                {/* Email field */}
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={register.formKey.email}
                                        label={localString.email}
                                        name={register.formKey.email}
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
                                        id={register.formKey.username}
                                        name={register.formKey.username}
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
                                        id={register.formKey.password}
                                        name={register.formKey.password}
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
                                        id={register.formKey.confirmPassword}
                                        name={register.formKey.confirmPassword}
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
                                        id={register.formKey.school}
                                        name={register.formKey.school}
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
                                        id={register.formKey.programme}
                                        name={register.formKey.programme}
                                        label={localString.programme}
                                        onChange={() => {
                                            setErrorProgramme("");
                                        }}
                                    />
                                    <Typography sx={{ color: "red", textAlign: "left" }}>
                                        {errorProgramme}
                                    </Typography>

                                    {/* Admission year Field */}
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={register.formKey.admissionYear}
                                        name={register.formKey.admissionYear}
                                        label={localString.admission_year}
                                        onChange={() => {
                                            setErrorAdmissionYear("");
                                        }}
                                    />
                                    <Typography sx={{ color: "red", textAlign: "left" }}>
                                        {errorAdmissionYear}
                                    </Typography>

                                    {/* CGPA Field */}
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id={register.formKey.cgpa}
                                        name={register.formKey.cgpa}
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
                                                id={register.formKey.examName}
                                                name={register.formKey.examName}
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
                                                id={register.formKey.examResult}
                                                name={register.formKey.examResult}
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

                                    {/* File upload field */}
                                    <Typography>
                                        <Grid container>
                                            <Grid item xs={7}>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                >
                                                    {localString.choose_photo}
                                                    <input
                                                        type="file"
                                                        accept="image/png, image/gif, image/jpeg"
                                                        hidden
                                                        onChange={(e) => {
                                                            if (e.target.files)
                                                                setFileInput(e.target.files[0])
                                                            setErrorFile("");
                                                        }}
                                                    />
                                                </Button>
                                            </Grid>
                                            <Grid item xs={5}>
                                                {/* Display file name */}
                                                <TextField disabled={true} variant="filled" label={fileInput?.name} />
                                            </Grid>
                                        </Grid>
                                        <Typography sx={{ color: "red", textAlign: "left" }}>
                                            {errorFile}
                                        </Typography>
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
                                                localString.register
                                            )
                                        }
                                    </Button>
                                </Box>
                            </>
                        )
                    }
                </Box>
            </Grid>
        </Grid >
    )
}

export default Register;