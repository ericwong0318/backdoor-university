import { Card, CardHeader, IconButton, CardContent, Grid, Typography, Avatar, Button, TextField, Divider, Select, MenuItem, OutlinedInput, CardActions, Snackbar, Alert, Box, Popper } from '@mui/material'
import React, { useContext, useState } from 'react'
import { LanguageContext } from '../../../../../../Components/LanguageProvider/LanguageProvider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../../../../../Components/auth/AuthProvider';
import { UserRoleEnum } from '../../../../../../App/interfaces';
import { updatePasswordAsAdmin, ModifyPasswordErrorType } from '../../../../../../features/services';

interface IAdminProfileProps {
    email: string
}

const AdminProfile = (props: IAdminProfileProps) => {
    const { localString } = useContext(LanguageContext)
    const [editing, setEditing] = useState(false);
    const [editEmail, setEditEmail] = useState(props.email)
    const [modifyPWAnchorEl, setModifyPWAnchorEl] = React.useState<null | HTMLElement>(null);

    // Change password
    const [saving, setSaving] = useState(false)
    const [newPW, setNewPW] = useState("");
    const [newPWError, setNewPWError] = useState("")
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    // handle clicks
    const handleConfirmNewPWClick = () => {
        if (!newPW.trim()) {
            setNewPWError(localString.field_empty_error)
            return;
        }

        setSaving(true);
        // Request to change password
        updatePasswordAsAdmin(props.email, newPW.trim(),
            () => {
                setSuccessSnackbarOpen(true);
                setModifyPWAnchorEl(null);
                setSaving(false);
            }, err => {
                console.log(err)
                setErrorSnackbarOpen(true)
                setSaving(false);
            })
    }

    const handleCancelNewPWClick = () => {
        setNewPW("")
        setNewPWError("")
        setModifyPWAnchorEl(null)
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
                />
                <CardContent>
                    <Grid container spacing={5}>
                        {/* Fake Avatar */}
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
                            <Button onClick={e => setModifyPWAnchorEl(modifyPWAnchorEl ? null : e.currentTarget)}
                                disabled={Boolean(saving)}>
                                {localString.change_password}
                            </Button>
                        </Grid>
                    </CardActions>
                </CardContent>
            </Card>
            {/* Modify Password */}
            <Popper open={Boolean(modifyPWAnchorEl)} anchorEl={modifyPWAnchorEl}>
                <Box sx={{ width: "240px", border: 1, p: 1, bgcolor: 'background.paper' }}>
                    <Grid container spacing={3}>
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
                                disabled={Boolean(saving)}
                            >
                                {localString.confirm}
                            </Button>
                            <Button
                                variant="text"
                                onClick={handleCancelNewPWClick}
                                disabled={Boolean(saving)}
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
                    {localString.opps}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default AdminProfile;