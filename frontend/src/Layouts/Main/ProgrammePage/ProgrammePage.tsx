import React from 'react';
import './ProgrammePage.css'

import ProgramList from './listProgramme'
import { StyledEngineProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';

interface IProgrammePageProps {

}


const ProgrammePage = (props: IProgrammePageProps) => {

    return (
        <React.Fragment>
            <h1> _ </h1>
            <h2 className="title"> Programmes </h2>
            <StyledEngineProvider injectFirst>

            </StyledEngineProvider>
            <ProgramList />

        </React.Fragment>
    )
}
export default ProgrammePage;