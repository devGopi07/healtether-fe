import React, { useState, useEffect } from 'react';

const UserForm = ({ selectedUser, createUser, updateUser, clearForm }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (selectedUser) {
      setUser({ name: selectedUser.name, email: selectedUser.email });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      updateUser(selectedUser._id, user);
    } else {
      createUser(user);
    }
    setUser({ name: '', email: '' });
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{selectedUser ? 'Update' : 'Create'}</button>
      {selectedUser && <button onClick={clearForm}>Cancel</button>}
    </form>
  );
};

export default UserForm;
