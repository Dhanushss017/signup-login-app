import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });
  
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formData
      );
      const { token } = response.data;

     
      localStorage.setItem("token", token);

      
      navigate("/movieslist");
    } catch (error) {
      const errorMsg = error.response.data.error || "Something went wrong";
      if (errorMsg === "Invalid credentials") {
       
        setErrors({
          username: "Invalid credentials",
          password: "Invalid credentials",
        });
      } else {
        setMessage(errorMsg);
      }
    }
  };

  return (
    <section className="py-5 bg_blobimg vh-100 d-flex align-items-center">
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
                  <label>Username <span>*</span></label>
                  <input
                    type="text"
                    className={`form-control shadow-none ${errors.username && "is-invalid"}`}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <label>Password <span>*</span></label>
                  <input
                    type="password"
                    className={`form-control shadow-none ${errors.password && "is-invalid"}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      className="form-check-input check_box"
                      type="checkbox"
                      value=""
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                 
                </div>

                <div className="mt-4">
                  <button className="btn btn_secondary w-100" type="submit">
                    Submit
                  </button>
                </div>
                <div className=" mt-2">
                  Don't have an account?
                  <Link to="/signup" className="text-danger ms-1">
                    Sign up
                  </Link>
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
