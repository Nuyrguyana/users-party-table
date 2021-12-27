import React, { useEffect, useState } from 'react';
import api from '../../api';
import SearchStatus from './searchStatus';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import PropTypes from 'prop-types';
import UsersTable from './usersTable';
import _ from 'lodash';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
    const pageSize = 8;

    useEffect(() => {
        api.users.default
            .fetchAll()
            .then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        api.professions
            .fetchAll()
            .then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    console.log(users);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    const filteredUsers = selectedProf ? users.filter((user) => user.profession === selectedProf) : users;
    let count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                <UsersTable
                    users={userCrop}
                    handleDelete={handleDelete}
                    onSort={handleSort}
                    currentSort={sortBy}
                />
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
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default Users;
