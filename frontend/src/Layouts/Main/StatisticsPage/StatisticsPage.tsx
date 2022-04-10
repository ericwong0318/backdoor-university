import React from 'react';

import './StatisticsPage.css'

import AllStat from "./AllStat";
const GenStat = () => <AllStat />;

interface IStatisticsPageProps {

}

const StatisticsPage = (props: IStatisticsPageProps) => {

    return (
        <React.Fragment>
            <h1> __ </h1>
            <h1 className="title" >General non-JUPAS Admission Statistics</h1>
            <GenStat />
        </React.Fragment>
    )
}

export default StatisticsPage;