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
import { Link } from 'react-router-dom';
import { LayoutPath } from '../../../Constants/RoutePaths';
import CreateIcon from '@mui/icons-material/Create';
import * as login from './LoginFunctions';
import { Alert } from '@mui/material';
import { backend } from '../../../Constants/RemoteInfo';

export default function Login() {
  const [isLogingIn, setIsLogingIn] = useState(false);

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
    login.LoginWithData(login.toUserLoginSchema(data),
      () => { },
      () => { })
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
            <CreateIcon />
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
              control={<Checkbox value="remember" color="primary" />}
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

