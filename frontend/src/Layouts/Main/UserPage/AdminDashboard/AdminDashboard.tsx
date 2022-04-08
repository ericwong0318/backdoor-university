import { Grid } from '@mui/material'
import React from 'react'

interface IAdminDashboardProps {
    user: any
}

const AdminDashboard = (props: IAdminDashboardProps) => {
    // TODO: check for authentication and lead them to the error page

    return (
        <React.Fragment>
            <Grid >

            </Grid>
        </React.Fragment>
    )
}

export default AdminDashboard;