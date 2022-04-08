import React from 'react';

import SpecificStat from "./SpecificStat";
import GeneralStat from "./GeneralStat";

const SpecStat = () => <SpecificStat />;
const GenStat = () => <GeneralStat />

interface IStatisticsPageProps {

}

const StatisticsPage = (props: IStatisticsPageProps) => {

    return (
        <React.Fragment>
            <h1>StatisticsPage</h1>
            <SpecStat/>
            <GenStat/>
        </React.Fragment>
    )
}

export default StatisticsPage;