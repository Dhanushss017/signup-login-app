import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    profession: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // To programmatically navigate to login page

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
      const response = await axios.post('https://node-app-production-738d.up.railway.app/signup', formData);
      setMessage(response.data.message);
      navigate('/login');  
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <section className="py-5 login_bg vh-100 d-flex align-items-center">
      <div className="container">
    <div className="signup-container">
    
      <form onSubmit={handleSubmit}>
        <div className='row justify-content-center'>
            <div className='col-lg-5  mb-3'>
            <span className='text-white'><i className='material-icons me-2 align-middle'>home</i>Signup</span>
            <h2 className='text-white fs-30  mb-4 fw-600 mt-2'>Create An Account</h2>
           <div className='enquiry-form'>

           
        <div className=' mb-3'>
          <label>Username:</label>
          <input className='form-control'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Email:</label>
          <input className='form-control'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Phone:</label>
          <input className='form-control'
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Profession:</label>
          <select className='form-control'
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          >
            <option value="">Select Profession</option>
            <option value="Student">Student</option>
            <option value="Engineer">Engineer</option>
            <option value="Doctor">Doctor</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
        <div className='mb-3'>
          <label>Password:</label>
          <input className='form-control'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mt-4'>
        <button className='btn btn_secondary w-100' type="submit">Submit</button>

        </div>
        <div className="mt-3 text-end">
                        Already have an account? <a className="text_primary" href="/login">Log in</a> 
                    </div>
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

export default Signup;
