import React, {useRef, useState} from "react";
import api from "../../api";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const [count, setCount] = useState(users.length)

    const handleDelete = (id) => {//previous state (предыдущее состояние)
        setUsers(prevState => prevState.filter(user => user._id !== id))
        renderPhrase()
    }

    const getBadgeClasses = () => {
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
                <th scope="col">Избранное</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) =>
                <User onDelete={handleDelete}
                      {...user}/>
            )}
            </tbody>
        </table>
    }

    if (users.length === 0) {
        return <span className={getBadgeClasses()}>{SearchStatus(users)}</span>
    }

    return (
        <>
            <span className={getBadgeClasses()}>{SearchStatus(users)}</span>
            {renderUsersTable()}
        </>
    )
}
export default Users

