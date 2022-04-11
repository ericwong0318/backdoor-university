import React from 'react'
import RequireAdminAuth from '../../../../Components/auth/RequireAdminAuth';
import AdminDashboard from './AdminDashboard/AdminDashboard';

interface IAdminPageProps {

}

const AdminPage = (props: IAdminPageProps) => {
    return (
        <RequireAdminAuth>
            <AdminDashboard />
        </RequireAdminAuth>
    )
}

export default AdminPage;