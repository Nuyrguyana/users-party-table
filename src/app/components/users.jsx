import React, { useEffect, useState } from 'react';
import api from '../../api';
import SearchStatus from './searchStatus';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 2;
    useEffect(() => {
        api.professions
            .fetchAll()
            .then((data) =>
                setProfessions(
                    data
                )
            );
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf ? users.filter((user) => user.profession === selectedProf) : users;
    let count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
        count--;
    };

    const getBadgeClasses = () => {
        let classes = 'badge m-2 ';
        classes += count === 0 ? 'bg-danger' : 'bg-primary';
        return classes;
    };

    const renderUsersTable = () => {
        return (
            <div className='d-flex flex-column'>
                <span className={getBadgeClasses()}>{<SearchStatus length={count}/>}</span>

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
                <div className='d-flex justify-content-center'>
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        );
    };

    if (count === 0) {
        return <span className={getBadgeClasses()}>{SearchStatus(users)}</span>;
    }

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className='d-flex'>
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button className='btn btn-secondary mt-2' onClick={clearFilter}>Очистить</button>
                </div>
            )}
            {renderUsersTable()}

        </div>
    );
};
export default Users;
