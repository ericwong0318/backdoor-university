import React from 'react'
import { LayoutPath } from '../Constants/RoutePaths';

interface IAppContext {
    path: string,
}

const defaultAppContext: IAppContext = {
    path: LayoutPath.home
}

export const AppContext = React.createContext(defaultAppContext);

// Authentication Global Context
interface IAuthContext {
    user: any
    login: (user: any, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}
let AuthContext = React.createContext<IAuthContext>(null!)
export const useAuth = () => React.useContext(AuthContext)
