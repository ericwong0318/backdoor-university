import { Alert, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Paper, Popper, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IUser, UserTypeEnum } from '../../../../../App/interfaces'
import { useAuth } from '../../../../../Components/auth/AuthProvider'
import { UserProfileLocalizationStrings as localString } from '../../../../../Localizations/UserProfileLocalizationStrings'
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LayoutPath } from '../../../../../App/constants'
import { navItemRight } from '../../../../Header/HeaderStyle'
import { modifyPassword, ModifyPasswordErrorType } from '../../../../../features/services'

interface IProfileCard {
    user: IUser
}

const ProfileCard = (props: IProfileCard) => {
    const user = props.user;
    const auth = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const changePWPopperOpen = Boolean(anchorEl);

    const [editing, setEditing] = useState(false);

    // Forgot Password
    const [oldPW, setOldPW] = useState("");
    const [newPW, setNewPW] = useState("");
    const [oldPWError, setOldPWError] = useState("")
    const [newPWError, setNewPWError] = useState("")
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const handleSaveButtonClick = () => {

    }

    const handleConfirmNewPWClick = () => {
        if (!oldPW.trim()) {
            setOldPWError(localString.field_empty_error);
            return;
        }

        if (!newPW.trim()) {
            setNewPWError(localString.field_empty_error)
            return;
        }

        // Password strongest guard
        if (newPW.trim().length < 6) {
            setNewPWError(localString.new_pw_too_weak_error);
            return;
        }

        // Compare new old password 
        if (newPW.trim() === oldPW.trim()) {
            setNewPWError(localString.new_old_pw_same_error);
            return;
        }

        // Request to change password
        modifyPassword(user.email, oldPW.trim(), newPW.trim(), UserTypeEnum.user,
            () => {
                setSuccessSnackbarOpen(true);
                setAnchorEl(null);
            }, err => {
                switch (err) {
                    case ModifyPasswordErrorType.IncorrectOldPassword:
                        setOldPWError(localString.old_pw_incorrect_error)
                        break;
                }
            })
    }

    const handleCancelNewPWClick = () => {
        setNewPW("")
        setOldPW("")
        setOldPWError("")
        setNewPWError("")
        setAnchorEl(null)
    }

    const handleSuccessSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessSnackbarOpen(false);
    }

    const handleErrorSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorSnackbarOpen(false);
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    title={localString.profile}
                    action={
                        (auth.user && auth.user.email === user.email) &&
                        <IconButton onClick={() => setEditing(true)}>
                            <EditIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography>
                                {user.photo ? (
                                    <Avatar sx={{ width: "120px", height: "120px" }}
                                        alt={user.name}
                                        src={user.photo!} />
                                )
                                    : (
                                        <AccountCircleIcon sx={{ width: "120px", height: "120px" }} />
                                    )}
                            </Typography>
                        </Grid>

                        {/* Info table */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container>
                                {/* Email */}
                                <Grid item xs={3} md={3} lg={3}>
                                    <Typography>
                                        {localString.email}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} md={9} lg={9}>
                                    {
                                        editing ? (
                                            <TextField>

                                            </TextField>
                                        ) : (
                                            <Typography >
                                                {user.email}
                                            </Typography>
                                        )
                                    }
                                </Grid>

                                {/* Name */}
                                <Grid item xs={3} md={3} lg={3}>
                                    <Typography>
                                        {localString.username}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} md={9} lg={9}>
                                    <Typography >
                                        {user.name}
                                    </Typography>
                                </Grid>

                                {/* School */}
                                <Grid item xs={3} md={3} lg={3}>
                                    <Typography>
                                        {localString.school}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} md={9} lg={9}>
                                    <Typography >
                                        {user.school}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Editing related buttons */}
                    <Divider sx={{ marginTop: '3%' }} />
                    <CardActions>
                        <Grid item xs={12} md={12} lg={12}>
                            <Button onClick={e => setAnchorEl(anchorEl ? null : e.currentTarget)}>
                                {localString.change_password}
                            </Button>
                        </Grid>
                        {editing && <>
                            <Button sx={{ marginLeft: "auto" }}
                                variant="text"
                                onClick={() =>
                                    setEditing(!editing)}
                            >
                                {localString.cancel}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleSaveButtonClick}
                            >
                                {localString.save}
                            </Button>
                        </>
                        }
                    </CardActions>
                </CardContent>
            </Card>
            <Popper open={changePWPopperOpen} anchorEl={anchorEl}>
                <Box sx={{ width: "240px", border: 1, p: 1, bgcolor: 'background.paper' }}>
                    <Grid container spacing={3}>
                        {/* Old Password */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography>
                                <TextField
                                    type="password"
                                    error={Boolean(oldPWError)}
                                    label={localString.old_password}
                                    value={oldPW}
                                    onChange={e => {
                                        setOldPWError("")
                                        setOldPW(e.target.value)
                                    }}
                                />
                            </Typography>
                            {oldPWError &&
                                <Grid item>
                                    <Typography color={"red"}>{oldPWError}</Typography>
                                </Grid>
                            }
                        </Grid>

                        {/* New Password */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography>
                                <TextField
                                    error={Boolean(newPWError)}
                                    label={localString.new_password}
                                    type="password"
                                    value={newPW}
                                    onChange={e => {
                                        setNewPWError("")
                                        setNewPW(e.target.value)
                                    }}
                                />
                            </Typography>
                        </Grid>

                        {
                            newPWError &&
                            <Grid item>
                                <Typography color={"red"}>
                                    {newPWError}
                                </Typography>
                            </Grid>
                        }

                        <Grid item xs={12} md={12} lg={12} >
                            <Button
                                variant="outlined"
                                onClick={handleConfirmNewPWClick}
                            >
                                {localString.confirm}
                            </Button>
                            <Button
                                variant="text"
                                onClick={handleCancelNewPWClick}
                            >
                                {localString.cancel}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Popper>
            <Snackbar open={successSnackbarOpen} autoHideDuration={6000} onClose={handleSuccessSnackbarClose}>
                <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {localString.change_pw_success}
                </Alert>
            </Snackbar>
            <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={handleErrorSnackbarClose}>
                <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {localString.server_unavailable_error}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default ProfileCard;