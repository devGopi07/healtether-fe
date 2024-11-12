import { Button, TextField } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const baseUrl = "https://healtether-be.onrender.com/api/users";
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzMyNGRjNjg1MTkwYmVjMjJmYzc0YSIsIm5hbWUiOiJHb3BpIiwiZW1haWwiOiJnb3BpbmF0aG9mZmljaWFsMTZAZ21haWwuY29tIiwicm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3MzE0MDUzNDksImV4cCI6MTczMTQxMjU0OX0.EGZcVgkjq35zPBkw90DhexB0TlOXLiMBLSK7AWmpLgs";
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/getUsers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data?.userss);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }; 

  const createUser = async (user) => {
    try {
      console.log("role",user.role ? true : false)
      console.log("JSON.stringify(user)", JSON.stringify(user));
      const response = await fetch(`${baseUrl}/signUp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const newUser = await response.json();
      alert(newUser.message);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const deleteUser = async (email) => {
    console.log("email", email);
    const isConfirmed = window.confirm("Are you sure to delete this user?");

    if (isConfirmed) {
      try {
        const response = await fetch(`${baseUrl}/deleteUser/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({email:email}),
        }); 
        if (response.ok) {
          alert("User deleted successfully!"); 
          fetchUsers()
        } else {
          throw new Error("Failed to delete user");
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    } 
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (formData.email) {
      if (!emailRegex.test(formData.email)) {
        formErrors.email = "Please enter a valid email address";
      }
    }
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.role) formErrors.role = "Role is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // API call
      createUser(formData);
    }
  };

  let datas = [
    {
      name: "name",
      placeholder: "Enter your name",
    },
    {
      name: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      placeholder: "Enter your password",
    },
    {
      name: "role",
      placeholder: "Enter your role",
    },
  ];

  return (
    <>
      <div style={{ display: "flex", gap: "100px" }}>
        <div>
          <p> User Management </p>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                minWidth: "600px",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {datas?.map((d) => (
                <TextField
                  id="outlined-basic"
                  label={d?.placeholder}
                  variant="outlined"
                  value={formData[d?.name]}
                  name={d?.name}
                  onChange={handleChange}
                  error={errors[d?.name] ? errors[d?.name] : null}
                  helperText={errors[d?.name] ? errors[d?.name] : null}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                minWidth: "600px",
                justifyContent: "end",
                marginTop: "10px",
              }}
            >
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="">
          <h2>USERS</h2>
          <div className="">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Email
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Role
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#fff",
                    }}
                  >
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {user.name}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {user.email}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {user.role}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => deleteUser(user.email)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
