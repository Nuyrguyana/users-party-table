import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../api';
import Quality from '../components/qualitie';
const UserCard = ({ id }) => {
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
            <h3>{user.profession.name}</h3>
            {user.qualities.map((qual) => (<Quality key={qual._id} {...qual} />))}
            <h5>completedMeetings: {user.completedMeetings}</h5>
            <h3>rate: {user.rate}</h3>
            <button onClick={() => { handleAllUsers(); }}>
            Все пользователи
            </button>
        </>;
    } else {
        return 'Loading...';
    }
};
UserCard.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserCard;
