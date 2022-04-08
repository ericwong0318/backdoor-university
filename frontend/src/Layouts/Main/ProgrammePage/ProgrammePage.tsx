import React from 'react';
import './ProgrammePage.css'


import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './listProgramme';
import ReactDOM from 'react-dom/client';

interface IProgrammePageProps {

}


const ProgrammePage = (props: IProgrammePageProps) => {

    return (
        <React.Fragment>
            <h1> Programmes </h1>
            <h2 className="title"> Programmes </h2>
            <StyledEngineProvider injectFirst>
                <Demo />
            </StyledEngineProvider>
            

        </React.Fragment>
    )
}





export default ProgrammePage;