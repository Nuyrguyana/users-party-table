import React, { useEffect, useState } from 'react';
import api from '../../api';
import SearchStatus from './searchStatus';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import PropTypes from 'prop-types';
import UsersTable from './usersTable';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import User from '../layout/user';
import SearchBar from './searchBar';

const UsersMainComponent = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
    const pageSize = 8;
    const params = useParams();
    // const { search } = window.location;
    // const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState();
    const { userId } = params;

    useEffect(() => {
        api.users.default
            .fetchAll()
            .then((data) => setUsers(data));
    }, []);

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions
            .fetchAll()
            .then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const filterUsers = (users, query) => {
        console.log('users', users);
        console.log('query', query);
        if (!query) {
            return users;
        }
        return users.filter((user) => {
            const userName = user.name.toLowerCase();
            return userName.includes(query);
        });
    };

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    if (userId) {
        return <User id = {userId}/>;
    } else {
        if (users.length > 0) {
            const filteredBySearchUsers = filterUsers(users, searchQuery);
            let filteredByProfessionsUsers;
            if (selectedProf) {
                filteredByProfessionsUsers = users.filter((user) => user.profession === selectedProf);
            } else {
                filteredByProfessionsUsers = filteredBySearchUsers;
            }
            let count = filteredByProfessionsUsers.length;
            const sortedUsers = _.orderBy(filteredByProfessionsUsers, [sortBy.path], [sortBy.order]);
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
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        <UsersTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookMark={handleToggleBookMark}
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
                    {/* <SearchBar */}
                    {/*    searchQuery={searchQuery} */}
                    {/*    setSearchQuery={setSearchQuery} */}
                    {/* /> */}
                    {renderUsersTable()}

                </div>
            );
        } else {
            return 'loading...';
        }
    }
};
UsersMainComponent.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default UsersMainComponent;
