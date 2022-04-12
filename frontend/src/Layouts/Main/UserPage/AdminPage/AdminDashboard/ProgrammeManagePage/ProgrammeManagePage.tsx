import { Alert, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import { GridColDef, DataGrid, GridRowParams } from '@mui/x-data-grid'
import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../../../../../Components/LanguageProvider/LanguageProvider'
import { addNewProgramme, getAllProgramme, updateProgramme, UpdateProgrammeErrorType } from '../../../../../../features/services'
import AutorenewIcon from '@mui/icons-material/Autorenew';

const ProgrammeManagePage = () => {
    const { localString } = useContext(LanguageContext)

    // Data loading
    const [triedGetData, setTriedGetData] = useState(false)
    const [programmes, setProgrammes] = useState<any[]>([])
    const [loadingError, setLoadingError] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Data Grid Columns
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 240 },
        { field: 'programme', headerName: localString.programme, width: 240 },
        { field: 'info', headerName: localString.prog_info, width: 360 },
        { field: 'school', headerName: localString.school, width: 90 },
        // { field: 'comments', headerName: localString.comments, width: 240 },
        { field: 'type', headerName: localString.prog_type, width: 120 },
    ]

    // Data control
    const [selectedProgName, setSelectedProgName] = useState('')
    const [selectedProgSchool, setSelectedProgSchool] = useState('')
    const [selectedProgType, setSelectedProgType] = useState('')
    const [selectedProgInfo, setSelectedProgInfo] = useState('')

    // Data Editing
    const [editProgName, setEditProgName] = useState('')
    const [editProgSchool, setEditProgSchool] = useState('')
    const [editProgType, setEditProgType] = useState('')
    const [editProgInfo, setEditProgInfo] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    // Data Editing Error
    const [editProgNameError, setEditProgNameError] = useState('')
    const [editProgSchoolError, setEditProgSchoolError] = useState('')
    const [editProgTypeError, setEditProgTypeError] = useState('')
    const [editProgInfoError, setEditProgInfoError] = useState('')


    // UI control
    const [editProgFormTitle, setEditProgFormTitle] = useState('')

    // Server feedback
    const [successSnakbarText, setSuccessSnakbarText] = useState('')
    const [failSnakbarText, setFailSnakbarText] = useState('')

    // Event handling
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

    const handleEditFormSaveButtonClick = () => {
        let error = false;
        setEditProgNameError('')
        setEditProgSchoolError('')
        setEditProgTypeError('')
        setEditProgInfoError('')

        // Null guard
        if (!editProgName) {
            setEditProgNameError(localString.field_empty_error)
            error = true;
        }

        if (!editProgInfo) {
            setEditProgInfoError(localString.field_empty_error)
            error = true;
        }

        if (!editProgSchool) {
            setEditProgSchoolError(localString.field_empty_error)
            error = true;
        }

        if (!editProgType) {
            setEditProgTypeError(localString.field_empty_error)
            error = true;
        }

        // Error breakpoint
        if (error)
            return;

        if (!isEdit) {
            // Add new programme
            setSaving(true)
            addNewProgramme(editProgName, editProgSchool, editProgType, editProgInfo,
                () => {
                    // Success
                    setSuccessSnakbarText(localString.prog_update_success_msg)
                    setSaving(false)
                    setTriedGetData(false)
                    setEditProgFormTitle('')
                }, (err: UpdateProgrammeErrorType) => {
                    // Fail
                    setSaving(false)
                    setFailSnakbarText(localString.opps)
                })
        } else {
            // Edit programme
            setSaving(true)
            // send out to backend
            updateProgramme(selectedProgSchool, selectedProgName,
                editProgSchool, editProgName, editProgType, editProgInfo,
                () => {
                    // Success
                    setSuccessSnakbarText(localString.prog_update_success_msg)
                    setSaving(false)
                    setTriedGetData(false)
                    setEditProgFormTitle('')
                }, (err: UpdateProgrammeErrorType) => {
                    // Fail
                    setSaving(false)
                    setFailSnakbarText(localString.opps)
                })
        }
    }

    const handleEditFormCancelButtonClick = () => {
        setEditProgFormTitle('')
        setEditProgNameError('')
        setEditProgSchoolError('')
        setEditProgTypeError('')
        setEditProgInfoError('')
    }

    const handleAddButtonClick = () => {
        setIsEdit(false)
        setEditProgFormTitle(localString.add_prog)
        setEditProgName('')
        setEditProgInfo('')
        setEditProgSchool('')
        setEditProgType('')
    }

    const handleEditProgButtonClick = () => {
        setEditProgFormTitle(localString.edit_prog)
        setEditProgName(selectedProgName)
        setEditProgInfo(selectedProgInfo)
        setEditProgSchool(selectedProgSchool)
        setEditProgType(selectedProgType)
        setIsEdit(true)
    }

    const handleGridRowClick = (params: GridRowParams<any>) => {
        setSelectedProgName(params.row.programme)
        setSelectedProgInfo(params.row.info)
        setSelectedProgSchool(params.row.school)
        setSelectedProgType(params.row.type)
        setEditProgName(params.row.programme)
        setEditProgInfo(params.row.info)
        setEditProgSchool(params.row.school)
        setEditProgType(params.row.type)
    }

    const handleGridRowDoubleClick = (params: GridRowParams<any>) => {
        setEditProgFormTitle(localString.edit_prog)
    }

    useEffect(() => {
        if (!triedGetData) {
            getAllProgramme((p) => {
                setProgrammes(p)
                setLoading(false)
                setLoadingError('')
            }, () => {
                setLoading(false)
                setLoadingError(localString.get_programme_error)
            }
            );
            setTriedGetData(true);
        }
    })

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
                                    rows={programmes}
                                    getRowId={(r) => r.programme}
                                    experimentalFeatures={{ newEditingApi: true }}
                                />
                            )
                        )
                    }
                </CardContent>
                <CardActions>

                    {/* Refresh button */}
                    <IconButton
                        onClick={() => {
                            setTriedGetData(false)
                        }}
                    >
                        <AutorenewIcon />
                    </IconButton>

                    {/* Add button */}
                    <Button
                        variant='contained'
                        onClick={handleAddButtonClick}>
                        {localString.add_prog}
                    </Button>

                    {/* Edit Button */}
                    {
                        selectedProgName && (
                            <React.Fragment>
                                <Button variant='contained'
                                    onClick={handleEditProgButtonClick}>
                                    {localString.edit_prog}
                                </Button>
                            </React.Fragment>
                        )
                    }
                </CardActions>
            </Card>

            <Dialog
                open={Boolean(editProgFormTitle)}
                onClose={() => setEditProgFormTitle('')}
            >
                <DialogTitle>{editProgFormTitle}</DialogTitle>
                <DialogContent>
                    <Typography>
                        <TextField
                            label={localString.programme}
                            value={editProgName}
                            error={Boolean(editProgNameError)}
                            helperText={editProgNameError}
                            sx={{ margin: "5px" }}
                            fullWidth
                            onChange={(e) => setEditProgName(e.target.value)}
                        />
                    </Typography>
                    <Typography>
                        <TextField
                            label={localString.school}
                            value={editProgSchool}
                            error={Boolean(editProgSchoolError)}
                            helperText={editProgSchoolError}
                            sx={{ margin: "5px" }}
                            fullWidth
                            onChange={(e) => setEditProgSchool(e.target.value)}
                        />
                    </Typography>
                    <Typography>
                        <Select
                            defaultValue={'undergrad'}
                            fullWidth
                            value={editProgType}
                            error={Boolean(editProgTypeError)}
                            label={localString.prog_type}
                            onChange={e => setEditProgType(e.target.value)}
                        >
                            <MenuItem value={'undergrad'}>{localString.undergrad}</MenuItem>
                            <MenuItem value={'asso'}>{localString.asso}</MenuItem>
                            <MenuItem value={'hd'}>{localString.hd}</MenuItem>
                        </Select>
                    </Typography>
                    {editProgTypeError &&
                        <Typography sx={{ color: 'red' }}>
                            {editProgTypeError}
                        </Typography>}
                    <Typography>
                        <TextField
                            multiline
                            label={localString.prog_info}
                            value={editProgInfo}
                            error={Boolean(editProgInfoError)}
                            helperText={editProgInfoError}
                            sx={{ margin: "5px" }}
                            fullWidth
                            onChange={(e) => setEditProgInfo(e.target.value)}
                        />
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        disabled={Boolean(saving)}
                        onClick={handleEditFormSaveButtonClick}
                    >
                        {localString.confirm}
                    </Button>
                    <Button
                        variant="text"
                        disabled={Boolean(saving)}
                        onClick={handleEditFormCancelButtonClick}
                    >
                        {localString.cancel}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar will be the indicator of server responses */}
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
    )
}


export default ProgrammeManagePage;