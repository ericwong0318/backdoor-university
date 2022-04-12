import { Alert, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, OutlinedInput, List, ListItem, ListItemText, Paper, Popper, Snackbar, TextField, Typography, Select, MenuItem, CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { IUser, UserRoleEnum } from '../../../../../App/interfaces'
import { useAuth } from '../../../../../Components/auth/AuthProvider'
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUser, GetUserErrorType, modifyPassword, ModifyPasswordErrorType, updateUser } from '../../../../../features/services'
import { LanguageContext } from '../../../../../Components/LanguageProvider/LanguageProvider';
import { dataURLtoFile } from '../../../../../App/helper';
import { v4 as uuidv4 } from 'uuid';

interface IProfileCard {
    user?: IUser | null
}

const ProfileCard = (props: IProfileCard) => {
    const { localString } = useContext(LanguageContext)
    const auth = useAuth();
    const [modifyPWAnchorEl, setModifyPWAnchorEl] = React.useState<null | HTMLElement>(null);
    const [verifyPWAnchorEl, setVerifyPWAnchorEl] = React.useState<null | HTMLElement>(null);

    // Edit profile info
    const [editing, setEditing] = useState(false);
    // const [editEmail, setEditEmail] = useState(user.email)
    const [editUsername, setEditUsername] = useState('')
    const [editSchool, setEditSchool] = useState('')
    const [editProgramme, setEditProgramme] = useState('')
    const [editType, setEditType] = useState('')
    const [editAdmissionYear, setEditAdmissionYear] = useState(0)
    const [editCGPA, setEditCGPA] = useState(0)
    const [editAvatar, setEditAvatar] = useState<File | null>(null)
    const [verifyPW, setVerifyPW] = useState('')
    const [verifyPWError, setVerifyPWError] = useState('')
    const [saving, setSaving] = useState(false);

    const renderProgType = (type: string) => {
        switch (type) {
            case 'undergrad':
                return localString.undergrad;
            case 'asso':
                return localString.asso
            case 'hd':
                return localString.hd

            default:
                return "?"
        }
    }

    useEffect(() => {
        if (editing && props.user) {
            // setEditEmail(user.email)
            setEditUsername(props.user.name)
            setEditSchool(props.user.school)
            setEditProgramme(props.user.programme)
            setEditType(props.user.type)
            setEditAdmissionYear(props.user.admissionYear)
            setEditCGPA(props.user.cgpa)
        }
    }, [editing])

    // Change Password
    const [oldPW, setOldPW] = useState("");
    const [newPW, setNewPW] = useState("");
    const [oldPWError, setOldPWError] = useState("")
    const [newPWError, setNewPWError] = useState("")
    const [successSnakbarText, setSuccessSnakbarText] = useState('')
    const [failSnakbarText, setFailSnakbarText] = useState('')

    const handleCancelEditButtonClick = () => {
        setEditing(false)
        setEditAvatar(null)
    }

    const handleConfirmNewPWClick = () => {
        if (saving)
            return;

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

        setSaving(true);
        // Request to change password
        modifyPassword(props.user!.email, oldPW.trim(), newPW.trim(), UserRoleEnum.user,
            () => {
                setSuccessSnakbarText(localString.profile_changed);
                setModifyPWAnchorEl(null);
                setSaving(false);
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
        if (props.user) {
            setSaving(true);
            getUser({ email: props.user.email },
                user => {
                    const formData = new FormData();
                    formData.append('email', user.email)
                    formData.append('name', user.name)
                    const photo = (editAvatar) ? editAvatar : dataURLtoFile(user.photo!, uuidv4());
                    formData.append('photo', photo!, uuidv4())
                    formData.append('school', user.school)
                    formData.append('programme', editProgramme)
                    formData.append('addmissionYear', editAdmissionYear.toString())
                    formData.append('type', editType)
                    formData.append('cgpa', editCGPA.toString())
                    formData.append('examname', user.exam.name)
                    formData.append('result', user.exam.result)
                    formData.append('offerSchool', user!.offer!.school)
                    formData.append('offerProgramme', user!.offer!.programme)

                    updateUser(formData,
                        () => {
                            setSuccessSnakbarText(localString.profile_changed)
                            setVerifyPWAnchorEl(null);
                            setSaving(false);
                        }, err => {
                            setFailSnakbarText(localString.opps)
                            setSaving(false);
                        })
                }, err => {
                    setFailSnakbarText(localString.opps)
                    setSaving(false);
                }, true)
        }
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

        setSuccessSnakbarText('');
    }

    const handleErrorSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setFailSnakbarText('')
    }



    useEffect(() => {
        if (!auth.user) {
            setEditing(false);
        }
    }, [auth.user])

    return (
        <React.Fragment>
            {props.user ? (
                <React.Fragment>
                    <Card>
                        <CardHeader
                            title={localString.profile}
                            action={
                                (auth.user && auth.user.email === props.user.email) &&
                                <IconButton onClick={() => setEditing(true)}>
                                    <EditIcon />
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={5}>
                                {/* Avatar */}
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container item >
                                        <Grid item xs={4} md={4} lg={4}>
                                            <Typography>
                                                {props.user.photo ? (
                                                    <Avatar sx={{ width: "120px", height: "120px" }}
                                                        alt={props.user.name}
                                                        src={props.user.photo} />
                                                )
                                                    : (
                                                        <AccountCircleIcon sx={{ width: "120px", height: "120px" }} />
                                                    )}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} md={8} lg={8}>
                                            {editing && <>
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
                                                                setEditAvatar(e.target.files[0])
                                                        }}
                                                    />
                                                </Button>
                                                {/* Display file name */}
                                                {editAvatar && <Typography>{editAvatar.name}</Typography>}
                                            </>}
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
                                                // Not allow to edit email
                                                // editing ? (
                                                //     <TextField fullWidth size="small" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                                                // ) : (
                                                // )
                                                <Typography >
                                                    {props.user.email}
                                                </Typography>
                                            }
                                        </Grid>

                                        {/* Name */}
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                {localString.username}:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9} md={9} lg={9}>
                                            {
                                                editing ? (
                                                    <TextField fullWidth size="small" value={editUsername} onChange={e => setEditUsername(e.target.value)} />
                                                ) : (
                                                    <Typography >
                                                        {props.user.name}
                                                    </Typography>
                                                )
                                            }
                                        </Grid>

                                        {/* School */}
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                {localString.school}:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9} md={9} lg={9}>
                                            {
                                                editing ? (
                                                    <TextField fullWidth size="small" value={editSchool} onChange={e => setEditSchool(e.target.value)} />
                                                ) : (
                                                    <Typography >
                                                        {props.user.school}
                                                    </Typography>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: '3%' }} />
                            <Grid container spacing={1}>
                                {/* Programme */}
                                <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: "10px" }}>
                                    <Typography variant="h5">
                                        {localString.programme}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} md={3} lg={3}>
                                    <Typography>
                                        {localString.name}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} md={9} lg={9}>
                                    <Typography >
                                        {
                                            editing ? (
                                                <TextField fullWidth size="small" value={editProgramme} onChange={e => setEditProgramme(e.target.value)} />
                                            ) : (
                                                <Typography >
                                                    {props.user.programme}
                                                </Typography>
                                            )
                                        }
                                    </Typography>
                                </Grid>

                                {/* Type */}
                                <Grid item xs={3} md={3} lg={3}>
                                    <Typography>
                                        {localString.prog_type}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} md={9} lg={9}>

                                    {
                                        editing ? (
                                            <Select value={editType} onChange={e => {
                                                if (e.target.value === "undergrad" || e.target.value === "asso" || e.target.value === "hd")
                                                    setEditType(e.target.value)
                                            }}>
                                                <MenuItem value={"undergrad"}>{renderProgType("undergrad")}</MenuItem>
                                                <MenuItem value={"asso"}>{renderProgType("asso")}</MenuItem>
                                                <MenuItem value={"hd"}>{renderProgType("hd")}</MenuItem>
                                            </Select>
                                        ) : (
                                            <Typography >
                                                {renderProgType(props.user.type)}
                                            </Typography>
                                        )
                                    }
                                </Grid>

                                {/* Admission Year */}
                                <Grid item xs={3} md={3} lg={3}>
                                    <Typography>
                                        {localString.admission_year}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} md={9} lg={9}>
                                    {
                                        editing ? (
                                            <OutlinedInput type="number" fullWidth size="small" value={editAdmissionYear} onChange={e => setEditAdmissionYear(Number(e.target.value))} />
                                        ) : (
                                            <Typography >
                                                {props.user.admissionYear}
                                            </Typography>
                                        )
                                    }
                                </Grid>

                                {/* CGPA */}
                                <Grid item xs={3} md={3} lg={3}>
                                    <Typography>
                                        {localString.cgpa}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} md={9} lg={9}>
                                    {
                                        editing ? (
                                            <OutlinedInput type='number' fullWidth size="small" value={editCGPA} onChange={e => setEditCGPA(Number(e.target.value))} />
                                        ) : (
                                            <Typography >
                                                {props.user.cgpa}
                                            </Typography>
                                        )
                                    }
                                </Grid>
                            </Grid>

                            {/* Editing related buttons */}
                            <Divider sx={{ my: '3%' }} />
                            <CardActions>
                                <Grid item xs={12} md={12} lg={12}>
                                    {
                                        (auth.user && auth.user.email === props.user.email) &&
                                        <Button onClick={e => setModifyPWAnchorEl(modifyPWAnchorEl ? null : e.currentTarget)}>
                                            {localString.change_password}
                                        </Button>
                                    }
                                </Grid>
                                {editing && <>
                                    <Button sx={{ marginLeft: "auto" }}
                                        variant="text"
                                        onClick={handleCancelEditButtonClick}
                                    >
                                        {localString.cancel}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={e => setVerifyPWAnchorEl(e.currentTarget)}
                                        disabled={Boolean(saving)}
                                    >
                                        {localString.save}
                                    </Button>
                                </>
                                }
                            </CardActions>
                        </CardContent>
                    </Card>

                    {/* Modify password */}
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
                                        disabled={Boolean(saving)}
                                    >
                                        {localString.confirm}
                                    </Button>
                                    <Button
                                        variant="text"
                                        onClick={handleCancelVerifyPWClick}
                                        disabled={Boolean(saving)}
                                    >
                                        {localString.cancel}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Popper>
                    <Snackbar open={Boolean(successSnakbarText)} autoHideDuration={6000} onClose={handleSuccessSnackbarClose}>
                        <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            {successSnakbarText}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={Boolean(failSnakbarText)} autoHideDuration={6000} onClose={handleErrorSnackbarClose}>
                        <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{ width: '100%' }}>
                            {failSnakbarText}
                        </Alert>
                    </Snackbar>
                </React.Fragment>
            ) : (
                <CircularProgress />
            )}
        </React.Fragment>
    )
}

export default ProfileCard;