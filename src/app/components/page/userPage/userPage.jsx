import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../../../api';
import Qualities from '../../ui/qualities/qualitiesList';

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const handleAllUsers = () => {
        history.push('/users');
    };

    useEffect(() => {
        api.users
            .getById(userId)
            .then((data) => setUser(data));
    }, []);

    if (user) {
        return <>
            <h2>{user.name}</h2>
            <h3>{user.profession.name}</h3>
            <Qualities qualities={user.qualities} />
            <h5>completedMeetings: {user.completedMeetings}</h5>
            <h3>rate: {user.rate}</h3>
            <button onClick={() => { handleAllUsers(); }}>
            Все пользователи
            </button>
            <Link to={`/users/${userId}/edit`} className="btn btn-primary">Изменить</Link>
        </>;
    } else {
        return 'Loading...';
    }
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
