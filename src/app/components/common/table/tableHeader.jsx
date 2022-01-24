import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowSort from '../../arrowSort';

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const initialArrowState = {
        name: false,
        professions: false,
        completedMeetings: false,
        rate: false,
        bookmark: false
    };
    const [arrow, setArrow] = useState(initialArrowState);

    const handleSort = (item) => {
        manageArrowState(item);
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            });
        } else {
            onSort({ path: item, order: 'asc' });
        }
    };
    const handleToggleArrow = (column) => {
        if (arrow[column]) {
            if ((column !== 'qualities') && (column !== 'delete')) {
                return <ArrowSort/>;
            }
        }
    };
    const manageArrowState = (columnName) => {
        if (columnName === 'profession.name') {
            columnName = 'professions';
        }
        setArrow((prevState) => {
            prevState.name = false;
            prevState.professions = false;
            prevState.completedMeetings = false;
            prevState.rate = false;
            prevState.bookmark = false;
            return prevState;
        });
        setArrow((prevState) => {
            prevState[columnName] = true;
            return prevState;
        });
    };
    return <thead>
        <tr>
            {Object.keys(columns).map((column) => (
                <th key={column}
                    onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                    {...{ role: columns[column].path && 'button' }}
                    scope="col"
                >
                    {columns[column].name}
                    {handleToggleArrow(column)}
                </th>
            ))}
        </tr>
    </thead>;
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableHeader;
