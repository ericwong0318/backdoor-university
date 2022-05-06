/*
    This file contained the definition of the <RequireAuth/> component.
    Childs of this component are only accessible after the user has logged in.
    Otherwise, they will be directed to the login page if they are trying to access the childs without logging in.
    This component should be used along with react-router for better handling of the routing.

    Example:
        - To create a login-required route:
            <Route path={examplePath} element={<RequireAuth><ExampleComponent /></RequireAuth>} />
*/

import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LayoutPath } from '../../App/constants';
import { useAuth } from "./AuthProvider";

// Components within are quired to login before accessing it.
const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.user) {
            // Back to home if user logged out
            navigate(LayoutPath.login);
        }
    }, [auth.user])

    if (!auth.user) {
        return <Navigate to={LayoutPath.login} state={{ from: location }} replace />
    }

    return children;
}

export default RequireAuth;