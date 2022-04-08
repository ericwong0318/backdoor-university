import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../App/contexts"
import { LayoutPath } from "../../Constants/RoutePaths";

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