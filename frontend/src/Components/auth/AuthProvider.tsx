import React, { useState } from 'react'
import { IAdmin, IUser, UserRoleEnum } from '../../App/interfaces';
import * as auth from '../../auth'

// Authentication Global Context
interface IAuthContext {
    user: IUser | IAdmin | null,
    role: UserRoleEnum | null,
    login: (email: string, password: string, successCallback?: () => void, failedCallback?: (err: auth.ILoginErrorParameter) => void) => void;
    attemptAutoLogin: () => void;
    canAutoLogin: () => boolean;
    rememberLoginInfo: (email: string, password: string) => void;
    logout: (callback?: VoidFunction) => void;
}

let AuthContext = React.createContext<IAuthContext>(null!)
export const useAuth = () => React.useContext(AuthContext)


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | IAdmin | null>(null);
    const [role, setRole] = useState<UserRoleEnum | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
    const [attemptedAutoLogin, setAttemptedAutoLogin] = useState(false);

    const login = (email: string, password: string, successCallback?: () => void, failedCallback?: (err: auth.ILoginErrorParameter) => void): void => {
        if (isLoggingIn)
            return;

        setIsLoggingIn(true);
        auth.login(email, password, (data) => {
            setUser(data.user);
            setRole(data.role);
            setIsLoggingIn(false)
            setAttemptedAutoLogin(false)
            if (successCallback)
                successCallback();
        },
            err => {
                setIsLoggingIn(false)
                if (failedCallback)
                    failedCallback(err);
            })
    }

    const logout = (callback?: VoidFunction): void => {
        auth.logout();
        setUser(null);
        setRole(null);
        setAttemptedAutoLogin(false)
        if (callback)
            callback();
    }

    const canAutoLogin = () => {
        return !isLoggingIn && !user && !attemptedAutoLogin
    }


    const attemptAutoLogin = () => {
        if (isLoggingIn)
            return;

        let email = sessionStorage.getItem('email')
        let password = sessionStorage.getItem('password')

        if (!email)
            email = localStorage.getItem('email');
        if (!password)
            password = localStorage.getItem('password');

        if (email && password) {
            login(email, password, () => { }, () => setAttemptedAutoLogin(true))
        }
    }

    const rememberLoginInfo = (email: string, password: string) => {
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
    }

    const value = { user, role, login, attemptAutoLogin, canAutoLogin, rememberLoginInfo, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;