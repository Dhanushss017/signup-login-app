import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://node-app-production-738d.up.railway.app/users"
      );
      console.log("API Response:", response.data);
      setUsers(Array.isArray(response.data.users) ? response.data.users : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUserData({
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleUpdate = async () => {
    console.log(newUserData);
    if (!editingUser) return;

    try {
      const response = await axios.patch(
        `https://node-app-production-738d.up.railway.app/users/${editingUser._id}`,
        newUserData
      );
      console.log("Update Response:", response.data);

      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? { ...user, ...newUserData } : user
        )
      );

      setEditingUser(null);
      setNewUserData({ username: "", email: "", phone: "" });

      alert("User details have been updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err.message);
      alert("An error occurred while updating user details. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!token) {
    return (
      <section className="vh-100 backlogin_bg d-flex align-items-center">
        <div className="container">
          <div className="backlogin_card">
            <h2 className="fs-30 text-center fw-300">
              Please Login to view the movies list
            </h2>
            <div className="text-center mt-4">
              <button
                className="btn btn_outline"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="mb-4 fs-30 fw-600">
          <a href="/movieslist">
            <i className="material-icons icon_arrow">arrow_back</i>
          </a>
          Registered Users
        </h1>
        <div className="table-responsive content_scroll">
          <table className="table table-hover white-space table-borderless mb-0 users_table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profession</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.profession}</td>
                    <td>
                      <button
                        className="btn btn_outline p-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => handleEdit(user)}
                      >
                        <i className="material-icons align-middle">edit</i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-600" id="exampleModalLabel">
                  Registered Users
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                {editingUser && (
                  <div className="edit-form ">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate();
                      }}
                    >
                      <div className="form-group mb-3">
                        <label>Username:</label>
                        <input
                          className="form-control"
                          type="text"
                          value={newUserData.username}
                          onChange={(e) =>
                            setNewUserData({
                              ...newUserData,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label>Email:</label>
                        <input
                          className="form-control"
                          type="email"
                          value={newUserData.email}
                          onChange={(e) =>
                            setNewUserData({
                              ...newUserData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label>Phone:</label>
                        <input
                          className="form-control"
                          type="text"
                          value={newUserData.phone}
                          onChange={(e) =>
                            setNewUserData({
                              ...newUserData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-4 text-end">
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          onClick={() => setEditingUser(null)}
                          className="btn btn_outline me-3"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn_secondary "
                          data-bs-dismiss="modal"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
