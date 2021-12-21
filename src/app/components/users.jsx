import React, { useEffect, useState } from 'react';
import api from '../../api';
import SearchStatus from './searchStatus';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [count, setCount] = useState(users.length);
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf ? users.filter((user) => user.profession === selectedProf) : users;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
        renderPhrase();
    };

    const getBadgeClasses = () => {
        let classes = 'badge m-2 ';
        classes += count === 0 ? 'bg-danger' : 'bg-primary';
        return classes;
    };
    const renderPhrase = () => {
        setCount((prevState) => prevState - 1);
    };
    const renderUsersTable = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                    </tr>
                </thead>
                <tbody>
                    {userCrop.map((user) => (
                        <User
                            onDelete={handleDelete}
                            {...user}
                            key={user._id}
                        />
                    ))}
                </tbody>
            </table>
        );
    };

    if (count === 0) {
        return <span className={getBadgeClasses()}>{SearchStatus(users)}</span>;
    }

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    return (
        <>
            <span className={getBadgeClasses()}>{SearchStatus(users)}</span>
            {professions && <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
            />
            }
            {renderUsersTable()}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};
export default Users;
