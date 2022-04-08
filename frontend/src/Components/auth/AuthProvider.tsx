import React, { useState } from 'react'
import * as auth from '../../auth'

interface IUser {
    email: string
}

// Authentication Global Context
interface IAuthContext {
    user: IUser | null
    login: (email: string, password: string, successCallback?: () => void, failedCallback?: (err: auth.ILoginErrorParameter) => void) => void;
    logout: (callback?: VoidFunction) => void;
}

let AuthContext = React.createContext<IAuthContext>(null!)
export const useAuth = () => React.useContext(AuthContext)


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const login = (email: string, password: string, successCallback?: () => void, failedCallback?: (err: auth.ILoginErrorParameter) => void): void => {
        auth.login(email, password, () => {
            setUser({ email: email });
            if (successCallback)
                successCallback();
        },
            failedCallback)
    }

    const logout = (callback?: VoidFunction): void => {
        auth.logout();
        setUser(null);
        if (callback)
            callback();
    }

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;