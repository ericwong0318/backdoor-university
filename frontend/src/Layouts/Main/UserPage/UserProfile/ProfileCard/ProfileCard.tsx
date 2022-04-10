import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
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
                <Grid container spacing={10}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography>
                            <Avatar sx={{ width: "120px", height: "120px" }} alt={user.name} src={user.photo} />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography>
                            {localString.username}: {user.name}
                        </Typography>
                        <Typography>
                            {localString.email}: {user.email}
                        </Typography>
                        <Typography>
                            {localString.username}: {user.name}
                        </Typography>
                        <Typography>
                            {localString.username}: {user.name}
                        </Typography>
                    </Grid>
                </Grid>


            </CardContent>
        </Card>
    )
}

export default ProfileCard;