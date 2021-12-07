import React, {useRef, useState} from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const [count, setCount] = useState(users.length)
    const handleDelete = (users) => {
        setUsers(prevState => prevState.filter(user => user !== users))
        renderPhrase()
    }
    const formatCount = () => {
         return users.length === 0 ? 'Никто с тобой не тусанет' :
        users.length === 1 ? `${count} человек тусанет с тобой` :
            users.length < 5 ? `${count} человека тусанет с тобой` :
                `${count} человек тусанет с тобой`
    }
    const getBageClasses = () => {
        let classes = "badge m-2 "
        classes += users.length === 0 ? "bg-danger" : "bg-primary"
        return classes
    }
    const renderPhrase = () => {
        setCount((prevState) => prevState - 1)
    }
    const renderUsersTable = () => {
       return <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) =>
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.qualities.map((quality) => {
                        return <span className={'badge m-1 bg-' + quality.color}>{quality.name}</span>
                    })}</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}</td>
                    <td>
                        <button className='badge bg-danger'
                                onClick={ () => handleDelete(user)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    }

    if (users.length === 0) {
        return <span className={getBageClasses()}>{formatCount()}</span>

    }
    return (
        <>
            <span className={getBageClasses()}>{formatCount()}</span>
            {renderUsersTable()}
        </>
    )
}
export default Users

