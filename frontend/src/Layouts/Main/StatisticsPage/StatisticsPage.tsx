import React from 'react';

import SpecProgChart from "./SpecProgChart";
const SpecStat = () => <SpecProgChart />;

interface IStatisticsPageProps {

}

const StatisticsPage = (props: IStatisticsPageProps) => {

    return (
        <React.Fragment>
            <h1>StatisticsPage</h1>
            <SpecStat/>
        </React.Fragment>
    )
}

export default StatisticsPage;