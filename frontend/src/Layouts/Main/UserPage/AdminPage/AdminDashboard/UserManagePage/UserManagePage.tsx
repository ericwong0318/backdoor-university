import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { getAllProgramme, getAllUser } from '../../../../../../features/services'
import { LanguageContext } from '../../../../../../Components/LanguageProvider/LanguageProvider'
import { Card, CardContent, Paper, Typography } from '@mui/material'

interface IUserManagePageProps {

}

const UserManagePage = (props: IUserManagePageProps) => {
    const { localString } = useContext(LanguageContext)

    const [triedGetData, setTriedGetData] = useState(false)
    const [users, setUsers] = useState<any[]>([])
    const [loadingError, setLoadingError] = useState("");

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
            </Card>
        </React.Fragment>
    )
}

export default UserManagePage