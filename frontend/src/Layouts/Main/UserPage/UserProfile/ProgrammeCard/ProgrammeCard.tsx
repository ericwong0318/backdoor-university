import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { IUser } from '../../../../../App/interfaces'
import { LanguageContext } from '../../../../../Components/LanguageProvider/LanguageProvider'


interface IProgrammeCard {
    user: IUser
}

const ProgrammeCard = (props: IProgrammeCard) => {
    const { localString } = useContext(LanguageContext)

    const user = props.user;

    const renderProgType = (type: string) => {
        switch (type) {
            case 'undergrad':
                return localString.undergrad;
            case 'asso':
                return localString.asso
            case 'hd':
                return localString.hd

            default:
                return "?"
        }
    }

    return (
        <Card>
            <CardHeader title={localString.programme_cat} />
            <CardContent>
                <Grid container>
                    {/* Programme */}
                    <Grid item xs={3} md={3} lg={3}>
                        <Typography>
                            {localString.programme_cat}:
                        </Typography>
                    </Grid>
                    <Grid item xs={9} md={9} lg={9}>
                        <Typography >
                            {user.programme}
                        </Typography>
                    </Grid>

                    {/* Type */}
                    <Grid item xs={3} md={3} lg={3}>
                        <Typography>
                            {localString.prog_type}:
                        </Typography>
                    </Grid>
                    <Grid item xs={9} md={9} lg={9}>
                        <Typography >
                            {renderProgType(user.type)}
                        </Typography>
                    </Grid>

                    {/* Admission Year */}
                    <Grid item xs={3} md={3} lg={3}>
                        <Typography>
                            {localString.admission_year}:
                        </Typography>
                    </Grid>
                    <Grid item xs={9} md={9} lg={9}>
                        <Typography >
                            {user.admissionYear?.toString()}
                        </Typography>
                    </Grid>

                    {/* CGPA */}
                    <Grid item xs={3} md={3} lg={3}>
                        <Typography>
                            {localString.cgpa}:
                        </Typography>
                    </Grid>
                    <Grid item xs={9} md={9} lg={9}>
                        <Typography >
                            {user.cgpa}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ProgrammeCard;