import { Avatar, Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'
import { IUser } from '../../../../../App/interfaces'
import { UserProfileLocalizationStrings as localString } from '../../../../../Localizations/UserProfileLocalizationStrings'


interface IProgrammeCard {
    user: IUser
}

const ProgrammeCard = (props: IProgrammeCard) => {
    const user = props.user;

    return (
        <Card>
            <CardHeader title={localString.programme} />
            <CardContent>

            </CardContent>
        </Card>
    )
}

export default ProgrammeCard;