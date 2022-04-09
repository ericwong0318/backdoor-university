import { Avatar, Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'
import { IUser } from '../../../../../App/interfaces'
import { UserProfileLocalizationStrings as localString } from '../../../../../Localizations/UserProfileLocalizationStrings'


interface IProfileCard {
    user: IUser
}

const ProfileCard = (props: IProfileCard) => {
    const user = props.user;

    return (
        <Card>
            <CardHeader title={localString.profile} />
            <CardContent>
                <Avatar sx={{ width: "120px", height: "120px" }} alt={user.name} src={user.photo} />
            </CardContent>
        </Card>
    )
}

export default ProfileCard;