import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";
import Loader from "./components/loader";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((user) => setUsers(user));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    return (
        <div>
            {users ? (
                <Users
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                    users={users}
                />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default App;
