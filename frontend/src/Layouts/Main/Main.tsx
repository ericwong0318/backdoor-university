/*
    This file contained the definition of <Main />.
    The main page should mainly contain the routing implementation of the website.

    To add a page into the website's routing, add the following line inside <Routes></Routes>:
        <Route path={path} element={<LayoutComponent/>}/>

    The path should be defined in the object LayoutPath of constants.ts for generality.
*/

import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NewsPage from './NewsPage/NewsPage';
import ProgrammePage from './ProgrammePage/ProgrammePage';
import StatisticsPage from './StatisticsPage/StatisticsPage';
import TipsPage from './TipsPage/TipsPage';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Login from './Login/Login';
import Register from './Register/Register';
import NotFound from './404/404';
import { LayoutPath } from '../../App/constants';
import AdminDashboard from './UserPage/AdminPage/AdminDashboard/AdminDashboard';
import UserProfile from './UserPage/UserProfile/UserProfile';
import ProgramDetail from './StatisticsPage/ProgramDetail';
import GamePage from './GamePage/GamePage';
import RequireAuth from '../../Components/auth/RequireAuth';
import Activation from '../Activation/Activation';
import RequireAdminAuth from '../../Components/auth/RequireAdminAuth';

interface IMainProps {

}

const Main = (props: IMainProps) => {
    return (
        <React.Fragment>
            <Routes>
                <Route path={LayoutPath.home} element={<HomePage />} />
                <Route path={LayoutPath.tips} element={<TipsPage />} />
                <Route path={LayoutPath.news} element={<NewsPage />} />
                <Route path={LayoutPath.programme} element={<ProgrammePage />} />
                <Route path={LayoutPath.statistics} element={<StatisticsPage />} />

                <Route path={LayoutPath.programme} element={<ProgramDetail />} >
                    <Route path={":id"} element={<ProgramDetail />} />
                </Route>

                <Route path={LayoutPath.login} element={<Login />} />
                <Route path={LayoutPath.register} element={<Register />} />
                <Route path={LayoutPath.forgotpassword} element={<ForgotPassword />} />

                <Route path={LayoutPath.games} element={<RequireAuth><GamePage /></RequireAuth>} />

                <Route path={`${LayoutPath.user}/:username`} element={<UserProfile />} />
                <Route path={`${LayoutPath.admin}`} element={<RequireAdminAuth><AdminDashboard /></RequireAdminAuth>} />
                <Route path={`${LayoutPath.activate}/:email`} element={<Activation />} />
                <Route path={LayoutPath.default} element={<NotFound />} />
            </Routes>

        </React.Fragment>
    )
}

export default Main;
