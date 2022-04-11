import { Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { IUser } from '../../../../../App/interfaces'
import { AppLocalizedStrings as localString } from '../../../../../App/localization'
import { useAuth } from '../../../../../Components/auth/AuthProvider'


interface IOffersCard {
    user: IUser
}

const OffersCard = (props: IOffersCard) => {
    const user = props.user;
    const auth = useAuth();

    return (
        <Card>
            <CardHeader title={localString.offers} />
            <CardContent>
                <Grid container>
                    {/* Offers */}
                    {/* {
                        offer.map(o=>{
                            return (
                                
                            )
                        })} */}

                    {
                        (user.offer && user.offer?.length) ? (
                            <></>
                        ) : (
                            <Typography>
                                {
                                    auth.user && auth.user.email === user.email ?
                                        localString.you_no_offer : localString.user_has_no_offer
                                }
                            </Typography>
                        )
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}

export default OffersCard;