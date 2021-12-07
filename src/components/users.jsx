import React, {useState} from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (users) => {
        setUsers(prevState => prevState.filter(user => user !== users))
    }
    const renderPhrase = (number) => {
    }
    return (
        <>
            <table className="table">
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
                                    onClick={ () => handleDelete(user)}>
                                Delete
                            </button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}
export default Users

