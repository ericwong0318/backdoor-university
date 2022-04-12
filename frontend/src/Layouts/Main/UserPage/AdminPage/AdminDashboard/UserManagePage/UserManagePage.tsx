import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRenderEditCellParams, GridRowParams } from '@mui/x-data-grid'
import { activateEmail, getAllUser, getUser, updatePasswordAsAdmin } from '../../../../../../features/services'
import { LanguageContext } from '../../../../../../Components/LanguageProvider/LanguageProvider'
import { Alert, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography } from '@mui/material'
import ProgTypeEditInputCell from './ProgTypeEditInputCell/ProgTypeEditInputCell'
import { UserRoleEnum } from '../../../../../../App/interfaces'
import { LayoutPath } from '../../../../../../App/constants'
import { useNavigate } from 'react-router-dom'
import AutorenewIcon from '@mui/icons-material/Autorenew';

interface IUserManagePageProps {

}

const renderProgTypeEditInputCell = (params: GridRenderEditCellParams<any, any, any>) => {
    return <ProgTypeEditInputCell {...params} />
}

const UserManagePage = (props: IUserManagePageProps) => {
    const { localString } = useContext(LanguageContext)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [triedGetData, setTriedGetData] = useState(false)
    const [users, setUsers] = useState<any[]>([])
    const [loadingError, setLoadingError] = useState("");
    const [editUserFormOpen, setEditUserFormOpen] = useState(false)
    const [selectedUserEmail, setSelectedUserEmail] = useState('')
    const [selectedUsername, setSelectedUsername] = useState('')
    const [successSnakbarText, setSuccessSnakbarText] = useState('')
    const [failSnakbarText, setFailSnakbarText] = useState('')
    const [editUserPassword, setEditUserPassword] = useState('')
    const [editUserPasswordError, setEditUserPasswordError] = useState('')

    const columns: GridColDef[] = [
        { field: 'email', headerName: localString.email, width: 240 },
        { field: 'name', headerName: localString.name, width: 140 },
        { field: 'school', headerName: localString.school, width: 90 },
        { field: 'programme', headerName: localString.programme, width: 240 },
        // { field: 'type', headerName: localString.prog_type, width: 240, renderEditCell: renderProgTypeEditInputCell },
        { field: 'status', headerName: localString.status, width: 90 },
    ]

    useEffect(() => {
        if (!triedGetData) {
            setLoading(true)
            getAllUser((u) => {
                setUsers(u)
                setLoadingError('')
                setLoading(false);
            }, () => {
                setLoadingError(localString.get_user_error)
                setLoading(false);
            }
            );
            setTriedGetData(true);
        }
    })

    // Button click events
    const handleChangePWButtonClick = () => {
        setEditUserFormOpen(true);
    }

    const handleActivateAccountButtonClick = () => {
        activateEmail(selectedUserEmail,
            () => {
                setSuccessSnakbarText(localString.account_activated)
                setTriedGetData(false)
            }, () => {
                setFailSnakbarText(localString.opps)
            })
    }

    const handleGridRowClick = (params: GridRowParams<any>) => {
        setSelectedUserEmail(params.row.email)
        setSelectedUsername(params.row.name)
    }

    const handleEditUserPasswordButtonClick = () => {
        setEditUserPasswordError('')
        if (!editUserPassword) {
            setEditUserPasswordError(localString.field_empty_error)
            return;
        }

        // Save to db
        updatePasswordAsAdmin(selectedUserEmail, editUserPassword,
            () => {
                setEditUserFormOpen(false);
                setSuccessSnakbarText(localString.change_pw_success)
            }, (e) => {
                setFailSnakbarText(localString.opps)
            })
    }

    const handleEditUserSaveButtonClick = () => {
        // Save the user data to db

    }

    const handleGridRowDoubleClick = (params: GridRowParams<any>) => {
        setSelectedUserEmail(params.row.email)
        setSelectedUsername(params.row.name)

        getUser({ email: selectedUserEmail }, user => {

        })
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

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    {
                        loading ? (
                            <CircularProgress sx={{ margin: '10%' }} />
                        ) : (
                            loadingError ? (
                                <Typography>
                                    {loadingError}
                                </Typography>
                            ) : (
                                <DataGrid
                                    onRowClick={handleGridRowClick}
                                    onRowDoubleClick={handleGridRowDoubleClick}
                                    autoHeight
                                    columns={columns}
                                    rows={users}
                                    getRowId={(r) => r.email}
                                    experimentalFeatures={{ newEditingApi: true }}
                                />
                            )
                        )
                    }
                </CardContent>
                <CardActions>
                    <IconButton
                        onClick={() => {
                            setTriedGetData(false)
                        }}
                    >
                        <AutorenewIcon />
                    </IconButton>

                    {
                        selectedUserEmail && (
                            <React.Fragment>
                                <Button variant='contained' onClick={handleChangePWButtonClick}>
                                    {localString.change_password}
                                </Button>

                                <Button
                                    variant='contained'
                                    onClick={() => navigate(`${LayoutPath.user}/${selectedUsername}`)}>
                                    {localString.edit_profile}
                                </Button>

                                <Button
                                    variant='contained'
                                    onClick={handleActivateAccountButtonClick}>
                                    {localString.activate_account}
                                </Button>
                            </React.Fragment>
                        )
                    }
                </CardActions>
            </Card>

            {/* The dialog that pops up when clicked on the edit button */}
            {/* <Dialog
                open={editUserFormOpen}
                onClose={() => setEditUserFormOpen(false)}
            >
                <DialogTitle>{localString.edit_user}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label={localString.username}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label={localString.school}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label={localString.programme}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label={localString.status}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleEditUserSaveButtonClick}
                    >
                        {localString.confirm}
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => setEditUserFormOpen(false)}
                    >
                        {localString.cancel}
                    </Button>
                </DialogActions>
            </Dialog> */}

            <Dialog
                open={editUserFormOpen}
                onClose={() => setEditUserFormOpen(false)}
            >
                <DialogTitle>{localString.change_password}</DialogTitle>
                <DialogContent>
                    <TextField
                        type='password'
                        value={editUserPassword}
                        error={Boolean(editUserPasswordError)}
                        helperText={editUserPasswordError}
                        onChange={(e) => setEditUserPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleEditUserPasswordButtonClick}
                    >
                        {localString.confirm}
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => {
                            setEditUserFormOpen(false)
                            setEditUserPassword('')
                        }}
                    >
                        {localString.cancel}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar will be the indicator of server responses */}
            <Snackbar open={Boolean(successSnakbarText)} autoHideDuration={6000} onClose={handleSuccessSnackbarClose}>
                <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {localString.change_pw_success}
                </Alert>
            </Snackbar>
            <Snackbar open={Boolean(failSnakbarText)} autoHideDuration={6000} onClose={handleErrorSnackbarClose}>
                <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {localString.server_unavailable_error}
                </Alert>
            </Snackbar>
        </React.Fragment >
    )
}

export default UserManagePage