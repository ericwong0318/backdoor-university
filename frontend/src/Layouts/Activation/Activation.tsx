import { Alert, AlertTitle, Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LayoutPath } from '../../App/constants';
import { LanguageContext } from '../../Components/LanguageProvider/LanguageProvider';
import { ActivateAccountErrorType, activateEmail } from '../../features/services';

const Activation = () => {
    const param = useParams();
    const [loading, setLoading] = useState(true)
    const [reqSent, setReqSent] = useState(false)
    const [activateError, setActivateError] = useState('')
    const { localString } = useContext(LanguageContext)

    useEffect(() => {
        if (!reqSent) {
            setReqSent(true)

            if (param.email) {
                activateEmail(param.email!, () => {
                    setLoading(false);
                }, (err => {
                    switch (err) {
                        case ActivateAccountErrorType.EmailNotRegisterd:
                            setActivateError(localString.email_unregistered_error)
                            break;

                        default:
                            setActivateError(localString.server_unavailable_error)
                            break;
                    }
                    setLoading(false)
                }))
            } else {
                setActivateError(localString.email_unregistered_error)
                setLoading(false)
            }
        }
    })

    if (loading) {
        return (
            <Paper>
                <Alert severity='info' sx={{ marginTop: "10%", textAlign: "left" }}>{localString.please_wait}</Alert>
            </Paper>
        )
    }

    return (
        <Paper>
            {activateError ? (
                <Alert severity='error' sx={{ marginTop: "10%", textAlign: "left" }}>{activateError}</Alert>
            ) : (
                < Alert severity='success' sx={{ marginTop: "10%", textAlign: "left" }}>
                    <AlertTitle >{localString.success}</AlertTitle>
                    {localString.account_activated_msg} - <Link to={LayoutPath.login}><strong>{localString.back_to_login}</strong></Link>
                </Alert>
            )}
        </Paper>
    )
}

export default Activation;