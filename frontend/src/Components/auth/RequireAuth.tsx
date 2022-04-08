import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LayoutPath } from '../../App/constants';
import { useAuth } from "./AuthProvider";

// Components within are quired to login before accessing it.
const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to={LayoutPath.login} state={{ from: location }} replace />
    }

    return children;
}

export default RequireAuth;