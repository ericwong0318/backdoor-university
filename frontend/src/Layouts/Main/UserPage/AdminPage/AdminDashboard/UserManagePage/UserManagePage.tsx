import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRenderEditCellParams, GridRowParams } from '@mui/x-data-grid'
import { getAllUser, getUser } from '../../../../../../features/services'
import { LanguageContext } from '../../../../../../Components/LanguageProvider/LanguageProvider'
import { Alert, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, Typography } from '@mui/material'
import ProgTypeEditInputCell from './ProgTypeEditInputCell/ProgTypeEditInputCell'

interface IUserManagePageProps {

}

const renderProgTypeEditInputCell = (params: GridRenderEditCellParams<any, any, any>) => {
    return <ProgTypeEditInputCell {...params} />
}

const UserManagePage = (props: IUserManagePageProps) => {
    const { localString } = useContext(LanguageContext)

    const [loading, setLoading] = useState(true)
    const [triedGetData, setTriedGetData] = useState(false)
    const [users, setUsers] = useState<any[]>([])
    const [loadingError, setLoadingError] = useState("");
    const [editUserFormOpen, setEditUserFormOpen] = useState(false)
    const [selectedUserEmail, setSelectedUserEmail] = useState('')
    const [successSnakbarText, setSuccessSnakbarText] = useState('')
    const [failSnakbarText, setFailSnakbarText] = useState('')

    const columns: GridColDef[] = [
        { field: 'email', headerName: localString.email, width: 240 },
        { field: 'name', headerName: localString.name, width: 140 },
        { field: 'school', headerName: localString.school, width: 90 },
        { field: 'programme', headerName: localString.programme, width: 240 },
        { field: 'type', headerName: localString.prog_type, width: 240, renderEditCell: renderProgTypeEditInputCell },
        { field: 'status', headerName: localString.status, width: 90 },
    ]

    const handleEditUserSaveButtonClick = () => {
        // Save the user data to db

    }

    useEffect(() => {
        if (!triedGetData) {
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

    const handleGridRowClick = (params: GridRowParams<any>) => {
        setSelectedUserEmail(params.row.email)
    }

    const handleGridRowDoubleClick = (params: GridRowParams<any>) => {
        setSelectedUserEmail(params.row.email)
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
                    {
                        selectedUserEmail &&
                        <Button variant='contained' onClick={handleChangePWButtonClick}>
                            {localString.change_password}
                        </Button>
                    }
                </CardActions>
            </Card>

            {/* The dialog that pops up when clicked on the edit button */}
            <Dialog
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
            </Dialog>

            <Dialog
                open={editUserFormOpen}
                onClose={() => setEditUserFormOpen(false)}
            >
                <DialogTitle>{localString.change_password}</DialogTitle>
                <DialogContent>

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
        </React.Fragment>
    )
}

export default UserManagePage