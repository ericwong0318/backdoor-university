import { Card, CardContent, Typography } from '@mui/material'
import { GridColDef, DataGrid } from '@mui/x-data-grid'
import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../../../../../Components/LanguageProvider/LanguageProvider'
import { getAllProgramme, getAllUser } from '../../../../../../features/services'


const ProgrammeManagePage = () => {
    const { localString } = useContext(LanguageContext)

    const [triedGetData, setTriedGetData] = useState(false)
    const [programmes, setProgrammes] = useState<any[]>([])
    const [loadingError, setLoadingError] = useState("");

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 240 },
        { field: 'programme', headerName: localString.programme, width: 240 },
        { field: 'info', headerName: localString.prog_info, width: 360 },
        { field: 'school', headerName: localString.school, width: 90 },
        // { field: 'comments', headerName: localString.comments, width: 240 },
        { field: 'type', headerName: localString.prog_type, width: 120 },
    ]

    useEffect(() => {
        if (!triedGetData) {
            getAllProgramme((p) => {
                console.log(p)
                setProgrammes(p)
                setLoadingError('')
            }, () => {
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
                        (loadingError) ? (
                            <Typography>
                                {loadingError}
                            </Typography>
                        ) : (
                            <DataGrid
                                autoHeight
                                columns={columns}
                                rows={programmes}
                                getRowId={(r) => r.programme} />
                        )
                    }
                </CardContent>
            </Card>
        </React.Fragment>
    )
}


export default ProgrammeManagePage;