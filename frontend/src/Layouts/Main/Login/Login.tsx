import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { LoginLocalizatiionStrings as localString } from '../../../Localizations/LoginLocalizatiionStrings';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as login from './LoginFunctions';
import { Alert } from '@mui/material';
import { useAuth } from '../../../Components/auth/AuthProvider';
import { LoginErrorType } from '../../../auth';
import { LayoutPath } from '../../../App/constants';

export default function Login() {
  // Determine if it is now loggin in
  const [isLogingIn, setIsLogingIn] = useState(false);

  // Is the 'remember me' option checked
  const [rememberMe, setRememberMe] = useState(false);

  // Login hook
  const auth = useAuth();

  // Navigate
  const navigate = useNavigate()

  // Error states
  const [errorLogin, setErrorLogin] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLogingIn(true);
    setErrorLogin('')
    event.preventDefault();
    const data = login.toLoginFormData(new FormData(event.currentTarget));
    let error = false;

    // Verify if any infomation is missing
    if (!data.email) {
      setErrorEmail(localString.field_empty_error)
      error = true;
    }
    if (!data.password) {
      setErrorPassword(localString.field_empty_error)
      error = true;
    }

    // Error Breakpoint
    if (error) {
      setIsLogingIn(false);
      return;
    }

    // Login the user
    auth.login(data.email!, data.password!,
      () => {
        // Login success
        // If "remember me" is checked, save the email password
        if (rememberMe)
          auth.rememberLoginInfo(data.email!, data.password!);

        // go back to home page
        navigate(LayoutPath.home)
      },
      (err) => {
        switch (err.type) {
          case LoginErrorType.incorrect_email:
          case LoginErrorType.incorrect_pw:
          case LoginErrorType.incorrect_email_or_pw:
            setErrorLogin(localString.incorrect_info_error);
            break;

          default:
            setErrorLogin(localString.server_unavailable_error);
            break;
        }
        setIsLogingIn(false);
      })
  };

  if (auth.user) {
    // User already logged in, redirect to home page
    return <Navigate to={LayoutPath.home} replace />
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
          backgroundImage: 'https://www.vtc.edu.hk/ero/infoday/2021/images/tc/campus/320f727d4f5e61a3a279af01790c9603.jpg',
          // backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <Box
          component="img"
          src="https://www.vtc.edu.hk/ero/infoday/2021/images/tc/campus/320f727d4f5e61a3a279af01790c9603.jpg"
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {localString.login}
          </Typography>

          {/* The error message when failed to login */}
          {errorLogin &&
            <Alert severity="error" sx={{ mt: 1 }}>
              {errorLogin}
            </Alert>
          }

          {/* Email Text Field */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id={login.formKey.email}
              name={login.formKey.email}
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

            <TextField
              margin="normal"
              required
              fullWidth
              id={login.formKey.password}
              name={login.formKey.password}
              label={localString.password}
              type="password"
              autoComplete="current-password"
              onChange={() => {
                setErrorPassword('')
              }}
            />
            <Typography sx={{ color: "red", textAlign: "left" }}>
              {errorPassword}
            </Typography>

            <FormControlLabel
              control={<Checkbox checked={rememberMe} color="primary" onChange={() => setRememberMe(!rememberMe)} />}
              label={localString.remember_me}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLogingIn}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogingIn ? (
                localString.loging_in
              ) : (
                localString.login
              )}
            </Button>


            <Grid container>
              <Grid item xs>
                {/* Forgot Password Button */}
                <Link to={LayoutPath.forgotpassword}>
                  <Typography>
                    {localString.forgot_password}
                  </Typography>
                </Link>
              </Grid>
              {/* Register Button */}
              <Grid item>
                <Link to={LayoutPath.register}>
                  {localString.register}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

