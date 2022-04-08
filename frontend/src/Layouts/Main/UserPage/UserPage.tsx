/*
    The user page will route between the admin page and the user profile base on the user type.
*/

import React from 'react'
import RequireAuth from '../../../Components/requireAuth/RequireAuth'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import UserProfile from './UserProfile/UserProfile'

interface IUserPageProps {
    user: any
}

const UserPage = (props: IUserPageProps) => {
    const isAdmin = (props?.user?.role === "admin")

    return (
        <RequireAuth>
            {isAdmin ? (
                <AdminDashboard user={props.user} />
            ) : (
                <UserProfile user={props.user} />
            )}
        </RequireAuth>
    )
}