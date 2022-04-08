import { Grid } from '@mui/material'
import React from 'react'

interface IAdminDashboardProps {
    user: any
}

const dummyUser = {
    email: "admin@admin.com",
    username: "admin",
}

const AdminDashboard = (props: IAdminDashboardProps) => {
    // check for authentication and lead them to the login page

    return (
        <React.Fragment>
            <Grid container >

            </Grid>
        </React.Fragment>
    )
}

export default AdminDashboard;