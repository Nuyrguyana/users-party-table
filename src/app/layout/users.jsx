import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/common/page/userPage/userPage';
import UsersMainComponent from '../components/usersMainComponent';

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>
        {userId ? <UserPage userId={userId} /> : <UsersMainComponent />}
    </>;
};

export default Users;
