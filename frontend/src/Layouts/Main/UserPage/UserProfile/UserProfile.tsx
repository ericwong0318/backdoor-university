import { Card, CardContent, CardHeader, CircularProgress, Container, Grid } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IUser } from '../../../../App/interfaces'
import { LanguageContext } from '../../../../Components/LanguageProvider/LanguageProvider'
import { getUser, GetUserErrorType } from '../../../../features/services'
import OffersCard from './OfferCard/OffersCard'
import ProfileCard from './ProfileCard/ProfileCard'
import SideMenu from './SideMenu/SideMenu'

interface IUserProfileProps {
}

const UserProfile = (props: IUserProfileProps) => {
    const { localString } = useContext(LanguageContext)

    // Data
    const param = useParams();

    // State
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const [triedLoadInfo, setTriedLoadInfo] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const [serverUnavailable, setServerUnavailable] = useState(false);

    // Ref
    const refProfile = useRef(null);
    const refProg = useRef(null);
    const refOffer = useRef(null);

    // Load user info
    useEffect(() => {
        if (!triedLoadInfo) {
            setTriedLoadInfo(true);
            getUser({ name: param.username }, (u) => {
                setUser(u);
                setIsLoadingInfo(false)
            }, (err) => {
                switch (err) {
                    case GetUserErrorType.NoUserFound:
                        setUserNotFound(true);
                        break;

                    case GetUserErrorType.ServerUnavailable:
                    case GetUserErrorType.Unknown:
                        setServerUnavailable(false);
                        break;
                }
                setIsLoadingInfo(false)
            })
        }
    })


    return (
        <React.Fragment>
            {!isLoadingInfo ?
                (
                    <React.Fragment>
                        <Container sx={{ marginTop: '6%' }}>
                            {
                                (userNotFound) ? (
                                    <Card sx={{ marginTop: '10%' }}>
                                        <CardHeader
                                            title={localString.user_not_found}
                                        />
                                    </Card>
                                ) : (
                                    <Grid container spacing={2}>
                                        <Grid container spacing={2} item xs={12} md={4} lg={3}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <Card >
                                                    <CardHeader />
                                                    <CardContent>
                                                        <SideMenu refs={[refProfile, refProg, refOffer]} />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} item xs={12} md={8} lg={9}>

                                            {/* Profile Card */}
                                            <Grid item xs={12} md={12} lg={12} ref={refProfile}>
                                                <ProfileCard user={user} />
                                            </Grid>

                                            {/* Offer Card */}
                                            <Grid item xs={12} md={12} lg={12}>
                                                {/* <OffersCard user={user} /> */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            }
                        </Container>
                    </React.Fragment>
                ) : (<CircularProgress sx={{ margin: '10%' }} />)
            }
        </React.Fragment>
    )
}

export default UserProfile;