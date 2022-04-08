import React from 'react'

interface IUserProfileProps {
    user: any
}

const UserProfile = (props: IUserProfileProps) => {
    const user = props.user;

    return (
        <React.Fragment>
            <div></div>
        </React.Fragment>
    )
}

export default UserProfile;