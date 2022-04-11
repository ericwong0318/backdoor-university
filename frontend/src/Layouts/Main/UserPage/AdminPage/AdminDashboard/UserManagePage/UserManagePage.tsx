import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { getAllProgramme, getAllUser } from '../../../../../../features/services'
import { LanguageContext } from '../../../../../../Components/LanguageProvider/LanguageProvider'
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField, Typography } from '@mui/material'

interface IUserManagePageProps {

}

const UserManagePage = (props: IUserManagePageProps) => {
    const { localString } = useContext(LanguageContext)

    const [triedGetData, setTriedGetData] = useState(false)
    const [users, setUsers] = useState<any[]>([])
    const [loadingError, setLoadingError] = useState("");
    const [editUserFormOpen, setEditUserFormOpen] = useState(false)

    const columns: GridColDef[] = [
        { field: 'email', headerName: localString.email, width: 240 },
        { field: 'name', headerName: localString.name, width: 140 },
        { field: 'school', headerName: localString.school, width: 90 },
        { field: 'programme', headerName: localString.programme, width: 240 },
        // { field: 'type', headerName: localString.prog_type, width: 120 },
        // { field: 'admissionYear', headerName: localString.admission_year, width: 120 },
        // { field: 'cgpa', headerName: localString.cgpa, width: 120 },
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
            }, () => {
                setLoadingError(localString.get_user_error)
            }
            );
            setTriedGetData(true);
        }
    })

    // Button click events
    const handleEditButtonClick = () => {
        setEditUserFormOpen(true);
    }

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    {
                        (loadingError) ? (
                            <Typography>
                                {loadingError}
                            </Typography>
                        ) : (
                            <DataGrid
                                autoHeight
                                columns={columns}
                                rows={users}
                                getRowId={(r) => r.email} />
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button variant='contained' onClick={handleEditButtonClick}>
                        {localString.edit}
                    </Button>
                </CardActions>
            </Card>
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
        </React.Fragment>
    )
}

export default UserManagePage