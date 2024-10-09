import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://node-app-production-738d.up.railway.app/login",
        formData
      );
      const { token } = response.data;

      // Save the token to localStorage or sessionStorage
      localStorage.setItem("token", token);

      // Redirect to the movies list page
      navigate("/movieslist");
    } catch (error) {
      setMessage(error.response.data.error || "Something went wrong");
    }
  };

  return (
    <section className="py-5 login_bg vh-100 d-flex align-items-center">
      <div className="container">
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="col-lg-5 enquiry-form mb-3">
                <h2 className="fs-30 fw-600">Log In</h2>
                <p className="mt-2">
                  If you have an account with us, please log in.
                </p>

                <div className="col-md-12 mb-3">
                  <label className="">Username</label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control shadow-none"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      className="form-check-input check_box"
                      type="checkbox"
                      value=""
                    />
                    <label className="form-check-label" for="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="" className="text_primary">
                    Forgot your password?
                  </a>
                </div>
                <div className="mt-4">
                  <button className="btn btn_secondary w-100" type="submit">
                    Submit
                  </button>
                </div>
                <div className=" mt-2">
                  Don't have an account?
                  <a href="/signup" className="text-danger">
                    {" "}
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default Login;
