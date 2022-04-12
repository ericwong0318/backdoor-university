import React from 'react';
import './ProgrammePage.css'

import ProgramList from './listProgramme'
import { StyledEngineProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { LanguageContext } from '../../../Components/LanguageProvider/LanguageProvider';

interface IProgrammePageProps {

}


const ProgrammePage = (props: IProgrammePageProps) => {

    const { localString } = useContext(LanguageContext)

    return (
        <React.Fragment>
            <h1> _ </h1>
            <h2 className="title"> {localString.ProgrammePage_Title} </h2>
            <h3 className="descript"> {localString.choose_programme_guide} </h3>
            <StyledEngineProvider injectFirst>

            </StyledEngineProvider>
            <ProgramList />

        </React.Fragment>
    )
}
export default ProgrammePage;
