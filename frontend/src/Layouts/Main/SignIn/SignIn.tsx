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
import { SigninLocalizatiionStrings as localString } from '../../../Localizations/SigninLocalizatiionStrings';
import { Link } from 'react-router-dom';
import { LayoutPath } from '../../../Constants/RoutePaths';
import CreateIcon from '@mui/icons-material/Create';
import * as signIn from './SignInFunctions';
import { Alert } from '@mui/material';
import { backend } from '../../../Constants/RemoteInfo';

export default function SignIn() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Error states
  const [errorSignIn, setErrorSignIn] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsSigningIn(true);
    setErrorSignIn('')
    event.preventDefault();
    const data = signIn.toSignInFormData(new FormData(event.currentTarget));
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
      setIsSigningIn(false);
      return;
    }

    // Sign In the user
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${backend.url}${backend.pathLogin}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(signIn.toUserLoginSchema(data))
    }).then(response => {
      // TODO: Handle login
    }).catch(reason => {
      // TODO: display server unavailable
      setErrorSignIn(localString.server_unavailable_error)
      setIsSigningIn(false);
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
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {localString.sign_in}
          </Typography>

          {/* The error message when failed to login */}
          {errorSignIn &&
            <Alert severity="error" sx={{ mt: 1 }}>
              {errorSignIn}
            </Alert>
          }

          {/* Email Text Field */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id={signIn.formKey.email}
              name={signIn.formKey.email}
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
              id={signIn.formKey.password}
              name={signIn.formKey.password}
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
              disabled={isSigningIn}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSigningIn ? (
                localString.signing_in
              ) : (
                localString.sign_in
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
              {/* Sign Up Button */}
              <Grid item>
                <Link to={LayoutPath.signup}>
                  {localString.sign_up}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

