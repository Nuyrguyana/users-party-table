import React from "react";
import Quality from "./qualitie"
import BookMark from "./bookmark"

const User = (props) => {
    return <tr key={props.id}>
        <td>{props.name}</td>
        <td>{props.qualities.map((quality) => {
            return Quality(quality)
        })}</td>
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}</td>
        <td>
            <BookMark/>
        </td>
        <td>
            <button className='btn bg-danger'
                    onClick={() => props.onDelete(props._id)}
            >
                Delete
            </button>
        </td>
    </tr>
}
export default User