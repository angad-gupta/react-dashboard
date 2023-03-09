import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, getUserList } from "./../../firebase";
import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");

        getUsers();
    }, [user, loading]);

    function getUsers() {
        getUserList().then((data) => {
            setUsers(data)
        })
        .catch(e => {
            alert(e.message);
        });
    }

    return (
        <div className="users">
            <div className="container mt-4">
                <h2>User List</h2>
                
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th><i className="fa fa-fw fa-user"></i>Name</th>
                            <th><i className="fa fa-fw fa-envelope"></i>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map((user) => {
                            return (<tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Users;