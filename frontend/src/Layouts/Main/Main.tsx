import React from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import { LayoutPath } from '../../Constants/RoutePaths';
import SignIn from '../../signin';
import HomePage from './HomePage/HomePage';
import NewsPage from './NewsPage/NewsPage';
import ProgrammePage from './ProgrammePage/ProgrammePage';
import StatisticsPage from './StatisticsPage/StatisticsPage';
import TipsPage from './TipsPage/TipsPage';

interface MainProps {

}

const Main = (props: MainProps) => {


    return (
        <React.Fragment>
            <Routes>
                <Route path={LayoutPath.home} element={<HomePage />} />
                <Route path={LayoutPath.tips} element={<TipsPage />} />
                <Route path={LayoutPath.news} element={<NewsPage />} />
                <Route path={LayoutPath.programme} element={<ProgrammePage />} />
                <Route path={LayoutPath.statistics} element={<StatisticsPage />} />
            </Routes>
        </React.Fragment>
    )
}

export default Main;