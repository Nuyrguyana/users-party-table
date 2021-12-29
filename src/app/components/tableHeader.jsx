import React from 'react';
import PropTypes from 'prop-types';
import ArrowSort from './arrowSort';

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            });
        } else {
            onSort({ path: item, order: 'asc' });
        }
    };
    const handleArrowClick = (column) => {
        console.log('column', column);
        if ((column !== 'qualities') && (column !== 'delete')) {
            return <ArrowSort/>;
        }
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
                    {handleArrowClick(column)}
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
