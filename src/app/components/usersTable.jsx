import React from 'react';
import PropTypes from 'prop-types';
// import User from './user';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const UsersTable = ({ users, handleDelete, onSort, selectedSort }) => {
    const columns = {
        name: { path: 'name', name: 'Имя' },
        qualities: { name: 'Качества' },
        professions: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: { path: 'bookmark', name: 'Избранное' },
        delete: {}
    };
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }}/>
            {/* <tbody> */}
            {/*    {users.map((user) => ( */}
            {/*        <User */}
            {/*            onDelete={handleDelete} */}
            {/*            {...user} */}
            {/*            key={user._id} */}
            {/*        /> */}
            {/*    ))} */}
            {/* </tbody> */}
        </table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    handleDelete: PropTypes.func,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
