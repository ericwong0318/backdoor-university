import { Box, Card } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LayoutPath } from '../../../App/constants';
import { useAuth } from '../../../Components/auth/AuthProvider';

interface IGamePageProps {

}

const GamePage = (props: IGamePageProps) => {
    return (
        <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '7%'
        }}>
            <iframe frameBorder="0" src="https://itch.io/embed-upload/5581445?color=161616" width="640" height="660"><a href="https://zkwokleung.itch.io/spinning-puzzle">Play Spinning Puzzle on itch.io</a></iframe>
        </Box>
    )
}

export default GamePage;