import React from 'react';
import { useState } from 'react';

import './StatisticsPage.css'

import { useContext } from 'react';
import { LanguageContext } from '../../../Components/LanguageProvider/LanguageProvider';


import AllStat from "./AllStat";
import { data1 } from './SpecDataSet';
const GenStat = () => <AllStat />;

interface IStatisticsPageProps {

}

const StatisticsPage = (props: IStatisticsPageProps) => {

    const { localString } = useContext(LanguageContext)
    return (
        <React.Fragment>
            <h1> __ </h1>
            <h1 className="title" >{localString.StatisticsPage_Title}</h1>
            <GenStat />
        </React.Fragment>
    )
}

export default StatisticsPage;