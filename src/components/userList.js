import React from 'react';

const UserList = ({ users, deleteUser, onEdit }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <span>{user.name} ({user.email})</span>
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
