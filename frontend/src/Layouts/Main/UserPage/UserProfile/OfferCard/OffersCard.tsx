import { Avatar, Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'
import { IUser } from '../../../../../App/interfaces'
import { UserProfileLocalizationStrings as localString } from '../../../../../Localizations/UserProfileLocalizationStrings'


interface IOffersCard {
    user: IUser
}

const OffersCard = (props: IOffersCard) => {
    const user = props.user;

    return (
        <Card>
            <CardHeader title={localString.offers} />
            <CardContent>
            </CardContent>
        </Card>
    )
}

export default OffersCard;