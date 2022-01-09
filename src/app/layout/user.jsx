import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../api';
const User = ({ id }) => {
    console.log(id);
    const [user, setUser] = useState();
    const history = useHistory();

    const handleAllUsers = () => {
        history.push('/users');
    };

    useEffect(() => {
        api.users.default
            .getById(id)
            .then((data) => setUser(data));
    }, []);
    console.log('user', user);
    if (user) {
        return <>
            <h2>{user.name}</h2>
            <h3>user profession</h3>
            <h4>user qualities</h4>
            <h5>user completedMeeting</h5>
            <h3>user rate</h3>
            <button onClick={() => { handleAllUsers(); }}>
            Все пользователи
            </button>
        </>;
    } else {
        return 'Loading...';
    }
};
User.propTypes = {
    id: PropTypes.string.isRequired
};
export default User;
