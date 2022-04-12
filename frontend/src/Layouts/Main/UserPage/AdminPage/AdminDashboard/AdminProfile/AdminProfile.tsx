import { Card, CardHeader, IconButton, CardContent, Grid, Typography, Avatar, Button, TextField, Divider, Select, MenuItem, OutlinedInput, CardActions, Snackbar, Alert, Box, Popper } from '@mui/material'
import React, { useContext, useState } from 'react'
import { LanguageContext } from '../../../../../../Components/LanguageProvider/LanguageProvider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../../../../../Components/auth/AuthProvider';
import { UserRoleEnum } from '../../../../../../App/interfaces';
import { modifyPassword, ModifyPasswordErrorType } from '../../../../../../features/services';

interface IAdminProfileProps {
    email: string
}

const AdminProfile = (props: IAdminProfileProps) => {
    const { localString } = useContext(LanguageContext)
    const [editing, setEditing] = useState(false);
    const [editEmail, setEditEmail] = useState(props.email)
    const [modifyPWAnchorEl, setModifyPWAnchorEl] = React.useState<null | HTMLElement>(null);
    const [verifyPWAnchorEl, setVerifyPWAnchorEl] = React.useState<null | HTMLElement>(null);

    // Change password
    const [oldPW, setOldPW] = useState("");
    const [newPW, setNewPW] = useState("");
    const [oldPWError, setOldPWError] = useState("")
    const [newPWError, setNewPWError] = useState("")
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    // Verify Password
    const [verifyPW, setVerifyPW] = useState('')
    const [verifyPWError, setVerifyPWError] = useState('')

    // handle clicks
    const handleConfirmNewPWClick = () => {
        if (!oldPW.trim()) {
            setOldPWError(localString.field_empty_error);
            return;
        }

        if (!newPW.trim()) {
            setNewPWError(localString.field_empty_error)
            return;
        }

        // Compare new old password 
        if (newPW.trim() === oldPW.trim()) {
            setNewPWError(localString.new_old_pw_same_error);
            return;
        }

        // Request to change password
        modifyPassword(props.email, oldPW.trim(), newPW.trim(), UserRoleEnum.admin,
            () => {
                setSuccessSnackbarOpen(true);
                setModifyPWAnchorEl(null);
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
        setModifyPWAnchorEl(null)
    }

    const handleConfirmVerifyPWClick = () => {

    }

    const handleCancelVerifyPWClick = () => {
        setVerifyPW("")
        setVerifyPWError('')
        setVerifyPWAnchorEl(null)
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
                // Cannot edit email
                // action={
                //     <IconButton onClick={() => setEditing(true)}>
                //         <EditIcon />
                //     </IconButton>
                // }
                />
                <CardContent>
                    <Grid container spacing={5}>
                        {/* Avatar */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container item >
                                <Grid item xs={4} md={4} lg={4}>
                                    <Typography>
                                        <AccountCircleIcon sx={{ width: "120px", height: "120px" }} />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Info table */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container spacing={1}>
                                {/* Email */}
                                <Grid item xs={3} md={3} lg={3}>
                                    <Typography>
                                        {localString.email}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} md={9} lg={9}>
                                    {
                                        editing ? (
                                            <TextField fullWidth size="small"
                                                value={editEmail}
                                                onChange={e => setEditEmail(e.target.value)} />
                                        ) : (
                                            <Typography >
                                                {props.email}
                                            </Typography>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Editing related buttons */}
                    <Divider sx={{ my: '3%' }} />
                    <CardActions>
                        <Grid item xs={12} md={12} lg={12}>
                            <Button onClick={e => setModifyPWAnchorEl(modifyPWAnchorEl ? null : e.currentTarget)}>
                                {localString.change_password}
                            </Button>
                        </Grid>
                        {editing && <>
                            <Button sx={{ marginLeft: "auto" }}
                                variant="text"
                                onClick={() => setEditing(false)}
                            >
                                {localString.cancel}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={e => setVerifyPWAnchorEl(e.currentTarget)}
                            >
                                {localString.save}
                            </Button>
                        </>
                        }
                    </CardActions>
                </CardContent>
            </Card>
            {/* Modify Password */}
            <Popper open={Boolean(modifyPWAnchorEl)} anchorEl={modifyPWAnchorEl}>
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

            {/* Verify password */}
            <Popper open={Boolean(verifyPWAnchorEl)} anchorEl={verifyPWAnchorEl}>
                <Box sx={{ width: "240px", border: 1, p: 1, bgcolor: 'background.paper' }}>
                    <Grid container spacing={3}>
                        {/* Password */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography>
                                <TextField
                                    type="password"
                                    error={Boolean(verifyPWError)}
                                    label={localString.password}
                                    value={verifyPW}
                                    onChange={e => {
                                        setVerifyPWError('')
                                        setVerifyPW(e.target.value)
                                    }}
                                    helperText={verifyPWError}
                                />
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12} >
                            <Button
                                variant="outlined"
                                onClick={handleConfirmVerifyPWClick}
                            >
                                {localString.confirm}
                            </Button>
                            <Button
                                variant="text"
                                onClick={handleCancelVerifyPWClick}
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

export default AdminProfile;