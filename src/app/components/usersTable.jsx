import React from 'react';
import PropTypes from 'prop-types';
import BookMark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UsersTable = ({ users, onDelete, onSort, selectedSort, onToggleBookMark }) => {
    const columns = {
        name: { path: 'name', name: 'Имя' },
        qualities: { name: 'Качества', component: (user) => (<QualitiesList qualities={user.qualities}/>) },
        professions: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn bg-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };
    return (

        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default UsersTable;
