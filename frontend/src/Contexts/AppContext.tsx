import React from 'react'
import { LayoutPath } from '../Constants/RoutePaths';

interface IAppContext {
    path: string,
}

const defaultAppContext: IAppContext = {
    path: LayoutPath.home
}

const AppContext = React.createContext(defaultAppContext);

export default AppContext;