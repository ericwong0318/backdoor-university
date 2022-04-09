import { Box, Card, CardContent, CardHeader, Container, Grid } from '@mui/material'
import { height } from '@mui/system'
import React, { useRef } from 'react'
import { IProgramme, IUser } from '../../../../App/interfaces'
import OffersCard from './OfferCard/OffersCard'
import ProfileCard from './ProfileCard/ProfileCard'
import ProgrammeCard from './ProgrammeCard/ProgrammeCard'
import SideMenu from './SideMenu/SideMenu'

interface IUserProfileProps {
    user: IUser | null
}
const dummyUser: IUser = {
    email: 'dummy@email.com',
    name: 'dummy',
    photo: 'https://randomuser.me/api/portraits/men/56.jpg',
    school: 'ZUHK',
    programme: 'Computer Building',
    type: 'undergrad',
    admissionYear: 2024,
    cgpa: 0.13,
    exam: {
        name: "Hong Kong Don't Speak English",
        result: 'Totally failed'
    },
    status: 'unverified',
    offer: {
        programme: {
            school: 'MIT',
            programme: 'Introduction to Toilet Washing',
            type: 'asso',
            info: 'You learn how to clean up your toilet',
            comments: [],
            subjects: [],
            interviews: undefined
        }
    }
}
const UserProfile = (props: IUserProfileProps) => {
    const user = props.user ? props.user : dummyUser;

    const refProfile = useRef(null);
    const refProg = useRef(null);
    const refOffer = useRef(null);

    return (
        <React.Fragment>

            <Container sx={{ marginTop: '6%' }}>
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
                        <Grid item xs={12} md={8} lg={9} ref={refProfile}>
                            <ProfileCard user={user} />
                        </Grid>


                        {/* Programme Card */}
                        <Grid item xs={12} md={8} lg={9}>
                            <ProgrammeCard user={user} />
                        </Grid>

                        {/* Offer Card */}
                        <Grid item xs={12} md={8} lg={9}>
                            <OffersCard user={user} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default UserProfile;