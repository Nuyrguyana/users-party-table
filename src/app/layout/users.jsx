import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage/userPage';
import UsersMainComponent from '../components/page/userListPage/usersMainComponent';

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>
        {userId ? <UserPage userId={userId} /> : <UsersMainComponent />}
    </>;
};

export default Users;
