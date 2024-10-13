import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    profession: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    profession: '',
    password: ''
  });
  console.log(errors);
  

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '' // Clear errors when the user starts typing
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!formData.username) {
      formIsValid = false;
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    }

    if (!formData.phone) {
      formIsValid = false;
      newErrors.phone = 'Phone is required';
    }

    if (!formData.profession) {
      formIsValid = false;
      newErrors.profession = 'Profession is required';
    }

    if (!formData.password) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     try {
  //       const response = await axios.post('https://node-app-production-738d.up.railway.app/signup', formData);
  //       setMessage(response.data.message);
  //       navigate('/login');
  //     } catch (error) {
  //       const errorMsg = error.response.data.error;
  //       if (errorMsg === "Email already exists") {
  //         setErrors({
  //           ...errors,
  //           email: "Email already exists"
  //         });
  //         if(errorMsg === "Username already exists"){
  //           setErrors({
  //             ...errors,
  //             username: "Email already exists"
  //           });
  //         }
  //         if(errorMsg === "Phone number already exists"){
  //           setErrors({
  //             ...errors,
  //             phone: "Email already exists"
  //           });
  //         }
          
  //       } else {
  //         setMessage(errorMsg || "Something went wrong");
  //       }
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://node-app-production-738d.up.railway.app/signup', formData);
        setMessage(response.data.message);
        navigate('/');
      } catch (error) {
        const errorMsg = error.response.data.error;
        const newErrors = { ...errors };
  
        if (errorMsg === "Email already exists") {
          newErrors.email = "Email already exists";
        }
        if (errorMsg === "Username already exists") {
          newErrors.username = "Username already exists";
        }
        if (errorMsg === "Phone number already exists") {
          newErrors.phone = "Phone number already exists";
        }
  
        setErrors(newErrors); // Update the errors state with all the relevant messages
      }
    }
  };
  

  return (
    <section className="py-5 login_bg vh-100 d-flex align-items-center">
      <div className="container">
        <div className="signup-container">
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="col-lg-5 mb-3">
                <span className="text-white">
                  <i className="material-icons me-2 align-middle">home</i>Signup
                </span>
                <h2 className="text-white fs-30 mb-4 fw-600 mt-2">Create An Account</h2>
                <div className="enquiry-form">
                  <div className="mb-3">
                    <label>Username <span>*</span></label>
                    <input
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Email <span>*</span></label>
                    <input
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Phone <span>*</span></label>
                    <input
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Profession <span>*</span></label>
                    <select
                      className={`form-control  ${errors.profession ? 'is-invalid' : ''}`}
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Profession </option>
                      <option value="Student">Student</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Teacher">Teacher</option>
                    </select>
                    {errors.profession && (
                      <div className="invalid-feedback">{errors.profession}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Password <span>*</span></label>
                    <input
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="mt-4">
                    <button className="btn btn_secondary w-100" type="submit">
                      Submit
                    </button>
                  </div>
                  <div className="mt-3 text-end">
                    Already have an account?
                    <Link className="text-danger ms-1" to="/">Log in</Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
          
        </div>
      </div>
    </section>
  );
};

export default Signup;
