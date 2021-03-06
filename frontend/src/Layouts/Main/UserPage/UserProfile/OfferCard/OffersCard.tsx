import { Avatar, Card, CardContent, CardHeader, CircularProgress, Divider, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { IUser } from '../../../../../App/interfaces'
import { useAuth } from '../../../../../Components/auth/AuthProvider'
import { LanguageContext } from '../../../../../Components/LanguageProvider/LanguageProvider'


interface IOffersCard {
    user?: IUser | null
}

const OffersCard = (props: IOffersCard) => {
    const { localString } = useContext(LanguageContext)
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
                        (props.user) ? (
                            <Typography>
                                {
                                    auth.user && auth.user.email === props.user.email ?
                                        localString.you_no_offer : localString.user_has_no_offer
                                }
                            </Typography>
                        ) : (
                            <CircularProgress />
                        )
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}

export default OffersCard;