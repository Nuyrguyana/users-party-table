import React from 'react';
import Quality from './qualitie';
import BookMark from './bookmark';
import PropTypes from 'prop-types';

const User = (props) => {
    return (
        <tr key={props.id}>
            <td>{props.name}</td>
            <td>
                {props.qualities.map((quality) => {
                    return <Quality {...quality} key={quality._id} />;
                })}
            </td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate}</td>
            <td>
                <BookMark />
            </td>
            <td>
                <button
                    className="btn bg-danger"
                    onClick={() => props.onDelete(props._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
User.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired

};
export default User;
